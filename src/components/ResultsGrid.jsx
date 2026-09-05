import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";

function ResultsGrid({
  captions = [],
  platform = "Instagram",
  tone = "Gen-Z Humor",
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(
      localStorage.getItem("captionFavorites") || "[]"
    );
  });

  const handleCopy = async (caption, id) => {
    try {
      await navigator.clipboard.writeText(caption);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleFavorite = (caption, id) => {
    const exists = favorites.some(
      (item) => item.caption === caption
    );

    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter(
        (item) => item.caption !== caption
      );
    } else {
      const newFavorite = {
        id: `${Date.now()}-${id}`,
        caption,
        platform,
        tone,
        date: new Date().toLocaleString(),
      };

      updatedFavorites = [
        newFavorite,
        ...favorites,
      ];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "captionFavorites",
      JSON.stringify(updatedFavorites)
    );
  };

  const isFavorite = (caption) => {
    return favorites.some(
      (item) => item.caption === caption
    );
  };

  if (!captions.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

      {/* HEADER */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Generated Captions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Choose your favorite caption or copy it.
        </p>
      </div>


      {/* CAPTIONS */}
      <div className="space-y-3">

        {captions.map((caption, index) => {

          const favorite = isFavorite(caption);

          return (
            <div
              key={`${caption}-${index}`}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-white/20"
            >

              {/* Caption */}
              <p className="text-sm leading-6 text-gray-200">
                {caption}
              </p>


              {/* Buttons */}
              <div className="mt-4 flex items-center gap-2">

                {/* COPY */}
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      caption,
                      index
                    )
                  }
                  className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:border-white/20 hover:text-white"
                >
                  {copiedId === index ? (
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


                {/* FAVORITE */}
                <button
                  type="button"
                  onClick={() =>
                    handleFavorite(
                      caption,
                      index
                    )
                  }
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${
                    favorite
                      ? "border-red-500/30 bg-red-500/10 text-red-400"
                      : "border-white/10 text-gray-400 hover:border-red-500/30 hover:text-red-400"
                  }`}
                >
                  <Heart
                    size={14}
                    fill={
                      favorite
                        ? "currentColor"
                        : "none"
                    }
                  />

                  {favorite
                    ? "Favorited"
                    : "Favorite"}
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default ResultsGrid;