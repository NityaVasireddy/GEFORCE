const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

// --------------------------------------------------
// CORS
// --------------------------------------------------

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

// Allow large Base64 images
app.use(express.json({ limit: "50mb" }));

// --------------------------------------------------
// GEMINI SETUP
// --------------------------------------------------

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY is not configured.");
}

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

// --------------------------------------------------
// HEALTH CHECK
// --------------------------------------------------

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "GEFORCE AI Meme Backend is running",
  });
});

// --------------------------------------------------
// GENERATE MEME CAPTIONS
// --------------------------------------------------

app.post("/api/generate-captions", async (req, res) => {
  try {
    const {
      imageBase64,
      situation,
      description,
      tone,
    } = req.body;

    // --------------------------------------------------
    // CHECK IMAGE
    // --------------------------------------------------

    if (!imageBase64) {
      return res.status(400).json({
        error: "No image was provided.",
      });
    }

    // --------------------------------------------------
    // USER INPUT
    // --------------------------------------------------

    const userDescription =
      situation ||
      description ||
      "No additional description provided.";

    const selectedTone = tone || "Sarcastic";

    // --------------------------------------------------
    // EXTRACT MIME TYPE AND BASE64 DATA
    // --------------------------------------------------

    let mimeType = "image/jpeg";
    let cleanBase64 = imageBase64;

    const dataUrlMatch = imageBase64.match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/
    );

    if (dataUrlMatch) {
      mimeType = dataUrlMatch[1];
      cleanBase64 = dataUrlMatch[2];
    }

    // --------------------------------------------------
    // PROMPT
    // --------------------------------------------------

    const prompt = `
You are GEFORCE, an expert AI meme caption generator.

Your MOST IMPORTANT TASK is to carefully analyze the ACTUAL IMAGE
attached to this request.

The captions MUST be based on what is actually visible in THIS IMAGE.

Do NOT generate generic captions.
Do NOT assume the image contains something that is not visible.
Do NOT reuse captions from previous requests.

Carefully analyze:

- People
- Animals
- Objects
- Facial expressions
- Body language
- Actions
- Clothing
- Background
- Environment
- Unusual details
- Relationships between people or objects
- Funny situations
- Awkward situations
- Unexpected details

Additional user context:

"${userDescription}"

Selected tone:

"${selectedTone}"

Generate EXACTLY 5 captions.

Each caption must:

1. Be specific to THIS uploaded image.
2. Be different from the other captions.
3. Use different wording.
4. Preferably use a different joke or observation.
5. Be natural and funny.
6. Match the selected tone.
7. Be short enough to work as a meme caption.

IMPORTANT:
Do NOT make all captions follow the same structure.

Do NOT make every caption start with:
- "POV"
- "When"
- "Me when"

Do NOT repeat the same punchline.

Do NOT invent details that cannot reasonably be seen or inferred from the image.

Do NOT generate:
- hateful content
- discriminatory content
- explicit sexual content
- graphic violence
- excessively offensive content

TONE GUIDELINES:

Sarcastic:
Use dry humor, irony, clever exaggeration, and sarcasm.

Gen-Z:
Use modern internet humor, casual language, and light slang.

Wholesome:
Use cute, positive, warm, and playful humor.

Professional:
Use clean, clever, workplace-safe humor.

Dark Humor:
Use mildly dark or edgy humor while remaining non-hateful,
non-graphic, and safe.

Also suggest 2 or 3 meme templates that genuinely fit the image.

Choose ONLY from:

- Drake Hotline Bling
- Distracted Boyfriend
- Two Buttons
- Change My Mind
- Expanding Brain

Return ONLY valid JSON.

Use EXACTLY this structure:

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

    // --------------------------------------------------
    // LOG REQUEST
    // --------------------------------------------------

    console.log("----------------------------------------");
    console.log("GENERATING AI CAPTIONS");
    console.log("Tone:", selectedTone);
    console.log("MIME Type:", mimeType);
    console.log(
      "Image size:",
      Math.round(cleanBase64.length / 1024),
      "KB"
    );
    console.log("----------------------------------------");

    // --------------------------------------------------
    // GEMINI REQUEST
    // --------------------------------------------------

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",

          parts: [
            {
              text: prompt,
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

    // --------------------------------------------------
    // GET AI RESPONSE
    // --------------------------------------------------

    if (!response || !response.text) {
      throw new Error("Gemini returned an empty response.");
    }

    let responseText = response.text.trim();

    console.log("AI response received.");

    // --------------------------------------------------
    // REMOVE MARKDOWN CODE BLOCK IF PRESENT
    // --------------------------------------------------

    if (responseText.startsWith("```json")) {
      responseText = responseText
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");
    } else if (responseText.startsWith("```")) {
      responseText = responseText
        .replace(/^```\s*/, "")
        .replace(/\s*```$/, "");
    }

    // --------------------------------------------------
    // PARSE JSON
    // --------------------------------------------------

    let parsedMemeData;

    try {
      parsedMemeData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON parsing failed.");
      console.error("Raw AI response:");
      console.error(responseText);

      return res.status(500).json({
        error: "AI returned an invalid response.",
      });
    }

    // --------------------------------------------------
    // VALIDATE CAPTIONS
    // --------------------------------------------------

    if (
      !parsedMemeData.captions ||
      !Array.isArray(parsedMemeData.captions)
    ) {
      return res.status(500).json({
        error: "AI did not return captions.",
      });
    }

    if (parsedMemeData.captions.length < 5) {
      return res.status(500).json({
        error: "AI did not return enough captions.",
      });
    }

    // Keep exactly 5 captions
    parsedMemeData.captions = parsedMemeData.captions
      .slice(0, 5)
      .map((caption) => String(caption).trim())
      .filter((caption) => caption.length > 0);

    if (parsedMemeData.captions.length < 5) {
      return res.status(500).json({
        error: "AI returned fewer than 5 valid captions.",
      });
    }

    // --------------------------------------------------
    // VALIDATE MEME TEMPLATES
    // --------------------------------------------------

    const allowedMemes = [
      "Drake Hotline Bling",
      "Distracted Boyfriend",
      "Two Buttons",
      "Change My Mind",
      "Expanding Brain",
    ];

    if (!Array.isArray(parsedMemeData.suggested_memes)) {
      parsedMemeData.suggested_memes = [];
    }

    parsedMemeData.suggested_memes =
      parsedMemeData.suggested_memes
        .filter((meme) => allowedMemes.includes(meme))
        .slice(0, 3);

    // --------------------------------------------------
    // SUCCESS
    // --------------------------------------------------

    console.log("Generated 5 captions successfully.");

    res.json({
      captions: parsedMemeData.captions,
      suggested_memes: parsedMemeData.suggested_memes,
    });

  } catch (error) {

    // --------------------------------------------------
    // ERROR HANDLING
    // --------------------------------------------------

    console.error("----------------------------------------");
    console.error("GEFORCE BACKEND ERROR");
    console.error(error);
    console.error("----------------------------------------");

    // IMPORTANT:
    // We do NOT return hardcoded captions here.
    // This prevents the same captions appearing
    // when AI generation fails.

    res.status(500).json({
      error: "Failed to generate captions.",
      message:
        process.env.NODE_ENV === "production"
          ? "AI caption generation failed."
          : error.message,
    });
  }
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `[GEFORCE Engine] Server active on port ${PORT}`
  );
});