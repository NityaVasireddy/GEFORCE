import React, { useRef, useEffect } from 'react';
import memeTemplates from './memes.json';

export default function MemeCanvas({ uploadedImageBase64, topText = "", bottomText = "", aiSuggestions = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!uploadedImageBase64) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas size matching the image dimensions perfectly
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Calculate dynamic font scale relative to image height
      const fontSize = Math.floor(canvas.height * 0.075);
      ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize * 0.18; // Heavy black border for visibility
      ctx.lineJoin = 'round';

      // Advanced Feature: Auto Text Wrapping for multi-line inputs
      const wrapAndDrawText = (text, yPosition, isTop) => {
        const words = text.toUpperCase().split(' ');
        let lines = [];
        let currentLine = words[0] || "";

        const maxWidth = canvas.width * 0.9; // 10% padding boundary

        for (let i = 1; i < words.length; i++) {
          let testLine = currentLine + " " + words[i];
          let metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth) {
            lines.push(currentLine);
            currentLine = words[i];
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine);

        // Render each calculated line
        lines.forEach((line, index) => {
          let lineY = yPosition;
          if (isTop) {
            lineY += index * (fontSize * 1.1);
          } else {
            // Adjust upward for multi-line bottom captions
            lineY -= (lines.length - 1 - index) * (fontSize * 1.1);
          }
          const xPosition = canvas.width / 2;
          ctx.strokeText(line, xPosition, lineY);
          ctx.fillText(line, xPosition, lineY);
        });
      };

      // Draw Top Text (starting 5% from top border)
      if (topText) {
        ctx.textBaseline = 'top';
        wrapAndDrawText(topText, canvas.height * 0.05, true);
      }

      // Draw Bottom Text (starting 5% from bottom border)
      if (bottomText) {
        ctx.textBaseline = 'bottom';
        wrapAndDrawText(bottomText, canvas.height * 0.92, false);
      }
    };
    img.src = uploadedImageBase64;
  }, [uploadedImageBase64, topText, bottomText]);

  // Export Meme Image Functionality (Task 4)
  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'viral-meme.png';
    link.href = dataURL;
    link.click();
  };

  const recommendedMemes = memeTemplates.filter(t => aiSuggestions.includes(t.name));

  return (
    <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl text-white shadow-2xl max-w-3xl mx-auto space-y-6">
      {/* Suggestions Display panel */}
      {recommendedMemes.length > 0 && (
        <div className="p-4 bg-gradient-to-r from-indigo-900/40 to-blue-900/40 border border-indigo-500/40 rounded-xl">
          <h3 className="font-bold text-base flex items-center gap-2 text-indigo-400 mb-2">
            ✨ AI Suggested Layout Formats:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendedMemes.map(m => (
              <div key={m.id} className="p-3 bg-gray-800/80 rounded-lg border border-gray-700/50">
                <p className="font-semibold text-sm text-white">{m.name}</p>
                <p className="text-xs text-gray-400 mt-1">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Canvas Display Viewport */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-800 rounded-xl p-4 bg-black/40 min-h-[300px]">
        {uploadedImageBase64 ? (
          <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-xl border border-gray-800" />
        ) : (
          <div className="text-center space-y-2">
            <p className="text-gray-500 text-sm font-medium">Canvas Workspace Sandbox Active</p>
            <p className="text-gray-600 text-xs">Waiting for Member 1 upload input...</p>
          </div>
        )}
      </div>

      {uploadedImageBase64 && (
        <button 
          onClick={downloadMeme} 
          className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 font-bold tracking-wide rounded-xl shadow-lg transition-all duration-200 active:scale-[0.99]"
        >
          💾 Download Finalized Meme
        </button>
      )}
    </div>
  );
}

