import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
<<<<<<< HEAD

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
=======
import {
  LogOut,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";

import { auth } from "./firebase";
import Login from "./pages/Login";

import ImageUpload from "./components/ImageUpload";
import DescriptionInput from "./components/DescriptionInput";
import ToneSelector from "./components/ToneSelector";
import MemeSuggestions from "./components/MemeSuggestions";
import PlatformSelector from "./components/PlatformSelector";
import GenerateButton from "./components/GenerateButton";
import ResultsGrid from "./components/ResultsGrid";
import MemePreview from "./components/MemePreview";
import HistoryFavorites from "./components/HistoryFavorites";
import HashtagSuggestions from "./components/HashtagSuggestions";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(true);

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("Gen-Z Humor");
  const [platform, setPlatform] = useState("Instagram");

  const [captions, setCaptions] = useState([]);
  const [selectedCaption, setSelectedCaption] = useState("");

  // --------------------------------
  // FIREBASE AUTHENTICATION
  // --------------------------------
>>>>>>> backend

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
<<<<<<< HEAD
=======
        setLoading(false);
>>>>>>> backend
      }
    );

    return () => unsubscribe();
  }, []);

<<<<<<< HEAD
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
=======

  // --------------------------------
  // GENERATE CAPTIONS
  // --------------------------------

  const handleGenerate = () => {
    let generatedCaptions = [];

    if (platform === "Instagram") {
      generatedCaptions = [
        "POV: You thought today was going to be productive 💀✨",
        "Main character energy unlocked 😎🔥",
        "No thoughts, just vibes ✨",
        "This is your sign to post it anyway 🔥",
        "Mood: absolutely unbothered 😌",
        "#Vibes #Mood #Instagram",
      ];
    }

    else if (platform === "Twitter/X") {
      generatedCaptions = [
        "POV: I planned to be productive. That didn't happen 💀",
        "Main character energy.",
        "No thoughts. Just vibes.",
        "This is officially my mood 😂",
        "Someone explain this situation.",
      ];
    }

    else if (platform === "TikTok") {
      generatedCaptions = [
        "POV: When you try to be productive 💀😂 #fyp #viral",
        "Main character energy unlocked ✨ #fyp #mood",
        "No thoughts, just vibes 😎 #viral #trending",
        "Tell me you relate without telling me 😂 #fyp",
        "This literally describes my life 💀 #relatable",
      ];
    }

    else if (platform === "LinkedIn") {
      generatedCaptions = [
        "Sometimes productivity looks different than we expect. 🚀",
        "A reminder that progress comes from consistency and learning.",
        "Every experience is an opportunity to learn something new.",
        "Turning everyday moments into meaningful lessons.",
        "Growth happens when we step outside our comfort zone.",
      ];
    }

    else if (platform === "YouTube") {
      generatedCaptions = [
        "The Productivity Struggle 😂 | You Won't Believe What Happened!",
        "Main Character Energy ✨ | Relatable Moments",
        "No Thoughts, Just Vibes 😎 | Funny Moments",
        "This Moment Was Too Good Not To Share 😂",
        "The Most Relatable Moment Ever! 🔥",
      ];
    }


    // --------------------------------
    // SET CAPTIONS
    // --------------------------------

    setCaptions(generatedCaptions);

    // First caption for Meme Preview
    setSelectedCaption(generatedCaptions[0]);


    // --------------------------------
    // SAVE CAPTIONS TO HISTORY
    // --------------------------------

    const oldHistory = JSON.parse(
      localStorage.getItem("captionHistory") || "[]"
    );

    const newHistoryItems =
      generatedCaptions.map(
        (caption, index) => ({
          id: `${Date.now()}-${index}`,
          caption: caption,
          platform: platform,
          tone: tone,
          date: new Date().toLocaleString(),
        })
      );

    const updatedHistory = [
      ...newHistoryItems,
      ...oldHistory,
    ].slice(0, 30);

    localStorage.setItem(
      "captionHistory",
      JSON.stringify(updatedHistory)
    );
  };


  // --------------------------------
  // LOGOUT
  // --------------------------------
