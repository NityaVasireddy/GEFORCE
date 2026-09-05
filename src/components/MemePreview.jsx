import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Download, Copy, Check } from "lucide-react";

function MemePreview({ image, caption }) {
  const canvasRef = useRef(null);
  const cachedImgRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!image) {
      setImageUrl("");
      cachedImgRef.current = null;
      return;
    }

    if (typeof image === "string") {
      setImageUrl(image);
    } else if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (image.preview || image.url) {
      setImageUrl(image.preview || image.url);
    }
  }, [image]);

  // Decode Image
  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      cachedImgRef.current = img;
      renderCanvas();
    };
    img.src = imageUrl;
  }, [imageUrl]);

  // Live Redraw when caption changes
  useEffect(() => {
    if (cachedImgRef.current) {
      renderCanvas();
    }
  }, [caption]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const img = cachedImgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const textToDraw = caption || "POV: YOU THOUGHT TODAY WAS GOING TO BE PRODUCTIVE 💀";
    const fontSize = Math.floor(canvas.height * 0.075);
    ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.max(fontSize * 0.18, 4);
    ctx.lineJoin = "round";

    // Text Wrap
    const words = textToDraw.toUpperCase().split(" ");
    let lines = [];
    let currentLine = words[0] || "";
    const maxWidth = canvas.width * 0.9;

    for (let i = 1; i < words.length; i++) {
      let testLine = currentLine + " " + words[i];
      if (ctx.measureText(testLine).width > maxWidth) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    // Draw at the bottom of the meme
    lines.forEach((line, index) => {
      const lineY = canvas.height * 0.92 - (lines.length - 1 - index) * (fontSize * 1.15);
      ctx.strokeText(line, canvas.width / 2, lineY);
      ctx.fillText(line, canvas.width / 2, lineY);
    });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `meme-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (!imageUrl) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-lg font-semibold text-white mb-1">Meme Canvas Engine</h2>
        <p className="text-sm text-gray-500 mb-4">Upload an image to render your meme</p>
        <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black">
          <div className="text-center">
            <ImageIcon size={45} className="mx-auto mb-3 text-gray-600" />
            <p className="text-sm text-gray-400">No Image Uploaded Yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">🎨 Live Meme Canvas</h2>
          <p className="text-xs text-gray-500">Auto-wrapped text with bold black stroke outlines</p>
        </div>
      </div>

      {/* CANVAS VIEWPORT */}
      <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-white/10 bg-black/60 p-3 overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full h-auto rounded-xl shadow-2xl border border-white/10" />
      </div>

      {/* ACTION BUTTONS (MEMBER 3 DELIVERABLES) */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-medium rounded-xl text-sm transition"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          {copied ? "Copied Meme!" : "Copy to Clipboard"}
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-red-600/30"
        >
          <Download size={16} /> Download PNG
        </button>
      </div>
    </div>
  );
}

export default MemePreview;