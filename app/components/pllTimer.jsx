"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function Timer() {
  const algorithms = {
    "U2 F B D2 F B D2 F2 R2 D2 R2 B2 L2 U2 F2 L2": "h.png",
    "U2 L2 D' L2 B2 L2 D L R' B2 D2 F2 U2 L' R' F2 D2": "ua.png",
    "U L2 U' B2 L2 B2 U L2 B2 U2 B2 L2 B2 U2 L2 B2 U2 L2": "ub.png",
    "U' L R U2 L R' U' L2 U' L2 U' L2 U' L2 U' L2 F2 L2 F2": "z.png",
    "U' B F R2 B F' U' F2 D2 R2 U' L2 U' B2 R2 D2 L2 U' B2": "e.png",
    "F B' U2 F' B U2 L2 B2 U' B2 U2 L2 U B2 U2 B2 L2": "na.png",
    "F B' U2 F' B U2 L2 F2 U F2 U2 L2 U' F2 U2 F2 L2": "nb.png",
    "U R L U2 R L U B2 U2 L2 D' L2 F2 D2 F2 U R2 U2 F2": "v.png",
    "U' F B U2 F' B U' R2 U L2 D' L2 U' F2 D L2 D' R2": "y.png",
    "B F U2 B F' U R2 U2 B2 R2 B2 U' L2 U' R2 U B2 L2": "aa.png",
    "R L U2 R L U' D' F2 D F2 L2 U R2 U' L2 F2 U' L2": "ab.png",
    "U2 F B D2 F B' D' L2 B2 D' L2 B2 U' F2 L2 R2 U L2 D'": "f.png",
    "U2 F B U2 F B' L2 R2 U' R2 U F2 U' R2 D F2 B2 R2 D'": "ga.png",
    "U2 L R U2 L R F2 U L2 U' R2 U B2 R2 D B2 R2": "gb.png",
    "F B U2 F B' U L2 B2 R2 B2 L2 D' F2 D R2 U' F2": "gc.png",
    "U F B U2 F B' D' L2 U L2 B2 D F2 D' B2 D R2 F2 R2": "gd.png",
    "U F B U2 F' B U L2 F2 D F2 D' R2 U B2 L2 F2 L2 D": "ja.png",
    "R L U2 R L U D' F2 U' F2 D R2 D' F2 D L2": "jb.png",
    "U L R U2 L R U B2 U' F2 U R2 U' F2 D L2 D' L2 R2": "ra.png",
    "U R L U2 R L' U R2 F2 R2 L2 D F2 D' B2 D L2 B2": "rb.png",
    "U L R B2 L R U L2 U' R2 B2 U' B2 U B2 L2 U' L2 B2": "t.png",
  };

  const caseMap = {
    "H": 0,
    "Ua": 1,
    "Ub": 2,
    "Z": 3,
    "E": 4,
    "Na": 5,
    "Nb": 6,
    "V": 7,
    "Y": 8,
    "Aa": 9,
    "Ab": 10,
    "F": 11,
    "Ga": 12,
    "Gb": 13,
    "Gc": 14,
    "Gd": 15,
    "Ja": 16,
    "Jb": 17,
    "Ra": 18,
    "Rb": 19,
    "T": 20
  };

  const [algo, setAlgo] = useState("");
  const [mounted, setMounted] = useState(false);

  const [time, setTime] = useState("0.00");
  const [currentTime, setCurrentTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [solves, setSolves] = useState([]);
  const [cases, setCases] = useState(() => {
    const savedData = localStorage.getItem("PllSelectedCases")
    const parsedData = JSON.parse(savedData)
    return parsedData ? parsedData : Object.keys(algorithms)
  })


  // These values should NOT cause re-renders
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const currentTimeRef = useRef(0);

  // Generate scramble
  const changeAlgo = () => {
    const algorithmKeys = Object.keys(algorithms)
    const randomNum = Math.floor(Math.random() * cases.length);
    const caseAlgo = cases[randomNum]
    console.log("caseAlgo", caseAlgo)
    if (!caseAlgo) {
      const randomNum = Math.floor(Math.random() * algorithmKeys.length);
      setAlgo(algorithmKeys[randomNum])
    }
    else {
      setAlgo(algorithmKeys[caseMap[caseAlgo]])
    }
  };


  useEffect(() => {
    setMounted(true);
    changeAlgo();
  }, []);

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.code !== "Space") return;

      // Prevent page from scrolling
      e.preventDefault();

      if (startTimeRef.current === null) {
        const start = Date.now();

        startTimeRef.current = start;

        intervalRef.current = setInterval(() => {
          const elapsed = (Date.now() - start) / 1000;

          currentTimeRef.current = elapsed;

          setTime(elapsed.toFixed(2));
        }, 50);

        return;
      }

      // =========================
      // STOP
      // =========================

      clearInterval(intervalRef.current);

      const finalTime = currentTimeRef.current;

      if (finalTime <= 0) return;

      // Update current time
      setCurrentTime(finalTime);

      // Add to history
      setSolves((prev) => [...prev, finalTime]);

      // Update best
      setBestTime((prev) => {
        if (prev === null || finalTime < prev) {
          return finalTime;
        }

        return prev;
      });

      // Reset timer
      startTimeRef.current = null;
      intervalRef.current = null;
      currentTimeRef.current = 0;

      setTime(finalTime.toFixed(2));

      // New scramble
      changeAlgo();
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  const currentImage =
    algo && algorithms[algo] ? `/pll/${algorithms[algo]}` : null;
  return (
    <>
    <div className="mb-4 text-center text-sm font-medium text-zinc-400">
      Case selected: {cases.length}
    </div>
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-md transition-all hover:border-zinc-700/80 sm:p-6">
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500" />
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Scramble
          </span>
          <span className="text-[11px] font-medium text-zinc-500 tracking-wider">3x3 WCA</span>
        </div>

        <div className="mt-4 flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 sm:p-5 md:flex-row md:justify-between md:gap-6">
          <p className="min-w-0 flex-1 break-words text-center font-mono text-base font-bold leading-relaxed tracking-wide text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200 sm:text-lg md:text-left md:text-xl">
            {mounted ? algo : "Generating scramble..."}
          </p>

          {mounted && currentImage && (
            <div className="flex shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/80 p-2 shadow-inner transition-transform duration-200 hover:scale-105">
              <Image
                src={currentImage}
                width={64}
                height={64}
                alt="PLL Case Diagram"
                className="h-16 w-16 object-contain"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Trainer Grid */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Timer Hero Card */}
        <div className="group relative flex min-h-[300px] items-center justify-center rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md transition-all lg:col-span-2">
          {/* Background Subtle Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="relative text-center">
            <span className="inline-block rounded-full bg-zinc-800/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 border border-zinc-700/50">
              Ready
            </span>

            <p className="my-4 font-mono text-7xl font-black tracking-tight tabular-nums text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] sm:text-8xl md:text-9xl">
              {time}
            </p>

            <div className="inline-flex items-center gap-2 rounded-lg bg-zinc-800/40 px-3 py-1.5 text-xs font-medium text-zinc-400 border border-zinc-800">
              <kbd className="rounded bg-zinc-700/70 px-1.5 py-0.5 font-mono text-[10px] text-zinc-200 shadow">SPACE</kbd>
              <span>Hold & release to solve</span>
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-bold uppercase tracking-wider text-zinc-200">
                Session Stats
              </h3>
              <button
                onClick={() => {
                  setBestTime(null)
                  setCurrentTime(null)
                  setSolves([])
                  setTime("0.00")
                }}
                title="Reset Session"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700/60 bg-zinc-800/50 text-zinc-400 transition-colors hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400"
              >
                ↻
              </button>
            </div>

            {/* Metric Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Current</span>
                <p className="mt-1 font-mono text-xl font-extrabold text-sky-400">
                  {currentTime !== null ? currentTime.toFixed(2) : "--"}
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">PB (Best)</span>
                <p className="mt-1 font-mono text-xl font-extrabold text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                  {bestTime !== null ? bestTime.toFixed(2) : "--"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl border border-zinc-800/60 bg-zinc-950/40 px-4 py-3">
            <span className="text-xs font-semibold text-zinc-400">Total Solves</span>
            <span className="font-mono text-sm font-bold text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded-md">
              {solves.length}
            </span>
          </div>
        </div>

        {/* Solve Logs */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold uppercase tracking-wider text-zinc-200">
              Solve History
            </h3>
            <span className="text-xs font-medium text-zinc-500">
              {solves.length} recorded
            </span>
          </div>

          <div className="h-36 overflow-y-auto rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
            {solves.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-xs font-medium text-zinc-600">No solves completed in this session</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {solves.map((solve, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs font-mono transition-all hover:border-zinc-700"
                  >
                    <span className="font-sans text-[10px] text-zinc-500">#{index + 1}</span>
                    <span className={`font-bold ${solve === bestTime ? "text-amber-400" : "text-zinc-300"}`}>
                      {solve.toFixed(2)}s
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}