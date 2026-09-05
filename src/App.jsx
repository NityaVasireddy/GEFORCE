import { useState } from "react";

import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";
import DescriptionInput from "./components/DescriptionInput";
import ToneSelector from "./components/ToneSelector";
import GenerateButton from "./components/GenerateButton";
import ResultsGrid from "./components/ResultsGrid";
import LoadingSkeleton from "./components/LoadingSkeleton";

function App() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedTone, setSelectedTone] = useState("Gen-Z");
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateCaptions = () => {
    setLoading(true);
    setCaptions([]);

    // Temporary demo captions
    setTimeout(() => {
      setCaptions([
        "Bro really chose chaos today 💀",
        "POV: Your dog pays zero rent.",
        "The room said character development.",
        "My dog understood the assignment... incorrectly.",
        "Home sweet disaster.",
        "And this is why we can't have nice things 💀",
      ]);

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

        {/* Hero Section */}
        <section className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            ✨ AI-Powered Content Creation
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Turn Your{" "}
            <span className="text-red-500">Moments</span>
            <br />
            Into Captions
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Upload an image, describe your situation, choose a tone,
            and let AI create witty captions for your social media.
          </p>
        </section>

        {/* Input Section */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl sm:p-8">

          <div className="space-y-8">

            <ImageUpload
              image={image}
              setImage={setImage}
            />

            <DescriptionInput
              description={description}
              setDescription={setDescription}
            />

            <ToneSelector
              selectedTone={selectedTone}
              setSelectedTone={setSelectedTone}
            />

            <GenerateButton
              onGenerate={generateCaptions}
              loading={loading}
              disabled={!image && !description.trim()}
            />

          </div>
        </section>

        {/* Results */}
        {loading && <LoadingSkeleton />}

        {!loading && captions.length > 0 && (
          <ResultsGrid captions={captions} />
        )}

      </main>
    </div>
  );
}

export default App;