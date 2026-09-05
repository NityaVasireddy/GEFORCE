# 🎭 AI Meme & Social Media Caption Generator

> **An AI-powered automation engine for content creators and social media managers. Upload an image or describe a situation to instantly generate multi-tone meme text, social media copy, and batch caption options mapped to trending templates.**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

---

## 📌 Problem Statement

Social media managers and casual creators spend hours brainstorming witty copy and matching visual content to viral formats. Existing tools either only add static text or lack multimodal context awareness, resulting in generic captions and high operational latency.

### **Our Solution**
Our web application combines multimodal vision AI and flexible prompt profiles to generate multi-format social content in seconds. Users can input content via **image upload** or **text-based situation descriptions** to output:
* **Meme Text Overlays** mapped directly to popular visual templates.
* **Social Media Post Copy** formatted with line breaks, call-to-actions, and hashtags.
* **Batch Caption Options** generated simultaneously across multiple stylistic tones.

---

## 🚀 Live Demo & Infrastructure

* **Frontend Application:** [https://ai-meme-generator.vercel.app](https://ai-meme-generator.vercel.app)
* **Backend API Gateway:** [https://ai-meme-server.onrender.com](https://ai-meme-server.onrender.com)
* **Source Code:** [https://github.com/NityaVasireddy/GEFORCE](https://github.com/NityaVasireddy/GEFORCE)

---

## ✨ Key Features & Target Alignment

* 📸 **Dual Input Engine:** Accepts direct image uploads (PNG/JPG vision analysis) *or* text-based situation descriptions.
* ⚡ **Batch-Generation Mode:** Produces 5+ unique caption variants in a single AI request to maximize creator options.
* 🎭 **Multi-Tone Vibe Matrix:** Formats copy across diverse styles (*Sarcastic*, *Gen-Z / Brainrot*, *Wholesome*, *Corporate*, *Absurdist*).
* 📐 **Trending Format Engine:** Recommends and overlays text onto a curated library of viral meme templates (*Distracted Boyfriend*, *Drake Hotline*, etc.).
* 📝 **Social Media Copy Suite:** Generates ready-to-publish post captions complete with platform-optimized layout and relevant hashtag suggestions.
* 🎨 **Client-Side Canvas Rendering:** Instant, pixel-perfect meme creation inside the browser using HTML5 Canvas for zero server latency.

---

## 🏗️ System Architecture

```text
  [ Dual Input: Image / Text Situation ]
                    │
                    ▼
          [ Express API Gateway ]
                    │
           ( Multimodal LLM )
                    │
                    ▼
     [ Structured JSON Output Engine ]
   ├── Meme Text & Template Mapping
   ├── Social Media Post Copy
   └── Batch Caption Matrix (5+ Tones)
                    │
                    ▼
   [ React Frontend + HTML5 Canvas ]