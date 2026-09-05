const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Backend server is running!"
    });
});

// Generate captions API
app.post("/api/generate-captions", (req, res) => {
    const { imageBase64, description, tone } = req.body;

    console.log("Received request:");
    console.log("Description:", description);
    console.log("Tone:", tone);
    console.log("Image received:", !!imageBase64);

    res.json({
        message: "Caption endpoint is working!",
        received: {
            description: description,
            tone: tone,
            imageReceived: !!imageBase64
        }
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});