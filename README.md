# 🎭 AI Meme Generator

> **Turn any image into viral, high-engagement memes in seconds using multimodal AI analysis and context-aware caption generation.**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

---

## 🌟 Executive Summary

The **AI Meme Generator** bridges the gap between vision AI and meme culture. Standard image tools only add plain text to images, but our app analyzes spatial content, emotional cues, and visual contexts to suggest tailor-made captions paired with popular, high-converting meme templates.

### **The Problem**
Content creators and community managers spend hours brainstorming witty captions and searching for matching meme formats for social media campaigns.

### **Our Solution**
An end-to-end web app that ingests image uploads, lets users pick a specific visual tone, generates context-aware captions via vision LLMs, and maps the input directly onto curated meme canvas overlays—all in under 3 seconds.

---

## 🚀 Live Demo & Infrastructure

* **Frontend Application:** [https://ai-meme-generator.vercel.app](https://ai-meme-generator.vercel.app)
* **Backend API Gateway:** [https://ai-meme-server.onrender.com](https://ai-meme-server.onrender.com)
* **Source Code:** [https://github.com/NityaVasireddy/first-hackathon](https://github.com/NityaVasireddy/first-hackathon)

---

## ✨ Key Features

* 🧠 **Multimodal Vision Analysis:** Leverages Vision LLMs to detect objects, facial expressions, and implicit scenes within uploaded photos.
* 🎭 **Dynamic Vibe Matrix:** Custom prompt engineering profiles for 5 unique tones (*Sarcastic*, *Gen-Z / Brainrot*, *Wholesome*, *Corporate*, *Absurdist*).
* 📐 **Template Matching Engine:** Automatically ranks and suggests classic template layouts (e.g., *Distracted Boyfriend*, *Drake Hotline*) based on image context.
* ⚡ **Client-Side Canvas Rendering:** Instant, pixel-perfect meme generation rendered entirely in the user's browser using HTML5 Canvas—zero server-side image processing bloat.
* 🛡️ **Enterprise Safety & Fallbacks:** Automated content filtering and structured JSON fallbacks to ensure reliable API responses under heavy load.

---

## 🏗️ System Architecture

```text
[ User Interface ] ──( Image & Tone )──> [ Express API Gateway ]
        │                                           │
  HTML5 Canvas Rendering                    OpenAI Vision / Claude
  & Local Export (.png)                            │
        ▲                                           ▼
        └─────────────( Structured JSON )───────────┘
                    Captions + Template IDs