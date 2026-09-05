import { useState } from "react";
import { Copy, Check, Heart, Sparkles } from "lucide-react";

export default function ResultsGrid({ captions = [], onSelectCaption }) {
  const [copiedId, setCopiedId] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("captionFavorites") || "[]");
  });

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFavorite = (item, id) => {
    const text = typeof item === 'string' ? item : item.caption;
    const exists = favorites.some(f => f.caption === text);
    let updated = exists ? favorites.filter(f => f.caption !== text) : [...favorites, { id, caption: text }];
    setFavorites(updated);
    localStorage.setItem("captionFavorites", JSON.stringify(updated));
  };

  if (!captions.length) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">✨ Generated Viral Captions</h2>
        <p className="text-xs text-gray-500">Click "Apply" to put directly onto your Meme Canvas</p>
      </div>

      <div className="space-y-3">
        {captions.map((item, index) => {
          const captionText = typeof item === 'string' ? item : item.caption;
          const isFav = favorites.some(f => f.caption === captionText);

          return (
            <div key={index} className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-red-500/40">
              <p className="text-sm leading-6 text-gray-200">{captionText}</p>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(captionText, index)}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-300 hover:text-white transition"
                  >
                    {copiedId === index ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                    {copiedId === index ? "Copied" : "Copy"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFavorite(item, index)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition ${
                      isFav ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-white/10 text-gray-400"
                    }`}
                  >
                    <Heart size={13} fill={isFav ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* CRITICAL BRIDGE: Apply Caption to Meme Canvas */}
                <button
                  type="button"
                  onClick={() => onSelectCaption && onSelectCaption(item)}
                  className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/30 transition"
                >
                  <Sparkles size={12} /> Apply to Canvas
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}