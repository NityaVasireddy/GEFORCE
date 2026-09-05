import { Sparkles } from "lucide-react";

function Header() {
  return (
    <header className="border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600">
            <Sparkles size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold">
              AI Caption Generator
            </h1>

            <p className="text-xs text-gray-400">
              Create captions. Make an impact.
            </p>
          </div>
        </div>

        <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-400">
          AI Powered
        </span>

      </div>
    </header>
  );
}

export default Header;