// ====================================================
// Firebase Configuration (Commented out for now)
// Authentication and database now use the Express backend.
// ====================================================

/*
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
*/

// Check if valid client-side config is provided (Disabled for now)
export const isFirebaseConfigured = () => false;

export const app = null;
export const auth = null;
export const googleProvider = null;
export const signInWithPopup = null;
export const signInWithEmailAndPassword = null;
export const createUserWithEmailAndPassword = null;
export const signOut = null;
export const updateProfile = null;
export const onAuthStateChanged = null;

export default app;
