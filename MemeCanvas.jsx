import React, { useRef, useEffect, useState } from 'react';
import memeTemplates from './memes.json';

export default function MemeCanvas({ 
  uploadedImageBase64, 
  topText = "", 
  bottomText = "", 
  aiSuggestions = [] 
}) {
  const canvasRef = useRef(null);
  const cachedImageRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState("📋 Copy to Clipboard");

  // Cache decoded image only when upload changes (prevents keystroke stutter)
  useEffect(() => {
    if (!uploadedImageBase64) {
      cachedImageRef.current = null;
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      cachedImageRef.current = img;
      renderCanvas();
    };
    img.src = uploadedImageBase64;
  }, [uploadedImageBase64]);

  // Instant 60fps re-render on text changes
  useEffect(() => {
    if (cachedImageRef.current) {
      renderCanvas();
    }
  }, [topText, bottomText]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const img = cachedImageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const fontSize = Math.floor(canvas.height * 0.075);
    ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.max(fontSize * 0.18, 3);
    ctx.lineJoin = 'round';

    const wrapAndDrawText = (text, yPosition, isTop) => {
      if (!text || !text.trim()) return;

      const words = text.toUpperCase().trim().split(/\s+/);
      let lines = [];
      let currentLine = words[0] || "";
      const maxWidth = canvas.width * 0.9;

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

      // Break long unbroken words/hashtags that exceed maxWidth
      lines = lines.flatMap(line => {
        if (ctx.measureText(line).width <= maxWidth) return [line];
        const chunks = [];
        let chunk = "";
        for (let char of line) {
          if (ctx.measureText(chunk + char).width > maxWidth) {
            chunks.push(chunk);
            chunk = char;
          } else {
            chunk += char;
          }
        }
        if (chunk) chunks.push(chunk);
        return chunks;
      });

      lines.forEach((line, index) => {
        let lineY = yPosition;
        if (isTop) {
          lineY += index * (fontSize * 1.15);
        } else {
          lineY -= (lines.length - 1 - index) * (fontSize * 1.15);
        }
        const xPosition = canvas.width / 2;
        ctx.strokeText(line, xPosition, lineY);
        ctx.fillText(line, xPosition, lineY);
      });
    };

    if (topText) {
      ctx.textBaseline = 'top';
      wrapAndDrawText(topText, canvas.height * 0.04, true);
    }

    if (bottomText) {
      ctx.textBaseline = 'bottom';
      wrapAndDrawText(bottomText, canvas.height * 0.94, false);
    }
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `viral-meme-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
  };

  const copyMemeToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopyStatus("✅ Copied!");
        setTimeout(() => setCopyStatus("📋 Copy to Clipboard"), 2500);
      });
    } catch (err) {
      console.warn("Clipboard copy error:", err);
      setCopyStatus("⚠️ Copy Failed (Use Download)");
      setTimeout(() => setCopyStatus("📋 Copy to Clipboard"), 2500);
    }
  };

  // Robust matching against template IDs and names (supports strings or objects)
  const recommendedMemes = memeTemplates.filter(template => {
    return (aiSuggestions || []).some(suggestion => {
      if (!suggestion) return false;
      const rawText = typeof suggestion === 'string' 
        ? suggestion 
        : (suggestion.name || suggestion.id || suggestion.format || '');
      
      const cleanSuggestion = rawText.toLowerCase().trim().replace(/[-_]/g, ' ');
      const cleanName = template.name.toLowerCase().trim().replace(/[-_]/g, ' ');
      const cleanId = template.id.toLowerCase().trim().replace(/[-_]/g, ' ');
      
      return cleanSuggestion.includes(cleanId) || 
             cleanSuggestion.includes(cleanName) || 
             cleanName.includes(cleanSuggestion);
    });
  });

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
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-800 rounded-xl p-4 bg-black/40 min-h-[320px]">
        {uploadedImageBase64 ? (
          <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-xl border border-gray-800" />
        ) : (
          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm font-medium">Canvas Workspace Sandbox Active</p>
            <p className="text-gray-600 text-xs">Waiting for image upload...</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {uploadedImageBase64 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button 
            onClick={copyMemeToClipboard}
            className="w-full py-3.5 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 font-bold tracking-wide rounded-xl shadow-lg transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {copyStatus}
          </button>
          
          <button 
            onClick={downloadMeme} 
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 font-bold tracking-wide rounded-xl shadow-lg transition-all duration-200 active:scale-[0.99]"
          >
            💾 Download PNG
          </button>
        </div>
      )}
    </div>
  );
}
