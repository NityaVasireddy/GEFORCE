import { Briefcase, Heart, Laugh, Skull, Smile } from "lucide-react";

const tones = [
  {
    name: "Sarcastic",
    icon: Laugh,
    emoji: "😏",
  },
  {
    name: "Gen-Z Humor",
    icon: Skull,
    emoji: "💀",
  },
  {
    name: "Wholesome",
    icon: Heart,
    emoji: "🥰",
  },
  {
    name: "Professional",
    icon: Briefcase,
    emoji: "💼",
  },
  {
    name: "Dark Humor",
    icon: Smile,
    emoji: "🖤",
  },
];

function ToneSelector({ tone, setTone }) {
  return (
    <div className="w-full">
      <h2 className="mb-3 text-lg font-semibold">
        Choose Your Tone
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {tones.map((item) => {
          const Icon = item.icon;
          const isSelected = tone === item.name;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setTone(item.name)}
              className={`rounded-xl border p-3 text-sm transition ${
                isSelected
                  ? "border-red-500 bg-red-500/15 text-white"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:text-white"
              }`}
            >
              <Icon size={20} className="mx-auto mb-2" />

              <div className="text-lg">{item.emoji}</div>

              <div className="mt-1 font-medium">
                {item.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ToneSelector;