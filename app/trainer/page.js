"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ScrambleNet from "../components/ScrambleNet";
import useSpaceTimer from "../components/useSpaceTimer";

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
      if (secondLastFace && axisMap[f] === axisMap[lastFace] && axisMap[f] === axisMap[secondLastFace]) {
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
  const [algo, setAlgo] = useState("");
  const [currentTime, setCurrentTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [history, setHistory] = useState([]);

  // Generated after mount so server and client markup match
  useEffect(() => {
    setAlgo(newScramble());
  }, []);

  const { time, holding, running, resetTime } = useSpaceTimer((finalTime) => {
    setCurrentTime(finalTime);
    setHistory((prev) => [finalTime, ...prev]);
    setBestTime((prev) => (prev === null || finalTime < prev ? finalTime : prev));
    setAlgo(newScramble());
  });

  function handleReset() {
    setBestTime(null);
    setCurrentTime(null);
    setHistory([]);
    resetTime();
  }

  function deleteSolve(index) {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  }

  const average = history.length > 0 ? history.reduce((total, value) => total + value, 0) / history.length : 0;

  const status = running ? "Solving..." : holding ? "Release to start" : "Ready";

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <main className="min-h-0 flex-1 px-3 py-2 sm:px-6 sm:py-2.5">
        <div className="mx-auto flex h-full max-w-6xl flex-col gap-2 sm:gap-2.5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Timer</h1>
            <button
              onClick={() => setAlgo(newScramble())}
              className="rounded-md border border-ink/30 bg-paper px-2.5 py-1 text-xs font-semibold hover:border-ink transition"
              title="Next scramble"
            >
              New Scramble
            </button>
          </div>

          {/* Scramble Display */}
          <div className="relative overflow-hidden rounded-xl border-2 border-ink bg-white p-2.5 pt-3 sm:p-3 sm:pt-3.5">
            <div className="absolute left-0 top-0 flex h-1.5 w-full" aria-hidden="true">
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

            <div className="mt-1 flex items-center justify-between gap-4 rounded-xl border border-ink/30 bg-paper px-3 py-2 sm:px-4 sm:py-2.5">
              <p className="min-w-0 flex-1 break-words font-mono text-sm sm:text-base md:text-lg font-bold tracking-wide text-ink leading-relaxed">
                {algo || "Generating scramble..."}
              </p>
              <div className="shrink-0 flex items-center justify-center">
                <ScrambleNet
                  scramble={algo}
                  className="w-36 h-26 sm:w-44 sm:h-32 md:w-48 md:h-34"
                />
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid min-h-0 flex-1 gap-2 sm:gap-2.5 lg:grid-cols-3 lg:grid-rows-[1fr_auto]">
            {/* Timer Card */}
            <div className="flex min-h-0 flex-col items-center justify-center rounded-xl border-2 border-ink bg-white p-3 sm:p-4 lg:col-span-2">
              <div className="flex flex-col items-center justify-center text-center my-auto">
                <span className="inline-block rounded-md border border-ink/30 bg-paper px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-muted">
                  {status}
                </span>

                <p
                  className={`my-1 sm:my-2 font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none tabular-nums ${
                    holding ? "text-cube-green" : "text-ink"
                  }`}
                >
                  {time.toFixed(2)}
                </p>

                <div className="inline-flex items-center gap-2 rounded-lg border border-ink/30 bg-paper px-2.5 py-1 text-[11px] sm:text-xs font-medium text-muted">
                  <kbd className="rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper">SPACE</kbd>
                  <span>{running ? "Press to stop" : "Hold until green, release to start"}</span>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="flex min-h-0 flex-col justify-between rounded-xl border-2 border-ink bg-white p-3 sm:p-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-ink">Statistics</h2>
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Current</span>
                  <span className="font-mono text-sm sm:text-base md:text-lg font-extrabold text-ink leading-tight">
                    {currentTime !== null ? currentTime.toFixed(2) : "--"}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-ink bg-cube-yellow py-1 sm:py-1.5 px-2 text-center shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink">Best</span>
                  <span className="font-mono text-sm sm:text-base md:text-lg font-extrabold text-ink leading-tight">
                    {bestTime !== null ? bestTime.toFixed(2) : "--"}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg border border-ink/30 bg-paper py-1 sm:py-1.5 px-2 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Solves</span>
                  <span className="font-mono text-sm sm:text-base md:text-lg font-extrabold text-ink leading-tight">
                    {history.length}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg border border-ink/30 bg-paper py-1 sm:py-1.5 px-2 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Average</span>
                  <span className="font-mono text-sm sm:text-base md:text-lg font-extrabold text-ink leading-tight">
                    {history.length > 0 ? average.toFixed(2) : "--"}
                  </span>
                </div>
              </div>
            </div>

            {/* History Logs */}
            <div className="flex min-h-0 flex-col rounded-xl border-2 border-ink bg-white p-2.5 sm:p-3 lg:col-span-3">
              <div className="mb-1.5 flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">Solve History</h2>
                <span className="text-xs font-medium text-muted">{history.length} recorded</span>
              </div>

              <div className="h-14 sm:h-16 overflow-y-auto rounded-lg border border-ink/30 bg-paper p-2">
                {history.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-xs font-medium text-muted">No solves recorded yet. Start solving to build history.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {history.map((solve, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border border-ink/30 bg-white px-2.5 py-1 font-mono text-xs hover:border-ink">
                        <span className="font-sans text-[10px] text-muted">#{history.length - index}</span>
                        <span className="font-bold">{solve.toFixed(2)}s</span>
                        <button
                          onClick={() => deleteSolve(index)}
                          className="ml-1.5 text-muted transition-colors hover:text-cube-red"
                          title="Delete solve"
                          aria-label="Delete solve"
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
    </div>
  );
}
