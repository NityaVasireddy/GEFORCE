const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 1. ROOT TEST ROUTE (Browser lo direct ga check cheyadaniki)
app.get('/', (req, res) => {
  res.send('<h1>🎉 Meme AI Server 100% Running!</h1>');
});

// 2. HEALTH CHECK ROUTE (Idhi unte Cannot GET radhu!)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Meme AI Backend Active' });
});

// 3. CAPTIONS GENERATION ROUTE (Member 1 & 2 use chesedhi)
app.post('/api/generate-captions', (req, res) => {
  const { tone = "Sarcastic", context = "" } = req.body;
  
  res.json({
    captions: [
      {
        tone: tone,
        topText: "WHEN MY CODE FINALLY COMPILES",
        bottomText: "BUT I HAVE NO IDEA WHY",
        caption: "When the code finally works on the first try 🚀"
      },
      {
        tone: tone,
        topText: "HACKATHON CLOCK TICKING",
        bottomText: "TEAM RUSHING TO FINISH THE DEMO",
        caption: "Hackathon adrenaline mode activated!"
      },
      {
        tone: tone,
        topText: "DEPLOYING AT MIDNIGHT",
        bottomText: "PRAYING TO THE SERVER GODS",
        caption: "Deploying directly to production. Please don't crash!"
      }
    ],
    aiSuggestions: ["this_is_fine", "panik_kalm", "drake"]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});