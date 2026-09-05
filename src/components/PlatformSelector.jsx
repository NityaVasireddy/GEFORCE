const platforms = [
  {
    name: "Instagram",
    icon: "📸",
    description: "Short + catchy + hashtags",
  },
  {
    name: "Twitter/X",
    icon: "𝕏",
    description: "Short + witty",
  },
  {
    name: "TikTok",
    icon: "🎵",
    description: "Trendy + hashtags",
  },
  {
    name: "LinkedIn",
    icon: "💼",
    description: "Professional + detailed",
  },
  {
    name: "YouTube",
    icon: "▶️",
    description: "Title + description + tags",
  },
];

function PlatformSelector({ platform, setPlatform }) {
  return (
    <div className="w-full">

      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">
          Choose Platform
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Format your caption for a specific social media platform.
        </p>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">

        {platforms.map((item) => {
          const isSelected = platform === item.name;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setPlatform(item.name)}
              className={`rounded-xl border p-3 text-center transition ${
                isSelected
                  ? "border-red-500 bg-red-500/15 text-white shadow-lg shadow-red-500/10"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:text-white"
              }`}
            >

              {/* Icon */}
              <div className="mb-2 text-2xl">
                {item.icon}
              </div>

              {/* Platform name */}
              <div className="text-sm font-semibold">
                {item.name}
              </div>

              {/* Description */}
              <div className="mt-1 text-[10px] leading-4 text-gray-500">
                {item.description}
              </div>

            </button>
          );
        })}

      </div>

      {/* Selected Platform */}
      {platform && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-300">
            Selected Platform:{" "}
            <span className="font-semibold text-white">
              {platform}
            </span>
          </p>
        </div>
      )}

    </div>
  );
}

export default PlatformSelector;