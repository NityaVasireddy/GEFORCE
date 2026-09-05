const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(express.json({ limit: "50mb" }));

const apiKey =
  process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY is not configured.");
}

const ai = new GoogleGenAI({
  apiKey,
});

app.get("/", (req, res) => {
  res.json({
    status: "GEFORCE backend is running",
  });
});

app.post("/api/generate-captions", async (req, res) => {
  try {
    const { imageBase64, situation, description, tone } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        error: "No image was provided.",
      });
    }

    // Accept either "situation" or "description"
    const userDescription =
      situation || description || "No additional description provided.";

    const selectedTone = tone || "Sarcastic";

    // Extract MIME type and Base64 data correctly
    let mimeType = "image/jpeg";
    let cleanBase64 = imageBase64;

    const dataUrlMatch = imageBase64.match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/
    );

    if (dataUrlMatch) {
      mimeType = dataUrlMatch[1];
      cleanBase64 = dataUrlMatch[2];
    }

    const systemPrompt = `
You are GEFORCE, an expert AI meme caption generator.

YOUR MOST IMPORTANT TASK:
Analyze the ACTUAL IMAGE provided to you.

Do NOT generate generic captions.
Do NOT assume the image is something else.
Do NOT reuse captions from previous requests.

Look carefully at:
- people
- animals
- objects
- facial expressions
- body language
- actions
- background
- unusual details
- relationships between objects/people
- funny or awkward situations

The captions MUST clearly relate to what is visibly happening in THIS IMAGE.

Additional user context:
"${userDescription}"

Selected tone:
"${selectedTone}"

Generate EXACTLY 5 captions.

Each caption must be:
1. Different from the other captions.
2. Based on a different observation, joke, or perspective when possible.
3. Natural and funny.
4. Suitable for the selected tone.
5. Specific to the uploaded image.
6. Short enough to work as a meme caption.

Do NOT:
- repeat the same joke structure
- repeat phrases
- create generic "POV" captions for every option
- mention things that cannot reasonably be seen or inferred from the image
- use NSFW, hateful, discriminatory, or excessively offensive content

Tone guidelines:

Sarcastic:
Use dry humor, irony, and clever exaggeration.

Gen-Z:
Use modern internet humor, casual language, and light slang.

Wholesome:
Use cute, positive, warm, and playful humor.

Professional:
Use clean, clever, workplace-safe humor.

Dark Humor:
Use mildly dark/edgy humor while remaining non-hateful, non-graphic, and safe.

Also suggest 2 or 3 meme templates that genuinely fit the situation.

Choose ONLY from:
- Drake Hotline Bling
- Distracted Boyfriend
- Two Buttons
- Change My Mind
- Expanding Brain

Return ONLY valid JSON with exactly this structure:

{
  "captions": [
    "caption 1",
    "caption 2",
    "caption 3",
    "caption 4",
    "caption 5"
  ],
  "suggested_memes": [
    "template 1",
    "template 2"
  ]
}
`;

    console.log("Generating captions...");
    console.log("Tone:", selectedTone);
    console.log("Image MIME type:", mimeType);
    console.log(
      "Image received:",
      Math.round(cleanBase64.length / 1024),
      "KB"
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",
          parts: [
            {
              text: systemPrompt,
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: cleanBase64,
              },
            },
          ],
        },
      ],

      config: {
        responseMimeType: "application/json",
        temperature: 1.0,
      },
    });

    const responseText = response.text.trim();

    console.log("AI response received.");

    let parsedMemeData;

    try {
      parsedMemeData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON parsing failed.");
      console.error("Raw AI response:", responseText);

      return res.status(500).json({
        error: "AI returned an invalid response.",
      });
    }

    // Validate captions
    if (
      !parsedMemeData.captions ||
      !Array.isArray(parsedMemeData.captions) ||
      parsedMemeData.captions.length < 5
    ) {
      return res.status(500).json({
        error: "AI did not return enough captions.",
      });
    }

    // Return only the first 5 captions
    parsedMemeData.captions = parsedMemeData.captions.slice(0, 5);

    // Make sure suggested memes exists
    if (!Array.isArray(parsedMemeData.suggested_memes)) {
      parsedMemeData.suggested_memes = [];
    }

    console.log("Generated captions successfully.");

    res.json(parsedMemeData);
  } catch (error) {
    console.error("API Gateway Execution Error:");
    console.error(error);

    // IMPORTANT:
    // Do not return fixed captions here.
    // Fixed fallback captions caused the same captions
    // to appear for different images.

    res.status(500).json({
      error: "Failed to generate captions.",
      message:
        process.env.NODE_ENV === "production"
          ? "AI caption generation failed."
          : error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `[GEFORCE Engine] Server active on port ${PORT}`
  );
});