import { Sparkles } from "lucide-react";

function GenerateButton({ onGenerate, loading, disabled }) {
  return (
    <button
      type="button"
      onClick={onGenerate}
      disabled={disabled || loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <>
          <span className="animate-spin">⟳</span>
          Generating Captions...
        </>
      ) : (
        <>
          <Sparkles size={20} />
          Generate Captions
        </>
      )}
    </button>
  );
}

export default GenerateButton;