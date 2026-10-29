"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { apiLogin, apiRegister, apiGetMe, apiChangePassword } from "../services/api";

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  changePassword: async () => {},
  getIdToken: async () => null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user session on mount
  useEffect(() => {
    let isMounted = true;

    async function initSession() {
      try {
        const savedToken =
          typeof window !== "undefined"
            ? localStorage.getItem("cubeVerse_token")
            : null;

        if (savedToken) {
          try {
            const data = await apiGetMe(savedToken);
            if (data?.user && isMounted) {
              setToken(savedToken);
              setUser({
                ...data.user,
                displayName: data.user.username || data.user.displayName,
                token: savedToken,
              });
            }
          } catch (err) {
            console.warn("Session restore failed, clearing expired token:", err.message);
            if (typeof window !== "undefined") {
              localStorage.removeItem("cubeVerse_token");
            }
          }
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initSession();

    return () => {
      isMounted = false;
    };
  }, []);

  // Backend login
  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      if (data?.token && data?.user) {
        const formattedUser = {
          ...data.user,
          displayName: data.user.username,
          token: data.token,
        };
        setToken(data.token);
        setUser(formattedUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("cubeVerse_token", data.token);
        }
        return formattedUser;
      }
      throw new Error(data?.message || "Login failed");
    } catch (err) {
      throw err;
    }
  };

  // Backend register: accepts (email, password, username) or (username, email, password)
  const register = async (first, second, third) => {
    let email, password, username;

    if (typeof first === "object" && first !== null) {
      ({ email, password, username } = first);
    } else if (third !== undefined) {
      // Called as register(email, password, username)
      email = first;
      password = second;
      username = third;
    } else {
      email = first;
      password = second;
      username = first.split("@")[0];
    }

    try {
      const data = await apiRegister(username, email, password);
      if (data?.token && data?.user) {
        const formattedUser = {
          ...data.user,
          displayName: data.user.username,
          token: data.token,
        };
        setToken(data.token);
        setUser(formattedUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("cubeVerse_token", data.token);
        }
        return formattedUser;
      }
      throw new Error(data?.message || "Registration failed");
    } catch (err) {
      throw err;
    }
  };

  // Server revokes older tokens on change, so swap in the fresh one it returns
  const changePassword = async (currentPassword, newPassword) => {
    const data = await apiChangePassword(currentPassword, newPassword, await getIdToken());
    if (!data?.token) throw new Error(data?.message || "Could not change password");
    localStorage.setItem("cubeVerse_token", data.token);
    setToken(data.token);
    setUser((u) => ({ ...u, token: data.token }));
  };

  const logout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cubeVerse_token");
    }
    setToken(null);
    setUser(null);
  };

  const getIdToken = async () => {
    if (token) return token;
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cubeVerse_token");
      if (saved) return saved;
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        changePassword,
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
