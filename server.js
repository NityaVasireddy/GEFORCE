const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Ensure your team installs the correct package via: npm install @google/genai
const { GoogleGenAI } = require('@google/genai'); 

const app = express();

// Enable secure cross-origin requests so your Vercel frontend can talk to it cleanly
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST']
}));

app.use(express.json({ limit: '50mb' }));

// Initializing the advanced multimodal inference model engine
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY });

app.post('/api/generate-captions', async (req, res) => {
  try {
    const { imageBase64, situation, tone } = req.body;

    // Advanced System Directive: Explicitly forces 5 completely separate caption styles
    const systemPrompt = `
      You are a professional, world-class AI Meme Engineer and Viral Social Media Copywriter.
      Analyze the input context carefully (Situation: "${situation || 'Not provided'}").
      
      CRITICAL REQUIREMENT: Generate a batch of exactly 5 completely DIFFERENT, DISTINCT, and UNIQUE caption options.
      - Each option must use entirely unique word choice, length, joke structures, and comedic setups.
      - Absolutely DO NOT repeat the same phrase, joke, or punchline template across options.
      - Strictly follow the selected stylistic presentation tone parameter: "${tone || 'Sarcastic'}".
      
      Also provide 2-3 accurate matching template suggestions from this list: ["Drake Hotline Bling", "Distracted Boyfriend", "Two Buttons", "Change My Mind", "Expanding Brain"].

      Your response must be returned in raw, valid JSON formatting ONLY matching this structure block:
      {
        "captions": ["Genuinely unique and funny option 1", "Entirely different hilarious option 2", "Distinct option 3", "Clever variation option 4", "Sharp punchline option 5"],
        "suggested_memes": ["Template Name 1", "Template Name 2"]
      }
    `;

    let modelInput = [systemPrompt];

    // Decode base64 stream directly into the multimodal model array safely if provided
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      modelInput.push({
        inlineData: {
          data: cleanBase64,
          mimeType: "image/jpeg"
        }
      });
    }

    // Call the lightning-fast multimodal intelligence runner
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: modelInput,
    });

    // Clean any accidental markdown wrapper characters coming from raw LLM output text
    let responseText = response.text.trim();
    if (responseText.startsWith("```json")) {
      responseText = responseText.replace(/^```json/, "").replace(/```\$/, "");
    } else if (responseText.startsWith("```")) {
      responseText = responseText.replace(/^```/, "").replace(/```$/, "");
    }

    const parsedMemeData = JSON.parse(responseText.trim());
    
    // Return the clean, isolated variety list down to your MemePreview dashboard component
    res.json(parsedMemeData);

  } catch (error) {
    console.error("API Gateway Execution Error:", error);
    res.status(500).json({ 
      error: "Failed to compile unique batch caption options", 
      captions: [
        "When local code env throws a fit right before final submission 💀",
        "It worked perfectly fine on my machine, I swear",
        "Me watching the deployment build log line spin indefinitely",
        "Surviving on pure caffeine and dreams of winning the grand prize",
        "POV: The automated testing suite grades your repository at 100/100"
      ],
      suggested_memes: ["Two Buttons", "Drake Hotline Bling"]
    });
  }
});

// Use dynamic environment assignment parameters suited for hosting platforms
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[GEFORCE Engine] Server active on network port ${PORT}`));