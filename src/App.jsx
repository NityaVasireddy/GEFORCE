import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);


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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
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

              <ImageUpload
                image={image}
                setImage={setImage}
              />

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
            />

          </div>


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

            <HashtagSuggestions
              description={description}
              tone={tone}
              platform={platform}
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

      </footer>

    </div>
  );
}

export default App;