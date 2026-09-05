import React, { useRef, useEffect } from 'react';
import memeTemplates from './memes.json';

export default function MemeCanvas({ uploadedImageBase64, topText = "", bottomText = "", aiSuggestions = [] }) {
  const canvasRef = useRef(null);

  // Task 3: HTML5 Canvas Rendering Engine
  useEffect(() => {
    if (!uploadedImageBase64) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const fontSize = Math.floor(canvas.height * 0.08);
      ctx.font = `bold ${fontSize}px Impact, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize * 0.15;
      ctx.textBaseline = 'top';

      const drawText = (text, yPosition) => {
        const cleanText = text.toUpperCase();
        const xPosition = canvas.width / 2;
        ctx.strokeText(cleanText, xPosition, yPosition);
        ctx.fillText(cleanText, xPosition, yPosition);
      };

      if (topText) drawText(topText, canvas.height * 0.05);
      if (bottomText) {
        ctx.textBaseline = 'bottom';
        drawText(bottomText, canvas.height * 0.95);
      }
    };
    img.src = uploadedImageBase64;
  }, [uploadedImageBase64, topText, bottomText]);

  // Task 4: Export Meme Image Functionality
  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'generated-meme.png';
    link.href = dataURL;
    link.click();
  };

  const recommendedMemes = memeTemplates.filter(t => aiSuggestions.includes(t.name));

  return (
    <div style={{ padding: '20px', background: '#1a1a1a', color: '#fff', borderRadius: '10px' }}>
      {/* Task 2: Display Suggestions */}
      {recommendedMemes.length > 0 && (
        <div style={{ marginBottom: '20px', border: '1px solid #00bcff', padding: '10px' }}>
          <h3>🔥 Suggested Meme Formats:</h3>
          {recommendedMemes.map(m => (
            <p key={m.id}><strong>{m.name}</strong> - {m.description}</p>
          ))}
        </div>
      )}
      
      {/* Canvas Display */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        {uploadedImageBase64 ? <canvas ref={canvasRef} style={{ maxWidth: '100%' }} /> : <p>Upload an image to see the preview</p>}
      </div>

      {uploadedImageBase64 && <button onClick={downloadMeme} style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>Download Meme</button>}
    </div>
  );
}
