import { Check, Copy } from "lucide-react";
import { useState } from "react";

function CaptionCard({ caption, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-red-500/30 hover:bg-white/10">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">
          Caption {index + 1}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-400 transition hover:border-red-500/30 hover:text-white"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      <p className="text-base leading-relaxed text-gray-200">
        {caption}
      </p>
    </div>
  );
}

export default CaptionCard;