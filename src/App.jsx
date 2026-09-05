import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";

import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";
import DescriptionInput from "./components/DescriptionInput";
import ToneSelector from "./components/ToneSelector";
import GenerateButton from "./components/GenerateButton";
import ResultsGrid from "./components/ResultsGrid";
import HashtagSuggestions from "./components/HashtagSuggestions";
import MemeSuggestions from "./components/MemeSuggestions";
import MemePreview from "./components/MemePreview";
import HistoryFavorites from "./components/HistoryFavorites";

function App() {
  /* ================= USER ================= */

  const [user, setUser] = useState(null);

  /* ================= THEME ================= */

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return true;
  });

  /* ================= INPUTS ================= */

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("Funny");
  const [platform, setPlatform] = useState("Instagram");

  /* ================= RESULTS ================= */

  const [captions, setCaptions] = useState([]);
  const [selectedCaption, setSelectedCaption] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const [loading, setLoading] = useState(false);

  /* ================= AUTH ================= */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  /* ================= THEME ================= */

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");

      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /* ================= LOGOUT ================= */

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /* ================= GENERATE ================= */

  const handleGenerate = async () => {
    if (!description.trim() && !image) {
      alert("Please upload an image or enter a description.");
      return;
    }

    setLoading(true);

    try {
      /*
       * Temporary captions.
       * Later these can be replaced with the backend AI API.
       */

      const generatedCaptions = [
        {
          id: 1,
          caption: "POV: You thought today was going to be productive 💀",
        },
        {
          id: 2,
          caption: "Main character energy unlocked ✨",
        },
        {
          id: 3,
          caption: "No thoughts, just vibes 😎",
        },
        {
          id: 4,
          caption: "This is officially my mood 😂",
        },
        {
          id: 5,
          caption: "Living the moment like there is no tomorrow 🔥",
        },
      ];

      const generatedHashtags = [
        "#Relatable",
        "#Funny",
        "#Memes",
        "#Mood",
        "#Vibes",
      ];

      setCaptions(generatedCaptions);
      setAiSuggestions(generatedHashtags);

      /*
       * Select first caption automatically
       */

      setSelectedCaption(generatedCaptions[0].caption);

      /* ================= HISTORY ================= */

      const historyItem = {
        id: Date.now(),
        description,
        tone,
        platform,
        caption: generatedCaptions[0].caption,
        date: new Date().toLocaleString(),
      };

      const oldHistory =
        JSON.parse(localStorage.getItem("captionHistory")) || [];

      localStorage.setItem(
        "captionHistory",
        JSON.stringify([historyItem, ...oldHistory])
      );
    } catch (error) {
      console.error("Generation error:", error);
      alert("Something went wrong while generating captions.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SELECT CAPTION ================= */

  const handleSelectCaption = (item) => {
    const text =
      typeof item === "string"
        ? item
        : item?.caption || "";

    setSelectedCaption(text);
  };

  /* ================= MAIN UI ================= */

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-[#080808] text-white"
          : "bg-[#f5f5f5] text-black"
      }`}
    >
      {/* ================= HEADER ================= */}

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
      />

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-5 py-8">

        {/* ================= WELCOME ================= */}

        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            AI Meme & Caption Generator
          </h1>

          <p
            className={`mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Create funny, creative and engaging captions
            for your social media posts.
          </p>

          {user && (
            <p
              className={`mt-2 text-sm ${
                darkMode ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Welcome, {user.displayName || user.email}
            </p>
          )}
        </div>

        {/* ================= INPUT SECTION ================= */}

        <section
          className={`rounded-3xl border p-6 transition-colors ${
            darkMode
              ? "border-white/10 bg-white/[0.03]"
              : "border-black/10 bg-white shadow-sm"
          }`}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* IMAGE UPLOAD */}

            <div>
              <ImageUpload
                image={image}
                setImage={setImage}
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <DescriptionInput
                description={description}
                setDescription={setDescription}
              />
            </div>

          </div>

          {/* ================= TONE + PLATFORM ================= */}

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

            <ToneSelector
              tone={tone}
              setTone={setTone}
            />

            <div>
              <label
                className={`mb-2 block text-sm font-medium ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Platform
              </label>

              <select
                value={platform}
                onChange={(e) =>
                  setPlatform(e.target.value)
                }
                className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                  darkMode
                    ? "border-white/10 bg-black text-white"
                    : "border-black/10 bg-white text-black"
                }`}
              >
                <option value="Instagram">
                  Instagram
                </option>

                <option value="Facebook">
                  Facebook
                </option>

                <option value="Twitter">
                  Twitter / X
                </option>

                <option value="LinkedIn">
                  LinkedIn
                </option>

                <option value="WhatsApp">
                  WhatsApp
                </option>
              </select>
            </div>

          </div>

          {/* ================= GENERATE ================= */}

          <div className="mt-6">
            <GenerateButton
              onClick={handleGenerate}
              loading={loading}
            />
          </div>
        </section>

        {/* ================= RESULTS ================= */}

        {captions.length > 0 && (
          <section className="mt-8">

            <ResultsGrid
              captions={captions}
              onSelectCaption={handleSelectCaption}
            />

          </section>
        )}

        {/* ================= HASHTAGS ================= */}

        {captions.length > 0 && (
          <section className="mt-8">
            <HashtagSuggestions
              description={description}
              tone={tone}
              platform={platform}
              hashtags={aiSuggestions}
            />
          </section>
        )}

        {/* ================= MEME SUGGESTIONS ================= */}

        {captions.length > 0 && (
          <section className="mt-8">
            <MemeSuggestions
              description={description}
              tone={tone}
            />
          </section>
        )}

        {/* ================= MEME PREVIEW ================= */}

        <section className="mt-8">
          <MemePreview
            image={image}
            caption={selectedCaption}
          />
        </section>

        {/* ================= HISTORY ================= */}

        <section className="mt-8">
          <HistoryFavorites />
        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer
        className={`border-t px-5 py-6 text-center text-sm ${
          darkMode
            ? "border-white/10 text-gray-600"
            : "border-black/10 text-gray-500"
        }`}
      >
        AI Meme & Caption Generator © 2026
      </footer>
    </div>
  );
}

export default App;