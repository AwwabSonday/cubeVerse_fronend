"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [algo, setAlgo] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [currentTime, setCurrentTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [history, setHistory] = useState([]);

  const startTimeRef = useRef(null);
  const animationRef = useRef(null);
  const runningRef = useRef(false);

  // -----------------------------
  // Scramble moves
  // -----------------------------

  const fMove = ["F", "F'", "F2"];
  const dMove = ["D", "D'", "D2"];
  const uMove = ["U", "U'", "U2"];
  const lMove = ["L", "L'", "L2"];
  const rMove = ["R", "R'", "R2"];
  const bMove = ["B", "B'", "B2"];

  function randomNum() {
    return Math.floor(Math.random() * 3);
  }

  function generateAlgorithm() {
    let scramble = "";

    for (let i = 0; i < 4; i++) {
      scramble += rMove[randomNum()] + " ";
      scramble += uMove[randomNum()] + " ";
      scramble += fMove[randomNum()] + " ";
      scramble += dMove[randomNum()] + " ";
      scramble += lMove[randomNum()] + " ";
      scramble += bMove[randomNum()] + " ";
    }

    setAlgo(scramble.trim());
  }

  // Generate first scramble
  useEffect(() => {
    generateAlgorithm();
  }, []);

  // -----------------------------
  // Timer update
  // -----------------------------

  function updateTimer() {
    if (!startTimeRef.current) return;

    const elapsed = (performance.now() - startTimeRef.current) / 1000;

    setTime(elapsed);

    animationRef.current = requestAnimationFrame(updateTimer);
  }

  // -----------------------------
  // Start timer
  // -----------------------------

  function startTimer() {
    if (runningRef.current) return;

    runningRef.current = true;
    setIsRunning(true);

    startTimeRef.current = performance.now();

    animationRef.current = requestAnimationFrame(updateTimer);
  }

  // -----------------------------
  // Stop timer
  // -----------------------------

  function stopTimer() {
    if (!runningRef.current) return;

    runningRef.current = false;

    cancelAnimationFrame(animationRef.current);

    const finalTime = (performance.now() - startTimeRef.current) / 1000;

    setTime(finalTime);
    setCurrentTime(finalTime);
    setIsRunning(false);

    // Add to history
    setHistory((prev) => [finalTime, ...prev]);

    // Update best time
    setBestTime((prev) => {
      if (prev === null || finalTime < prev) {
        return finalTime;
      }

      return prev;
    });

    // Generate new scramble
    generateAlgorithm();

    // Reset start time
    startTimeRef.current = null;
  }

  // Reset Session
  function handleReset() {
    setBestTime(null);
    setCurrentTime(null);
    setHistory([]);
    setTime(0);
  }

  function deleteSolve(index) {
  setHistory((prev) => prev.filter((_, i) => i !== index));
}

  // -----------------------------
  // Space key
  // -----------------------------

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code !== "Space") return;

      e.preventDefault();

      if (e.repeat) return;

      if (runningRef.current) {
        stopTimer();
      } else {
        startTimer();
      }
    }

    window.addEventListener("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyDown);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // -----------------------------
  // Average
  // -----------------------------

  const average =
    history.length > 0
      ? history.reduce((total, value) => total + value, 0) / history.length
      : 0;

  return (
    <main className="min-h-screen text-zinc-950 px-4 py-8 bg-zinc-100 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Speedcubing Trainer
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
            Timer
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Practice algorithms, time your solves, and track progression
          </p>
        </div>

        {/* Scramble */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-md transition-all hover:border-zinc-700/80 sm:p-6">
          <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Scramble
            </span>
            <span className="text-[11px] font-medium tracking-wider text-zinc-500">
              3x3 WCA
            </span>
          </div>

          <p className="mt-3 min-h-8 break-words text-center font-mono text-base font-bold tracking-wide text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200 sm:text-xl md:text-2xl">
            {algo || "Generating scramble..."}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Timer Card */}
          <div className="group relative flex min-h-[320px] items-center justify-center rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md transition-all lg:col-span-2">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />

            <div className="relative text-center">
              <span
                className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest border transition-all ${
                  isRunning
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-zinc-700/50 bg-zinc-800/60 text-zinc-400"
                }`}
              >
                {isRunning ? "Solving..." : "Ready"}
              </span>

              <p
                className={`my-4 font-mono text-7xl font-black tracking-tight tabular-nums transition-colors sm:text-8xl md:text-9xl ${
                  isRunning
                    ? "text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]"
                    : "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                }`}
              >
                {time.toFixed(2)}
              </p>

              <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-800/50 px-3 py-1.5 text-xs font-medium text-zinc-400">
                <kbd className="rounded bg-zinc-700/70 px-1.5 py-0.5 font-mono text-[10px] text-zinc-200 shadow">
                  SPACE
                </kbd>
                <span>{isRunning ? "Press to stop" : "Press to start"}</span>
              </div>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md">
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-base font-bold uppercase tracking-wider text-zinc-200">
                  Statistics
                </h3>
                <button
                  onClick={handleReset}
                  title="Reset Session"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700/60 bg-zinc-800/50 text-zinc-400 transition-colors hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400"
                >
                  ↻
                </button>
              </div>

              {/* Current vs Best Matrix */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Current
                  </span>
                  <p className="mt-1 font-mono text-xl font-extrabold text-sky-400">
                    {currentTime !== null ? currentTime.toFixed(2) : "--"}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    PB (Best)
                  </span>
                  <p className="mt-1 font-mono text-xl font-extrabold text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.25)]">
                    {bestTime !== null ? bestTime.toFixed(2) : "--"}
                  </p>
                </div>
              </div>
            </div>

            {/* Solves & Average summary */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between rounded-xl border border-zinc-800/60 bg-zinc-950/40 px-4 py-2.5">
                <span className="text-xs font-semibold text-zinc-400">
                  Solves
                </span>
                <span className="rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-sm font-bold text-zinc-200">
                  {history.length}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-zinc-800/60 bg-zinc-950/40 px-4 py-2.5">
                <span className="text-xs font-semibold text-zinc-400">
                  Session Avg
                </span>
                <span className="font-mono text-sm font-bold text-sky-400">
                  {history.length > 0 ? average.toFixed(2) + "s" : "--"}
                </span>
              </div>
            </div>
          </div>

          {/* History Logs */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold uppercase tracking-wider text-zinc-200">
                Solve History
              </h3>
              <span className="text-xs font-medium text-zinc-500">
                {history.length} recorded
              </span>
            </div>

            <div className="h-36 overflow-y-auto rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
              {history.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-xs font-medium text-zinc-600">
                    No solves recorded yet. Start solving to build history.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {history.map((solve, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs font-mono transition-all hover:border-zinc-700"
                    >
                      <span className="font-sans text-[10px] text-zinc-500">
                        #{history.length - index}
                      </span>

                      <span
                        className={`font-bold ${
                          solve === bestTime
                            ? "text-amber-400"
                            : "text-zinc-300"
                        }`}
                      >
                        {solve.toFixed(2)}s
                      </span>

                      <button
                        onClick={() => deleteSolve(index)}
                        className="ml-2 text-zinc-500 transition-colors hover:text-rose-400"
                        title="Delete solve"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
