# AI Meme and Social Media Caption Generator (GEFORCE)

An autonomous AI tool designed for social media managers and casual creators to instantly convert text situations or uploaded images into witty, viral captions and fully rendered visual memes.

## 🚀 Team Roles & Architecture
* **Member 1 (Frontend Dev):** React UI/UX, Vite + Tailwind CSS framework initialization, and base64 upload pipelines.
* **Member 2 (Backend & AI Specialist):** Node.js + Express server, multimodal prompt execution, and strict JSON output formats.
* **Member 3 (Meme Data & Canvas Engineer - My Role):** Curated static templates engine (`memes.json`) and core HTML5 Canvas pixel overlay rendering logic (`MemeCanvas.jsx`).
* **Member 4 (DevOps & Integration Lead):** Branch management, cloud environment hosting pipelines, end-to-end sandbox testing workflows.

## 📁 Completed Member 3 Modules
* `memes.json`: Curated dataset spanning popular custom meme formats, contextual use cases, and descriptive labels.
* `MemeCanvas.jsx`: Core HTML5 dynamic canvas rendering module compiling high-impact white font structures with clear text borders over uploaded user image dimensions.

## 🛠️ Instructions for Teammates
To integrate the meme rendering sandbox into the main React UI dashboard, run a local fetch sync and call the custom component wrapper:

```jsx
import MemeCanvas from './MemeCanvas';

<MemeCanvas 
  uploadedImageBase64={userImageBase64String}
  topText={topMemeText}
  bottomText={bottomMemeText}
  aiSuggestions={['Drake Hotline Bling', 'Two Buttons']}
/>
```

---

### Step 3: Save and Complete
1. Scroll down to the bottom of the page.
2. Click the green button that says **`Commit changes...`**.
3. A small confirmation panel will slide down. Click **`Commit changes`** one last time.

Your repository page will now show a beautiful description guide at the base of the file tree, making your project look incredibly clean and ready for evaluation! 

<FollowUp>
Now that your codebase is fully live and documented, would you like me to show you how to write the **Vite project install commands** so your team can run the React frontend dashboard locally, or should we prepare the text message block you can copy-paste to your **team group chat** to notify everyone that the code is ready?
</FollowUp>
