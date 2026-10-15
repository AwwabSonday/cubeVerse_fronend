"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  googleProvider,
  isFirebaseConfigured,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
} from "../firebase";

const AuthContext = createContext({
  user: null,
  loading: true,
  isConfigured: false,
  login: async () => {},
  register: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  getIdToken: async () => null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn("Auth state listener error:", err.message);
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add your Firebase API key in .env.");
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const register = async (email, password, displayName) => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add your Firebase API key in .env.");
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  };

  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      throw new Error("Firebase is not configured. Please add your Firebase API key in .env.");
    }
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user;
  };

  const logout = async () => {
    if (!auth) return;
    await firebaseSignOut(auth);
  };

  const getIdToken = async () => {
    if (!auth || !auth.currentUser) return null;
    return await auth.currentUser.getIdToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isFirebaseConfigured(),
        login,
        register,
        loginWithGoogle,
        logout,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
