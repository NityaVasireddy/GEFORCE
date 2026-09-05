const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
// CRITICAL FIX: Render/Railway requires process.env.PORT
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const CURATED_MEME_FORMATS = [
  "drake", "boyfriend", "buttons", "mind", "brain", 
  "cat_yelling", "gru_plan", "panik_kalm", "disaster_girl", "this_is_fine"
];

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) 
  : null;

// Health check for Render / Railway zero-downtime health monitors
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AI Caption Engine Active', time: new Date() });
});

app.get('/', (req, res) => {
  res.send('<h1>🚀 Meme Caption Backend API Live</h1>');
});

// Generation Endpoint
app.post('/api/generate-captions', async (req, res) => {
  const { imageBase64, context = "", tone = "Sarcastic", platform = "Instagram" } = req.body;

  try {
    if (genAI && process.env.GEMINI_API_KEY) {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

      const prompt = `
You are a viral social media manager and meme expert.
Generate 5-8 witty, creative captions suitable for ${platform} matching tone "${tone}".
Context/Situation: "${context || 'Based on the uploaded image'}"

Also pick 2-3 matching format IDs ONLY from: ${JSON.stringify(CURATED_MEME_FORMATS)}

Respond in STRICT JSON with format:
{
  "captions": [
    {
      "caption": "Full caption text with emojis and hashtags",
      "topText": "SHORT SETUP FOR MEME (1-5 words uppercase)",
      "bottomText": "PUNCHLINE FOR MEME (1-7 words uppercase)"
    }
  ],
  "aiSuggestions": ["drake", "this_is_fine"]
}
`;
      let contents = [prompt];
      if (imageBase64) {
        const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        const cleanData = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        contents.push({ inlineData: { data: cleanData, mimeType } });
      }

      const result = await model.generateContent(contents);
      const data = JSON.parse(result.response.text());
      return res.json(data);
    }

    // Fallback: Guarantees zero downtime if API key is not configured or rate-limited
    return res.json(getFallbackData(tone, platform));
  } catch (err) {
    console.error("Generation error, returning fallback:", err.message);
    return res.json(getFallbackData(tone, platform));
  }
});

function getFallbackData(tone, platform) {
  return {
    captions: [
      {
        caption: `POV: You thought today was going to be productive 💀🔥 #${tone.replace(/\s+/g, '')} #${platform}`,
        topText: "MY PRODUCTIVITY PLANS",
        bottomText: "WHAT ACTUALLY HAPPENED TODAY"
      },
      {
        caption: `Main character energy unlocked 😎✨ #${platform} #Viral`,
        topText: "ME STEPPING OUT",
        bottomText: "UNBOTHERED AND THRIVING"
      },
      {
        caption: `No thoughts, just vibes and caffeine ☕😭 #${platform}`,
        topText: "MY LAST TWO BRAIN CELLS",
        bottomText: "TRYING TO SURVIVE THE HACKATHON"
      },
      {
        caption: `This is officially my mood for the rest of the year 😂💀`,
        topText: "WHEN THE CODE FINALLY RUNS",
        bottomText: "DO NOT TOUCH ANYTHING"
      },
      {
        caption: `Tell me you relate without telling me 🚀 #Relatable #${tone.replace(/\s+/g, '')}`,
        topText: "SUBMITTING THE PROJECT",
        bottomText: "AT 11:59 PM ON DEADLINE"
      }
    ],
    aiSuggestions: ["this_is_fine", "panik_kalm", "drake"]
  };
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});