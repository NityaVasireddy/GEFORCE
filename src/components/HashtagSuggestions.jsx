import { useEffect, useState } from "react";
import { Hash, Copy, Check } from "lucide-react";

function HashtagSuggestions({
  description = "",
  tone = "Gen-Z Humor",
  platform = "Instagram",
}) {
  const [hashtags, setHashtags] = useState([]);
  const [copied, setCopied] = useState(false);

  const generateHashtags = () => {
    const text = description.toLowerCase();

    let tags = [];

    // --------------------------------
    // 1. DESCRIPTION BASED HASHTAGS
    // --------------------------------

    if (
      text.includes("college") ||
      text.includes("student") ||
      text.includes("exam") ||
      text.includes("study")
    ) {
      tags = [
        "#CollegeLife",
        "#StudentLife",
        "#StudyLife",
        "#ExamMood",
        "#CollegeMemes",
        "#StudentMemes",
      ];
    }

    else if (
      text.includes("work") ||
      text.includes("office") ||
      text.includes("job")
    ) {
      tags = [
        "#WorkLife",
        "#OfficeLife",
        "#WorkMemes",
        "#MondayMood",
        "#Relatable",
        "#WorkHumor",
      ];
    }

    else if (
      text.includes("food") ||
      text.includes("eat") ||
      text.includes("restaurant")
    ) {
      tags = [
        "#Foodie",
        "#FoodLover",
        "#FoodieLife",
        "#FoodMemes",
        "#FoodMood",
        "#Yummy",
      ];
    }

    else {
      tags = [
        "#Relatable",
        "#Funny",
        "#Memes",
        "#Mood",
        "#Vibes",
        "#Trending",
      ];
    }


    // --------------------------------
    // 2. TONE BASED HASHTAGS
    // --------------------------------

    if (tone === "Gen-Z Humor") {
      tags.push(
        "#GenZ",
        "#GenZHumor",
        "#POV"
      );
    }

    if (tone === "Sarcastic") {
      tags.push(
        "#Sarcasm",
        "#Sarcastic",
        "#Funny"
      );
    }

    if (tone === "Wholesome") {
      tags.push(
        "#GoodVibes",
        "#PositiveVibes",
        "#Wholesome"
      );
    }

    if (tone === "Professional") {
      tags.push(
        "#Professional",
        "#Career",
        "#Growth"
      );
    }

    if (tone === "Dark Humor") {
      tags.push(
        "#DarkHumor",
        "#MemeCulture",
        "#Humor"
      );
    }


    // --------------------------------
    // 3. PLATFORM BASED HASHTAGS
    // --------------------------------

    if (platform === "Instagram") {
      tags.push(
        "#Instagram",
        "#InstaDaily"
      );
    }

    if (platform === "TikTok") {
      tags.push(
        "#TikTok",
        "#FYP",
        "#ForYou"
      );
    }

    if (platform === "Twitter/X") {
      tags.push(
        "#Twitter",
        "#Trending"
      );
    }

    if (platform === "YouTube") {
      tags.push(
        "#YouTube",
        "#YouTubeShorts"
      );
    }

    if (platform === "LinkedIn") {
      tags.push(
        "#LinkedIn",
        "#Networking"
      );
    }


    // --------------------------------
    // 4. REMOVE DUPLICATES
    // --------------------------------

    const uniqueTags = [
      ...new Set(tags),
    ];


    // Show maximum 12 hashtags
    setHashtags(
      uniqueTags.slice(0, 12)
    );
  };


  // --------------------------------
  // AUTO GENERATE
  // --------------------------------

  useEffect(() => {
    generateHashtags();
  }, [description, tone, platform]);


  // --------------------------------
  // COPY ALL
  // --------------------------------

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        hashtags.join(" ")
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);

    } catch (error) {
      console.error(
        "Copy hashtags failed:",
        error
      );
    }
  };


  // --------------------------------
  // UI
  // --------------------------------

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

      {/* HEADER */}

      <div className="mb-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">

            <Hash
              size={20}
              className="text-red-400"
            />

          </div>


          <div>

            <h2 className="text-lg font-semibold text-white">
              Hashtag Suggestions
            </h2>

            <p className="text-sm text-gray-500">
              Relevant hashtags generated for your content
            </p>

          </div>

        </div>


        {/* COPY ALL BUTTON */}

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:border-white/20 hover:text-white"
        >

          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy All
            </>
          )}

        </button>

      </div>


      {/* HASHTAGS */}

      <div className="flex flex-wrap gap-2">

        {hashtags.map((hashtag) => (

          <span
            key={hashtag}
            className="cursor-default rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:border-red-500/40 hover:bg-red-500/15"
          >
            {hashtag}
          </span>

        ))}

      </div>


      {/* INFO */}

      <div className="mt-4 rounded-xl border border-white/5 bg-black/20 px-3 py-2">

        <p className="text-xs text-gray-500">

          ✨ Generated for{" "}

          <span className="text-gray-300">
            {platform}
          </span>

          {" "}•{" "}

          <span className="text-gray-300">
            {tone}
          </span>

        </p>

      </div>

    </div>
  );
}

export default HashtagSuggestions;