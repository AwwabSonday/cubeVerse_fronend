"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ScrambleNet from "../components/ScrambleNet";
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

  const rawTimes = history
    .map((item) =>
      typeof item === "object" ? Number(item.time) : Number(item)
    )
    .filter((t) => !isNaN(t) && t > 0);

  const average =
    rawTimes.length > 0
      ? rawTimes.reduce((total, value) => total + value, 0) / rawTimes.length
      : 0;

  const status = running
    ? "Solving..."
    : holding
    ? "Release to start"
    : "Ready";

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="flex-1 px-3 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                Timer
              </h1>
              {user ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-cube-green bg-cube-green/10 px-2 py-0.5 text-[11px] font-bold text-cube-green">
                  <span className="h-1.5 w-1.5 rounded-full bg-cube-green animate-pulse" />
                  Synced ({user.username || user.displayName || "Account"})
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
              onClick={() => setAlgo(newScramble())}
              className="rounded-md border border-ink/30 bg-paper px-2.5 py-1 text-xs font-semibold hover:border-ink transition"
              title="Next scramble"
            >
              New Scramble
            </button>
          </div>

          {/* Scramble Display */}
          <div className="relative overflow-hidden rounded-xl border-2 border-ink bg-white p-3 pt-3.5 sm:p-4 sm:pt-4">
            <div
              className="absolute left-0 top-0 flex h-1.5 sm:h-2 w-full"
              aria-hidden="true"
            >
              <span className="flex-1 bg-cube-red" />
              <span className="flex-1 bg-cube-orange" />
              <span className="flex-1 bg-cube-yellow" />
              <span className="flex-1 bg-cube-green" />
              <span className="flex-1 bg-cube-blue" />
              <span className="flex-1 bg-paper" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest text-ink">
                Scramble
              </span>
              <span className="text-[10px] font-medium tracking-wider text-muted">
                3x3 WCA
              </span>
            </div>

            <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 rounded-xl border border-ink/30 bg-paper p-3">
              <p className="min-w-0 flex-1 break-words font-mono text-sm sm:text-base md:text-lg font-bold tracking-wide text-ink leading-relaxed text-center sm:left">
                {algo || "Generating scramble..."}
              </p>
              <div className="shrink-0 flex items-center justify-center">
                <ScrambleNet
                  scramble={algo}
                  className="w-32 h-24 sm:w-40 sm:h-28 md:w-48 md:h-34"
                />
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
            {/* Timer Card - Touch & Keyboard Supported */}
            <div
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              role="button"
              tabIndex={0}
              aria-label="Speedcubing timer card. Hold to ready, release to start, tap to stop"
              className="flex min-h-[220px] cursor-pointer select-none touch-none flex-col items-center justify-center rounded-xl border-2 border-ink bg-white p-4 transition-colors active:bg-ink/5 sm:min-h-[250px] sm:p-6 lg:col-span-2"
            >
              <div className="pointer-events-none flex flex-col items-center justify-center text-center my-auto">
                <span className="inline-block rounded-md border border-ink/30 bg-paper px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-muted">
                  {status}
                </span>

                <p
                  className={`my-2 font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none tabular-nums ${
                    holding ? "text-cube-green" : "text-ink"
                  }`}
                >
                  {time.toFixed(2)}
                </p>

                <div className="inline-flex items-center gap-2 rounded-lg border border-ink/30 bg-paper px-2.5 py-1 text-[11px] sm:text-xs font-medium text-muted">
                  <kbd className="hidden sm:inline-block rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper">
                    SPACE
                  </kbd>
                  <span>
                    {running
                      ? "Press SPACE or tap card to stop"
                      : "Hold SPACE or touch card, release to start"}
                  </span>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="flex min-h-0 flex-col justify-between rounded-xl border-2 border-ink bg-white p-3 sm:p-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-ink">
                  Statistics
                </h2>
                <button
                  onClick={handleReset}
                  title="Reset session"
                  aria-label="Reset session"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink/30 bg-paper text-xs text-muted transition-colors hover:border-cube-red hover:text-cube-red"
                >
                  ↻
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 my-auto py-1">
                <div className="flex flex-col items-center justify-center rounded-lg border border-ink/30 bg-paper py-1 sm:py-1.5 px-2 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Current
                  </span>
                  <span className="font-mono text-sm sm:text-base md:text-lg font-extrabold text-ink leading-tight">
                    {currentTime !== null ? currentTime.toFixed(2) : "--"}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-ink bg-cube-yellow py-1 sm:py-1.5 px-2 text-center shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink">
                    Best
                  </span>
                  <span className="font-mono text-sm sm:text-base md:text-lg font-extrabold text-ink leading-tight">
                    {bestTime !== null ? bestTime.toFixed(2) : "--"}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg border border-ink/30 bg-paper py-1 sm:py-1.5 px-2 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Solves
                  </span>
                  <span className="font-mono text-sm sm:text-base md:text-lg font-extrabold text-ink leading-tight">
                    {history.length}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg border border-ink/30 bg-paper py-1 sm:py-1.5 px-2 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Average
                  </span>
                  <span className="font-mono text-sm sm:text-base md:text-lg font-extrabold text-ink leading-tight">
                    {history.length > 0 ? average.toFixed(2) : "--"}
                  </span>
                </div>
              </div>
            </div>

            {/* History Logs */}
            <div className="flex min-h-0 flex-col rounded-xl border-2 border-ink bg-white p-2.5 sm:p-3 lg:col-span-3">
              <div className="mb-1.5 flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Solve History
                </h2>
                <span className="text-xs font-medium text-muted">
                  {history.length} recorded
                </span>
              </div>

              <div className="h-14 sm:h-16 overflow-y-auto rounded-lg border border-ink/30 bg-paper p-2">
                {history.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-xs font-medium text-muted">
                      No solves recorded yet. Start solving to build history.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {history.map((solve, index) => {
                      const solveTime =
                        typeof solve === "object"
                          ? Number(solve.time)
                          : Number(solve);
                      return (
                        <div
                          key={solve.id || index}
                          className="flex items-center justify-between rounded-md border border-ink/30 bg-white px-2.5 py-1 font-mono text-xs hover:border-ink"
                        >
                          <span className="font-sans text-[10px] text-muted">
                            #{history.length - index}
                          </span>
                          <span className="font-bold">
                            {!isNaN(solveTime) ? `${solveTime.toFixed(2)}s` : "--"}
                          </span>
                          <button
                            onClick={() => deleteSolve(index)}
                            className="ml-1.5 text-muted transition-colors hover:text-cube-red"
                            title="Delete solve"
                            aria-label="Delete solve"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
