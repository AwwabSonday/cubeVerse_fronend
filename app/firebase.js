import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyPlaceholderKeyForBuildSafety123456",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "cubeverse-auth.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "cubeverse-auth",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "cubeverse-auth.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

// Check if valid client-side config is provided
export const isFirebaseConfigured = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "AIzaSyPlaceholderKeyForBuildSafety123456"
  );
};

// Initialize Firebase safely (supports SSR & Next build prerendering)
let app = null;
let auth = null;
let googleProvider = null;

if (typeof window !== "undefined" || isFirebaseConfigured()) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (err) {
    console.warn("Firebase client initialization deferred:", err.message);
  }
}

export {
  app,
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
};

export default app;