>>>>>>> backend

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
<<<<<<< HEAD
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
=======
      console.error(
        "Logout error:",
        error
      );
    }
  };


  // --------------------------------
  // LOADING SCREEN
  // --------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] text-white">

        <div className="text-center">

          <Sparkles
            size={35}
            className="mx-auto mb-3 animate-pulse text-red-500"
          />

          <p className="text-gray-400">
            Loading...
          </p>

        </div>

      </div>
    );
  }


  // --------------------------------
  // LOGIN SCREEN
  // --------------------------------

  if (!user) {
    return <Login />;
  }


  // --------------------------------
  // MAIN UI
  // --------------------------------

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-[#080808] text-white"
          : "min-h-screen bg-gray-100 text-gray-900"
      }
    >

      {/* =================================
          HEADER
      ================================= */}

      <header
        className={
          darkMode
            ? "border-b border-white/10 bg-[#080808]"
            : "border-b border-gray-200 bg-white"
        }
      >

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/20">

              <Sparkles size={21} />

            </div>

            <div>

              <h1 className="font-bold">
                AI Caption Generator
              </h1>

              <p className="text-xs text-gray-500">
                Create captions. Make an impact.
              </p>

            </div>

          </div>


          {/* HEADER RIGHT */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm text-gray-200">
                {user.displayName ||
                  user.email}
              </p>

              <p className="text-xs text-gray-500">
                Logged in
              </p>

            </div>


            {/* THEME BUTTON */}

            <button
              type="button"
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
            >

              {darkMode ? (
                <Sun
                  size={19}
                  className="text-yellow-300"
                />
              ) : (
                <Moon size={19} />
              )}

            </button>


            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
            >

              <LogOut size={16} />

              <span className="hidden sm:block">
                Logout
              </span>

            </button>

          </div>

        </div>

      </header>


      {/* =================================
          MAIN
      ================================= */}

      <main className="mx-auto max-w-7xl px-5 py-10">


        {/* HERO */}

        <div className="mb-10 text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">

            <Sparkles size={15} />

            AI-Powered Content Creation

          </div>


          <h2 className="text-4xl font-bold text-white sm:text-5xl">

            Turn your image into a

            <span className="text-red-600">
              {" "}viral caption
            </span>

          </h2>


          <p className="mx-auto mt-4 max-w-2xl text-gray-400">

            Upload an image, describe your situation,
            choose a tone and platform, and let AI
            create captions for you.

          </p>

        </div>


        {/* =================================
            TWO COLUMN LAYOUT
        ================================= */}

        <div className="grid gap-6 lg:grid-cols-2">


          {/* =================================
              LEFT SIDE
          ================================= */}

          <div className="space-y-5">


            {/* IMAGE UPLOAD */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

>>>>>>> backend
              <ImageUpload
                image={image}
                setImage={setImage}
              />
<<<<<<< HEAD
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
=======

            </div>


            {/* DESCRIPTION */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

              <DescriptionInput
                description={description}
                setDescription={setDescription}
              />

            </div>


            {/* TONE */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

              <ToneSelector
                tone={tone}
                setTone={setTone}
              />

            </div>


            {/* PLATFORM */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

              <PlatformSelector
                platform={platform}
                setPlatform={setPlatform}
              />

            </div>


            {/* MEME SUGGESTIONS */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

              <MemeSuggestions
                description={description}
                tone={tone}
              />

            </div>


            {/* GENERATE BUTTON */}

            <GenerateButton
              onClick={handleGenerate}
>>>>>>> backend
            />

          </div>

<<<<<<< HEAD
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
=======

          {/* =================================
              RIGHT SIDE
          ================================= */}

          <div className="space-y-5">


            {/* MEME PREVIEW */}

            <MemePreview
              image={image}
              caption={selectedCaption}
            />


            {/* GENERATED CAPTIONS */}

            {captions.length > 0 ? (

              <ResultsGrid
                captions={captions}
                platform={platform}
                tone={tone}
              />

            ) : (

              <div className="flex min-h-[250px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03]">

                <div className="px-6 text-center">

                  <Sparkles
                    size={30}
                    className="mx-auto mb-4 text-gray-600"
                  />

                  <h3 className="text-lg font-semibold text-gray-300">

                    Your captions will appear here

                  </h3>

                  <p className="mt-2 text-sm text-gray-500">

                    Generate captions to see your results.

                  </p>

                </div>

              </div>

            )}


            {/* =================================
                HASHTAG SUGGESTIONS
            ================================= */}
>>>>>>> backend

            <HashtagSuggestions
              description={description}
              tone={tone}
              platform={platform}
<<<<<<< HEAD
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
=======
            />

          </div>

        </div>


        {/* =================================
            HISTORY & FAVORITES
        ================================= */}

        <div className="mt-8">

          <HistoryFavorites />

        </div>

      </main>


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="border-t border-white/10 py-6 text-center text-xs text-gray-600">

        AI Caption Generator • Create. Caption. Share.

>>>>>>> backend
      </footer>

    </div>
  );
}

export default App;