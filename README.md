# AI Meme and Social Media Caption Generator (GEFORCE)

An autonomous, AI-driven tool designed for social media managers and casual content creators to instantly convert situation contexts or uploaded image inputs into witty, high-engagement captions and fully formatted visual memes.

---

## 🛠️ Architecture & Core Team Breakdown

### Frontend Layer
* **Member 1 (UI & UX Core):** React layout architecture tracking Vite + Tailwind CSS setups, icon integration scripts (`lucide-react`), and Base64 upload pipelines.

### Data & Canvas Layer (My Track)
* **Member 3 (Meme Data & Canvas Engineer):** Engineered static metadata engine (`memes.json`) managing popular formats and integrated custom HTML5 dynamic canvas rendering module (`MemeCanvas.jsx`) supporting heavy text borders and automatic multi-line word wrapping.

### Backend & Service Layer
* **Member 2 (Backend & AI Specialist):** Express server mapping POST endpoints, custom API connector keys, and structured JSON prompt responses.
* **Member 4 (DevOps & Integration Lead):** Branch release coordinator, remote environment pipeline hosting integrations, and demo edge-case testing suites.

---

## 🚀 Component Integration Guide
To seamlessly embed the meme rendering module into the primary React dashboard, fetch project updates and insert the following component layout:

```jsx
import MemeCanvas from './MemeCanvas';

<MemeCanvas 
  uploadedImageBase64={userImageBase64String} 
  topText={topMemeText}                       
  bottomText={bottomMemeText}                 
  aiSuggestions={aiResponseJSON.suggested_memes} 
/>
```

### Features Built into `MemeCanvas`:
* **Thick Black Contrast Outlines:** Guarantees readability across light or dark image backgrounds.
* **Intelligent Word-Wrapping:** Automatically breaks long text lines into balanced blocks to protect UI boundaries.
* **Instant Export:** Direct canvas-to-data downloads with a single button click.

