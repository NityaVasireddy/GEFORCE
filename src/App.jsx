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

/* =========================
   Convert File to Base64
========================= */

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
};

function App() {
  /* =========================
     Authentication
  ========================= */

  const [user, setUser] = useState(null);

  /* =========================
     Theme
  ========================= */

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return true;
  });

  /* =========================
     Main States
  ========================= */

  const [image, setImage] = useState(null);

  const [description, setDescription] = useState("");

  const [tone, setTone] = useState("Funny");

  const [platform, setPlatform] = useState("Instagram");

  /* =========================
     Caption States
  ========================= */

  const [captions, setCaptions] = useState([]);

  const [selectedCaption, setSelectedCaption] = useState("");

  const [aiSuggestions, setAiSuggestions] = useState([]);

  const [loading, setLoading] = useState(false);

  /* =========================
     Firebase Auth Listener
  ========================= */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  /* =========================
     Theme Effect
  ========================= */

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

  /* =========================
     Logout
  ========================= */

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /* =========================
     Generate Captions
  ========================= */

  const handleGenerate = async () => {
    if (!description.trim() && !image) {
      alert(
        "Please upload an image or enter a description."
      );

      return;
    }

    setLoading(true);

    try {
      /* =========================
         1. Extract Exact Base64 Image
      ========================= */

      let imageBase64 = null;

      if (image?.base64) {
        imageBase64 = image.base64;
      } else if (image?.preview) {
        imageBase64 = image.preview;
      } else if (typeof image === "string") {
        imageBase64 = image;
      } else if (image instanceof File) {
        imageBase64 = await getBase64(image);
      } else if (image?.file instanceof File) {
        imageBase64 = await getBase64(image.file);
      }

      console.log(
        "Image Base64 available:",
        !!imageBase64
      );

      /* =========================
         2. Backend API Request
      ========================= */

      const response = await fetch(
        "http://localhost:5000/api/generate",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            description,
            tone,
            platform,
            imageBase64,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Backend response:", data);

      /* =========================
         3. Captions
      ========================= */

      if (
        data.success &&
        Array.isArray(data.captions)
      ) {
        const formattedCaptions =
          data.captions.map((item, index) => {
            if (typeof item === "string") {
              return {
                id: Date.now() + index,
                caption: item,
              };
            }

            return {
              id:
                item.id ||
                Date.now() + index,

              caption:
                item.caption ||
                item.text ||
                "",
            };
          });

        setCaptions(formattedCaptions);

        if (formattedCaptions.length > 0) {
          setSelectedCaption(
            formattedCaptions[0].caption
          );
        }
      } else {
        setCaptions([]);
        setSelectedCaption("");
      }

      /* =========================
         4. Hashtags
      ========================= */

      if (Array.isArray(data.hashtags)) {
        setAiSuggestions(data.hashtags);
      } else {
        setAiSuggestions([]);
      }

      /* =========================
         5. Save History
      ========================= */

      const firstCaption =
        data.captions?.[0];

      const historyCaption =
        typeof firstCaption === "string"
          ? firstCaption
          : firstCaption?.caption ||
            firstCaption?.text ||
            "";

      const historyItem = {
        id: Date.now(),

        description,

        tone,

        platform,

        caption: historyCaption,

        date: new Date().toLocaleString(),
      };

      const oldHistory =
        JSON.parse(
          localStorage.getItem(
            "captionHistory"
          )
        ) || [];

      localStorage.setItem(
        "captionHistory",
        JSON.stringify([
          historyItem,
          ...oldHistory,
        ])
      );
    } catch (error) {
      console.error(
        "Generation error:",
        error
      );

      alert(
        "Unable to connect to the backend. Please make sure your backend server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Select Caption
  ========================= */

  const handleSelectCaption = (item) => {
    const text =
      typeof item === "string"
        ? item
        : item?.caption || "";

    setSelectedCaption(text);
  };

  /* =========================
     UI
  ========================= */

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-[#080808] text-white"
          : "bg-[#f5f5f5] text-black"
      }`}
    >
      {/* Header */}

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
      />

      <main className="mx-auto max-w-7xl px-5 py-8">

        {/* =========================
            Page Heading
        ========================= */}

        <div className="mb-8">

          <h1
            className={`text-3xl font-bold ${
              darkMode
                ? "text-white"
                : "text-black"
            }`}
          >
            AI Meme & Caption Generator
          </h1>

          <p
            className={`mt-2 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Create funny, creative and engaging
            captions for your social media posts.
          </p>

          {user && (
            <p
              className={`mt-2 text-sm ${
                darkMode
                  ? "text-gray-500"
                  : "text-gray-500"
              }`}
            >
              Welcome,{" "}
              {user.displayName ||
                user.email}
            </p>
          )}
        </div>

        {/* =========================
            Input Section
        ========================= */}

        <section
          className={`rounded-3xl border p-6 transition-colors ${
            darkMode
              ? "border-white/10 bg-white/[0.03]"
              : "border-black/10 bg-white shadow-sm"
          }`}
        >

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* Image */}

            <div>
              <ImageUpload
                image={image}
                setImage={setImage}
              />
            </div>

            {/* Description */}

            <div>
              <DescriptionInput
                description={description}
                setDescription={
                  setDescription
                }
              />
            </div>

          </div>

          {/* Tone + Platform */}

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Tone */}

            <ToneSelector
              tone={tone}
              setTone={setTone}
            />

            {/* Platform */}

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
                  setPlatform(
                    e.target.value
                  )
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

          {/* Generate */}

          <div className="mt-6">

            <GenerateButton
              onClick={handleGenerate}
              loading={loading}
            />

          </div>

        </section>

        {/* =========================
            Caption Results
        ========================= */}

        {captions.length > 0 && (
          <section className="mt-8">

            <ResultsGrid
              captions={captions}
              onSelectCaption={
                handleSelectCaption
              }
            />

          </section>
        )}

        {/* =========================
            Hashtags
        ========================= */}

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

        {/* =========================
            Meme Suggestions
        ========================= */}

        {captions.length > 0 && (
          <section className="mt-8">

            <MemeSuggestions
              description={description}
              tone={tone}
            />

          </section>
        )}

        {/* =========================
            Meme Preview
        ========================= */}

        <section className="mt-8">

          <MemePreview
            image={image}
            caption={selectedCaption}
          />

        </section>

        {/* =========================
            History & Favorites
        ========================= */}

        <section className="mt-8">

          <HistoryFavorites />

        </section>

      </main>

      {/* =========================
          Footer
      ========================= */}

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