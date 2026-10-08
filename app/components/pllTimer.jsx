"use client";

import Image from "next/image";
import useSpaceTimer from "./useSpaceTimer";
import React, { useEffect, useState } from "react";

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

  const [currentTime, setCurrentTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [solves, setSolves] = useState([]);
  const [cases, setCases] = useState(() => {
    const savedData = typeof window === "undefined" ? null : localStorage.getItem("PllSelectedCases")
    const parsedData = JSON.parse(savedData)
    return parsedData?.length ? parsedData : [] // empty = all cases, picked at random
  })

  // Generate scramble
  const changeAlgo = () => {
    const algorithmKeys = Object.keys(algorithms)
    const randomNum = Math.floor(Math.random() * cases.length);
    const caseAlgo = cases[randomNum]
    console.log("caseAlgo", caseAlgo)
    if(!caseAlgo){
      const randomNum = Math.floor(Math.random() * algorithmKeys.length);
      setAlgo(algorithmKeys[randomNum])
    }
    else{
      setAlgo(algorithmKeys[caseMap[caseAlgo]])
    }
  };


  useEffect(() => {
    setMounted(true);
    changeAlgo();
  }, []);

  const { time, holding, running, resetTime } = useSpaceTimer((finalTime) => {
    setCurrentTime(finalTime);
    setSolves((prev) => [...prev, finalTime]);
    setBestTime((prev) => (prev === null || finalTime < prev ? finalTime : prev));
    changeAlgo();
  });
  const currentImage =
    algo && algorithms[algo] ? `/pll/${algorithms[algo]}` : null;
  const status = running ? "Solving..." : holding ? "Release to start" : "Ready";

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {/* Scramble Display */}
      <div className="relative overflow-hidden rounded-xl border-2 border-ink bg-white p-4 pt-5">
        <div className="absolute left-0 top-0 flex h-2 w-full" aria-hidden="true"><span className="flex-1 bg-cube-red" /><span className="flex-1 bg-cube-orange" /><span className="flex-1 bg-cube-yellow" /><span className="flex-1 bg-cube-green" /><span className="flex-1 bg-cube-blue" /><span className="flex-1 bg-paper" /></div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-ink">
            Scramble
          </span>
          <span className="text-[11px] font-medium text-muted tracking-wider">3x3 WCA</span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-4 rounded-xl border border-ink/30 bg-paper p-3">
          <p className="min-w-0 flex-1 break-words font-mono text-base font-bold  tracking-wide text-ink  sm:text-lg md:text-xl">
            {mounted ? algo : "Generating scramble..."}
          </p>


          {mounted && currentImage && (
            <div className="flex shrink-0 items-center justify-center rounded-md border-2 border-ink bg-white p-2">
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
      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-3 lg:grid-rows-[minmax(auto,1fr)_auto]">

        {/* Timer Hero Card */}
        <div className="flex min-h-0 items-center justify-center rounded-xl border-2 border-ink bg-white p-4 lg:col-span-2">
          {/* Background Subtle Glow */}

          <div className="relative text-center">
            <span className="inline-block rounded-md bg-paper px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted border border-ink/30">
              {status}
            </span>

            <p className={`my-2 font-mono text-7xl font-black tracking-tight tabular-nums sm:text-8xl md:text-9xl ${holding ? "text-cube-green" : "text-ink"}`}>
              {time.toFixed(2)}
            </p>

            <div className="inline-flex items-center gap-2 rounded-lg bg-paper px-3 py-1.5 text-xs font-medium text-muted border border-ink/30">
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
              onClick={() => {
                  setBestTime(null)
                  setCurrentTime(null)
                  setSolves([]);
                  resetTime();
                }}
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
              <dd className="font-mono text-lg font-extrabold">{solves.length}</dd>
            </div>
            <div className="rounded-lg border border-ink/30 bg-paper p-2 text-center">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">Average</dt>
              <dd className="font-mono text-lg font-extrabold">{solves.length > 0 ? (solves.reduce((a, b) => a + b, 0) / solves.length).toFixed(2) : "--"}</dd>
            </div>
          </dl>
        </div>

        {/* Solve Logs */}
        <div className="rounded-xl border-2 border-ink bg-white p-4 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold uppercase tracking-wider text-ink">
              Solve History
            </h3>
            <span className="text-xs font-medium text-muted">
              {solves.length} recorded
            </span>
          </div>

          <div className="h-24 overflow-y-auto rounded-xl border border-ink/30 bg-paper p-3 ">
            {solves.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-xs font-medium text-muted">No solves completed in this session</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {solves.map((solve, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-ink/30 bg-paper px-3 py-2 text-xs font-mono hover:border-ink"
                  >
                    <span className="font-sans text-[10px] text-muted">#{index + 1}</span>
                    <span className={`font-bold ${solve === bestTime ? "text-ink" : "text-ink"}`}>
                      {solve.toFixed(2)}s
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}