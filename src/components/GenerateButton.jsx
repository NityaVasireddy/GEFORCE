import { Sparkles } from "lucide-react";

function GenerateButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-500 active:scale-[0.98]"
    >
      <Sparkles size={20} />
      Generate Captions
    </button>
  );
}

export default GenerateButton;