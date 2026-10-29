"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ScrambleNet from "../components/ScrambleNet";
import TimerShell from "../components/TimerShell";
import useSpaceTimer from "../components/useSpaceTimer";
import { useAuth } from "../context/AuthContext";
import {
  apiGetTimes,
  apiSaveTime,
  apiDeleteTime,
  apiResetTimes,
} from "../services/api";

function newScramble(length = 20) {
  const faces = ["U", "D", "L", "R", "F", "B"];
  const suffixes = ["", "'", "2"];
  const axisMap = { U: 0, D: 0, L: 1, R: 1, F: 2, B: 2 };
  const moves = [];
  let lastFace = null;
  let secondLastFace = null;

  for (let i = 0; i < length; i++) {
    const candidates = faces.filter((f) => {
      if (f === lastFace) return false;
      if (
        secondLastFace &&
        axisMap[f] === axisMap[lastFace] &&
        axisMap[f] === axisMap[secondLastFace]
      ) {
        return false;
      }
      return true;
    });
    const face = candidates[Math.floor(Math.random() * candidates.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    moves.push(face + suffix);
    secondLastFace = lastFace;
    lastFace = face;
  }
  return moves.join(" ");
}

export default function Timer() {
  const { user, token } = useAuth();
  const [algo, setAlgo] = useState(newScramble);
  const [currentTime, setCurrentTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [history, setHistory] = useState([]); // array of { id, time, scramble, createdAt }

  // Keep a ref of algo for async callbacks
  const algoRef = useRef(algo);
  useEffect(() => {
    algoRef.current = algo;
  }, [algo]);

  // Fetch saved times from backend if user is authenticated
  useEffect(() => {
    const activeToken = token || user?.token;
    if (!activeToken) return;

    let isMounted = true;

    apiGetTimes("3x3", activeToken)
      .then((data) => {
        if (!isMounted || !data?.success) return;
        if (data.currentTime !== undefined && data.currentTime !== null) {
          setCurrentTime(Number(data.currentTime));
        }
        if (data.bestTime !== undefined && data.bestTime !== null) {
          setBestTime(Number(data.bestTime));
        }
        if (Array.isArray(data.timeLogs)) {
          setHistory(
            data.timeLogs.map((log) => ({
              id: log._id || log.id,
              time: Number(log.time),
              scramble: log.scramble || "",
              createdAt: log.createdAt,
            }))
          );
        }
      })
      .catch((err) => {
        console.warn("Could not sync times from backend:", err.message);
      });

    return () => {
      isMounted = false;
    };
  }, [user, token]);

  // Space timer hook
  const {
    time,
    holding,
    running,
    resetTime,
    handlePointerDown,
    handlePointerUp,
  } = useSpaceTimer((finalTime) => {
    const currentScramble = algoRef.current;
    const tempId = `temp-${Date.now()}`;

    // Optimistic UI update
    setCurrentTime(finalTime);
    setHistory((prev) => [
      { id: tempId, time: finalTime, scramble: currentScramble },
      ...prev,
    ]);
    setBestTime((prev) => (prev === null || finalTime < prev ? finalTime : prev));
    setAlgo(newScramble());

    // Save to backend if user is logged in
    const activeToken = token || user?.token;
    if (activeToken) {
      apiSaveTime(
        { time: finalTime, scramble: currentScramble, category: "3x3" },
        activeToken
      )
        .then((saved) => {
          if (saved?.success) {
            setCurrentTime(saved.currentTime);
            setBestTime(saved.bestTime);
            if (Array.isArray(saved.timeLogs)) {
              setHistory(
                saved.timeLogs.map((log) => ({
                  id: log._id || log.id,
                  time: Number(log.time),
                  scramble: log.scramble || "",
                  createdAt: log.createdAt,
                }))
              );
            }
          }
        })
        .catch((err) => {
          console.error("Failed to save solve time to backend:", err);
        });
    }
  });

  const handleReset = async () => {
    setBestTime(null);
    setCurrentTime(null);
    setHistory([]);
    resetTime();

    const activeToken = token || user?.token;
    if (activeToken) {
      try {
        await apiResetTimes("3x3", activeToken);
      } catch (err) {
        console.error("Failed to reset times on backend:", err);
      }
    }
  };

  const deleteSolve = async (index) => {
    const target = history[index];
    const targetId =
      typeof target === "object" ? target.id || target._id : null;

    // Optimistic remove
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);

    // Recalculate local stats
    if (newHistory.length === 0) {
      setCurrentTime(null);
      setBestTime(null);
    } else {
      const times = newHistory.map((item) =>
        typeof item === "object" ? Number(item.time) : Number(item)
      );
      setCurrentTime(times[0]);
      setBestTime(Math.min(...times));
    }

    const activeToken = token || user?.token;
    if (activeToken && targetId && !String(targetId).startsWith("temp-")) {
      try {
        const res = await apiDeleteTime(targetId, "3x3", activeToken);
        if (res?.success) {
          setCurrentTime(res.currentTime);
          setBestTime(res.bestTime);
          if (Array.isArray(res.timeLogs)) {
            setHistory(
              res.timeLogs.map((log) => ({
                id: log._id || log.id,
                time: Number(log.time),
                scramble: log.scramble || "",
                createdAt: log.createdAt,
              }))
            );
          }
        }
      } catch (err) {
        console.error("Failed to delete solve on backend:", err);
      }
    }
  };

  const times = history.map((item) => Number(item.time)).filter((t) => !isNaN(t) && t > 0);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper">
      <Navbar />
      <main className="flex min-h-0 flex-1 flex-col px-3 py-3 sm:px-6">
        <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-3">
          <div className="flex shrink-0 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Timer</h1>
              {user ? (
                <span className="inline-flex min-w-0 items-center gap-1 rounded-full border border-cube-green bg-cube-green/10 px-2 py-0.5 text-[11px] font-bold text-cube-green">
                  <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-cube-green" />
                  <span className="truncate">Synced ({user.username || user.displayName || "Account"})</span>
                </span>
              ) : (
                <Link
                  href="/login"
                  className="text-xs font-semibold text-muted underline hover:text-ink"
                >
                  Log in to save times
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={() => setAlgo(newScramble())}
              className="min-h-8 shrink-0 rounded-md border border-ink/30 bg-paper px-2.5 py-1 text-xs font-semibold transition hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              New Scramble
            </button>
          </div>

          <TimerShell
            scrambleMeta={<span className="ml-auto text-[10px] font-medium tracking-wider text-muted">3x3 WCA</span>}
            scramble={algo || "Generating scramble..."}
            scrambleVisual={
              <div className="shrink-0">
                <ScrambleNet scramble={algo} className="h-16 w-24 sm:h-20 sm:w-32" />
              </div>
            }
            time={time}
            holding={holding}
            running={running}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            stats={{
              current: currentTime,
              best: bestTime,
              count: history.length,
              average: times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : null,
            }}
            history={history}
            onReset={handleReset}
            onDelete={deleteSolve}
          />
        </div>
      </main>
    </div>
  );
}
