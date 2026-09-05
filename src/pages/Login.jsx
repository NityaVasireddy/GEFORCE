import { useState } from "react";
import { Sparkles, Mail, Lock } from "lucide-react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      setError("");

      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Login Error:", error);
      setError(error.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");

      if (isSignUp) {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
    } catch (error) {
      console.error("Email Login Error:", error);

      if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080808] px-4 text-white">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-600/30">
            <Sparkles size={28} />
          </div>

          <h1 className="text-3xl font-bold">
            AI Caption Generator
          </h1>

          <p className="mt-2 text-gray-400">
            Create captions. Make an impact.
          </p>

        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 shadow-2xl">

          <div className="mb-6">

            <h2 className="text-2xl font-semibold">
              {isSignUp ? "Create Account 🚀" : "Welcome Back 👋"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {isSignUp
                ? "Create your account to start generating captions."
                : "Login to continue creating amazing captions."}
            </p>

          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white px-4 py-3 font-medium text-black transition hover:bg-gray-200"
          >
            <span className="text-lg font-bold">
              G
            </span>

            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">

            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs text-gray-500">
              OR
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailLogin}>

            {/* Email */}
            <div className="mb-4">

              <label className="mb-2 block text-sm text-gray-300">
                Email
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">

                <Mail size={18} className="text-gray-500" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-600"
                />

              </div>

            </div>

            {/* Password */}
            <div className="mb-4">

              <label className="mb-2 block text-sm text-gray-300">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">

                <Lock size={18} className="text-gray-500" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-600"
                />

              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Login / Sign Up */}
            <button
              type="submit"
              className="w-full rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-500"
            >
              {isSignUp ? "Create Account" : "Login"}
            </button>

          </form>

          {/* Toggle */}
          <p className="mt-6 text-center text-sm text-gray-400">

            {isSignUp
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="ml-1 font-medium text-red-400 hover:text-red-300"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>

          </p>

        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          AI-powered content creation
        </p>

      </div>
    </div>
  );
}

export default Login;