import {
  Moon,
  Sun,
  LogOut,
  Sparkles,
} from "lucide-react";

function Header({ darkMode, setDarkMode, onLogout }) {
  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        darkMode
          ? "border-white/10 bg-black/80"
          : "border-black/10 bg-white/80"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              darkMode
                ? "bg-white/10"
                : "bg-black/10"
            }`}
          >
            <Sparkles
              size={21}
              className={
                darkMode ? "text-white" : "text-black"
              }
            />
          </div>

          <div>
            <h1
              className={`text-lg font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              AI Caption Generator
            </h1>

            <p
              className={`text-xs ${
                darkMode ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Create. Caption. Share.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">

          {/* THEME BUTTON */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={
              darkMode
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"
            }
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
              darkMode
                ? "border-white/10 bg-white/5 text-yellow-300 hover:bg-white/10"
                : "border-black/10 bg-black/5 text-gray-800 hover:bg-black/10"
            }`}
          >
            {darkMode ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* LOGOUT */}
          <button
            onClick={onLogout}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
              darkMode
                ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                : "border-black/10 bg-black/5 text-gray-700 hover:bg-black/10"
            }`}
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">
              Logout
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;