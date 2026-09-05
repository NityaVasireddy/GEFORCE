import { useState } from "react";
import { Sparkles, Check } from "lucide-react";

const memeTemplates = [
  {
    name: "Drake Hotline Bling",
    emoji: "👍",
    description:
      "Perfect for comparing what you don't want vs what you actually want.",
    bestFor: "Choices & preferences",
  },
  {
    name: "Two Buttons",
    emoji: "😰",
    description:
      "Best for difficult choices and relatable situations.",
    bestFor: "Dilemmas & decisions",
  },
  {
    name: "Distracted Boyfriend",
    emoji: "👀",
    description:
      "Great for distractions, changing priorities and tempting alternatives.",
    bestFor: "Distractions & comparisons",
  },
  {
    name: "Expanding Brain",
    emoji: "🧠",
    description:
      "Works well for escalating ideas and over-the-top thinking.",
    bestFor: "Ideas & reactions",
  },
  {
    name: "This Is Fine",
    emoji: "🔥",
    description:
      "Perfect for staying calm while everything goes completely wrong.",
    bestFor: "Chaos & relatable moments",
  },
];

function MemeSuggestions({ description, tone }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const getSuggestions = () => {
    const text = description.toLowerCase();

    if (
      text.includes("choice") ||
      text.includes("choose") ||
      text.includes("decision") ||
      text.includes("between")
    ) {
      return [
        memeTemplates[1],
        memeTemplates[0],
        memeTemplates[2],
      ];
    }

    if (
      text.includes("work") ||
      text.includes("college") ||
      text.includes("study") ||
      text.includes("exam")
    ) {
      return [
        memeTemplates[4],
        memeTemplates[1],
        memeTemplates[0],
      ];
    }

    if (
      tone === "Gen-Z Humor" ||
      tone === "Dark Humor" ||
      tone === "Sarcastic"
    ) {
      return [
        memeTemplates[4],
        memeTemplates[0],
        memeTemplates[2],
      ];
    }

    return [
      memeTemplates[0],
      memeTemplates[1],
      memeTemplates[2],
    ];
  };

  const suggestions = getSuggestions();

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={19} className="text-red-500" />

        <div>
          <h2 className="text-lg font-semibold">
            Meme Template Suggestions
          </h2>

          <p className="text-sm text-gray-500">
            Click a template to select it
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {suggestions.map((template, index) => {
          const isSelected =
            selectedTemplate === template.name;

          return (
            <button
              key={template.name}
              type="button"
              onClick={() =>
                setSelectedTemplate(template.name)
              }
              className={`relative rounded-2xl border p-4 text-left transition ${
                isSelected
                  ? "border-red-500 bg-red-500/15 shadow-lg shadow-red-500/10"
                  : "border-white/10 bg-white/[0.03] hover:border-red-500/40 hover:bg-white/[0.05]"
              }`}
            >
              {/* Selected icon */}
              {isSelected && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
                  <Check size={15} />
                </div>
              )}

              <div className="mb-3 flex items-center justify-between">
                <span className="text-3xl">
                  {template.emoji}
                </span>

                {index === 0 && !isSelected && (
                  <span className="rounded-full bg-red-500/10 px-2 py-1 text-xs text-red-400">
                    Best Match
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-white">
                {template.name}
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                {template.description}
              </p>

              <div className="mt-3 text-xs text-gray-500">
                Best for:{" "}
                <span className="text-gray-300">
                  {template.bestFor}
                </span>
              </div>

              <div
                className={`mt-3 text-xs font-medium ${
                  isSelected
                    ? "text-red-400"
                    : "text-gray-500"
                }`}
              >
                {isSelected
                  ? "✓ Selected"
                  : "Click to select"}
              </div>
            </button>
          );
        })}
      </div>

      {selectedTemplate && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-300">
            Selected Template:{" "}
            <span className="font-semibold text-white">
              {selectedTemplate}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default MemeSuggestions;