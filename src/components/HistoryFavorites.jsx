import { useEffect, useState } from "react";
import {
  Heart,
  History,
  Trash2,
  Copy,
  Check,
} from "lucide-react";

function HistoryFavorites() {
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("history");
  const [copiedId, setCopiedId] = useState(null);

  const loadData = () => {
    try {
      const savedHistory = JSON.parse(
        localStorage.getItem("captionHistory") || "[]"
      );

      const savedFavorites = JSON.parse(
        localStorage.getItem("captionFavorites") || "[]"
      );

      setHistory(savedHistory);
      setFavorites(savedFavorites);
    } catch (error) {
      console.error("Loading history error:", error);
      setHistory([]);
      setFavorites([]);
    }
  };

  useEffect(() => {
    loadData();

    const handleStorageChange = () => {
      loadData();
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      loadData();
    }, 500);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
      clearInterval(interval);
    };
  }, []);

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const deleteHistory = (id) => {
    const updatedHistory = history.filter(
      (item) => item.id !== id
    );

    setHistory(updatedHistory);

    localStorage.setItem(
      "captionHistory",
      JSON.stringify(updatedHistory)
    );
  };

  const deleteFavorite = (id) => {
    const updatedFavorites = favorites.filter(
      (item) => item.id !== id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "captionFavorites",
      JSON.stringify(updatedFavorites)
    );
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("captionHistory");
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("captionFavorites");
  };

  const items =
    activeTab === "history"
      ? history
      : favorites;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

      {/* HEADER */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          History & Favorites
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Save and revisit captions you liked.
        </p>
      </div>


      {/* TABS */}
      <div className="mb-5 flex gap-2 rounded-xl bg-black/30 p-1">

        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            activeTab === "history"
              ? "bg-white/10 text-white"
              : "text-gray-500 hover:text-white"
          }`}
        >
          <History size={17} />

          History

          <span className="text-xs text-gray-500">
            ({history.length})
          </span>
        </button>


        <button
          type="button"
          onClick={() => setActiveTab("favorites")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            activeTab === "favorites"
              ? "bg-red-500/15 text-red-400"
              : "text-gray-500 hover:text-white"
          }`}
        >
          <Heart size={17} />

          Favorites

          <span className="text-xs text-gray-500">
            ({favorites.length})
          </span>
        </button>

      </div>


      {/* CLEAR ALL */}
      {items.length > 0 && (
        <div className="mb-4 flex justify-end">

          <button
            type="button"
            onClick={
              activeTab === "history"
                ? clearHistory
                : clearFavorites
            }
            className="text-xs text-gray-500 transition hover:text-red-400"
          >
            Clear All
          </button>

        </div>
      )}


      {/* EMPTY */}
      {items.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-5 py-10 text-center">

          {activeTab === "history" ? (
            <History
              size={35}
              className="mx-auto mb-3 text-gray-600"
            />
          ) : (
            <Heart
              size={35}
              className="mx-auto mb-3 text-gray-600"
            />
          )}

          <h3 className="text-sm font-semibold text-gray-400">
            {activeTab === "history"
              ? "No caption history yet"
              : "No favorite captions yet"}
          </h3>

          <p className="mt-2 text-xs text-gray-600">
            {activeTab === "history"
              ? "Generate captions to see them here."
              : "Favorite a caption to save it here."}
          </p>

        </div>

      ) : (

        /* ITEMS */
        <div className="space-y-3">

          {items.map((item) => (

            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-white/20"
            >

              <p className="text-sm leading-6 text-gray-200">
                {item.caption}
              </p>


              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600">

                {item.platform && (
                  <span className="rounded-full bg-white/5 px-2 py-1">
                    {item.platform}
                  </span>
                )}

                {item.tone && (
                  <span className="rounded-full bg-white/5 px-2 py-1">
                    {item.tone}
                  </span>
                )}

                {item.date && (
                  <span>
                    {item.date}
                  </span>
                )}

              </div>


              <div className="mt-3 flex items-center gap-2">

                {/* COPY */}
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      item.caption,
                      item.id
                    )
                  }
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-400 transition hover:border-white/20 hover:text-white"
                >

                  {copiedId === item.id ? (
                    <>
                      <Check size={13} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      Copy
                    </>
                  )}

                </button>


                {/* DELETE */}
                <button
                  type="button"
                  onClick={() =>
                    activeTab === "history"
                      ? deleteHistory(item.id)
                      : deleteFavorite(item.id)
                  }
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-500 transition hover:border-red-500/30 hover:text-red-400"
                >
                  <Trash2 size={13} />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default HistoryFavorites;