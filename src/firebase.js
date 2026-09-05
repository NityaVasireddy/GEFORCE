import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEgbYqlY9kHFjzuYJU7rgQDwY0Bz2ubik",
  authDomain: "ai-caption-generator-393a4.firebaseapp.com",
  projectId: "ai-caption-generator-393a4",
  storageBucket: "ai-caption-generator-393a4.firebasestorage.app",
  messagingSenderId: "551811399632",
  appId: "1:551811399632:web:82ac34244101440f1f43d5",
  measurementId: "G-B6ERQXNSWB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();