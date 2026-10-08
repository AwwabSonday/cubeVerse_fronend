"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ScrambleNet from "../components/ScrambleNet";
import useSpaceTimer from "../components/useSpaceTimer";

const FACES = ["R", "U", "F", "D", "L", "B"];
const SUFFIXES = ["", "'", "2"];

function newScramble() {
  let moves = [];
  for (let i = 0; i < 4; i++) {
    for (const face of FACES) {
      moves.push(face + SUFFIXES[Math.floor(Math.random() * 3)]);
    }
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
      <main className="min-h-0 flex-1 px-4 py-4 sm:px-6">
        <div className="mx-auto flex h-full max-w-6xl flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Timer</h1>

          {/* Scramble */}
          <div className="relative overflow-hidden rounded-xl border-2 border-ink bg-white p-4 pt-5">
            <div className="absolute left-0 top-0 flex h-2 w-full" aria-hidden="true"><span className="flex-1 bg-cube-red" /><span className="flex-1 bg-cube-orange" /><span className="flex-1 bg-cube-yellow" /><span className="flex-1 bg-cube-green" /><span className="flex-1 bg-cube-blue" /><span className="flex-1 bg-paper" /></div>
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold uppercase tracking-widest">Scramble</span>
                <p className="mt-2 min-h-8 break-words font-mono text-base font-bold tracking-wide sm:text-lg md:text-xl">
                  {algo || "Generating scramble..."}
                </p>
              </div>
              <ScrambleNet scramble={algo} className="w-40 shrink-0 sm:w-48" />
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-3 lg:grid-rows-[minmax(auto,1fr)_auto]">
            {/* Timer Card */}
            <div className="flex min-h-0 items-center justify-center rounded-xl border-2 border-ink bg-white p-4 lg:col-span-2">
              <div className="text-center">
                <span className="inline-block rounded-md border border-ink/30 bg-paper px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted">
                  {status}
                </span>

                <p className={`my-2 font-mono text-7xl font-black tracking-tight tabular-nums sm:text-8xl md:text-9xl ${holding ? "text-cube-green" : "text-ink"}`}>
                  {time.toFixed(2)}
                </p>

                <div className="inline-flex items-center gap-2 rounded-lg border border-ink/30 bg-paper px-3 py-1.5 text-xs font-medium text-muted">
                  <kbd className="rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper">SPACE</kbd>
                  <span>{running ? "Press to stop" : "Hold until green, release to start"}</span>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
        <div className="flex flex-col gap-3 rounded-xl border-2 border-ink bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold uppercase tracking-wider">Statistics</h2>
            <button
              onClick={handleReset}
              title="Reset session"
              aria-label="Reset session"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/30 bg-paper text-muted transition-colors hover:border-cube-red hover:text-cube-red"
            >
              ↻
            </button>
          </div>

          <dl className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-ink/30 bg-paper p-2 text-center">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">Current</dt>
              <dd className="font-mono text-lg font-extrabold">{currentTime !== null ? currentTime.toFixed(2) : "--"}</dd>
            </div>
            <div className="rounded-lg border-2 border-ink bg-cube-yellow p-2 text-center">
              <dt className="text-[11px] font-bold uppercase tracking-wider">Best</dt>
              <dd className="font-mono text-lg font-extrabold">{bestTime !== null ? bestTime.toFixed(2) : "--"}</dd>
            </div>
            <div className="rounded-lg border border-ink/30 bg-paper p-2 text-center">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">Solves</dt>
              <dd className="font-mono text-lg font-extrabold">{history.length}</dd>
            </div>
            <div className="rounded-lg border border-ink/30 bg-paper p-2 text-center">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">Average</dt>
              <dd className="font-mono text-lg font-extrabold">{history.length > 0 ? (history.reduce((a, b) => a + b, 0) / history.length).toFixed(2) : "--"}</dd>
            </div>
          </dl>
        </div>

        {/* History Logs */}
            <div className="rounded-xl border-2 border-ink bg-white p-4 lg:col-span-3">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-base font-bold uppercase tracking-wider">Solve History</h2>
                <span className="text-xs font-medium text-muted">{history.length} recorded</span>
              </div>

              <div className="h-24 overflow-y-auto rounded-xl border border-ink/30 bg-paper p-3">
                {history.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-xs font-medium text-muted">No solves recorded yet. Start solving to build history.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {history.map((solve, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border border-ink/30 bg-white px-3 py-2 font-mono text-xs">
                        <span className="font-sans text-[10px] text-muted">#{history.length - index}</span>
                        <span className="font-bold">{solve.toFixed(2)}s</span>
                        <button
                          onClick={() => deleteSolve(index)}
                          className="ml-2 text-muted transition-colors hover:text-cube-red"
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
