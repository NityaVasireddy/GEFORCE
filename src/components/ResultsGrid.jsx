import CaptionCard from "./CaptionCard";

function ResultsGrid({ captions }) {
  if (!captions || captions.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          Generated Captions ✨
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Choose your favorite caption and copy it instantly.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {captions.map((caption, index) => (
          <CaptionCard
            key={index}
            caption={caption}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default ResultsGrid;