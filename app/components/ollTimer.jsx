"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Timer() {
const algorithms = {
  "U2 R' U2 L F' U2 L F R' D2 B2 U L2 U R2 B2 L2 D L2 D F2": "d1.png",
  "U' B L U2 L' F' L' B L' F' L2 D' F2 U R2 F2 D' L2 D2 F2": "d2.png",
  "U' B L2 F' L' U2 F L' B' U F2 U B2 D B2 R2 B2 D2 L2 D B2": "d3.png",
  "U2 R' F2 L F U2 L' F R U' L2 U' R2 D' R2 B2 R2 D2 F2 D' R2": "d4.png",
  "U L R' F' L' B' R2 B R' U2 R2 U F2 U2 R2 U' F2 R2 U F2": "d5.png",
  "U B' R B' R2 U' F R' F U' L2 D' L2 U B2 F2 U R2 B2 U' R2": "d6.png",
  "U F R B U B' U R' U2 F U F2 U L2 D2 B2 D B2 D L2": "d7.png",
  "U L R' F2 U2 F' L R U2 B2 D' B2 D R2 D' F2 U L2 U' R2": "d8.png",
  "U' L' U' B' U B L' U2 B2 U F2 U' B2 L2 U' L2 U2 F2 U L2": "as1.png",
  "U L2 F' L U2 L' U2 L' F L2 R2 B2 U B2 U' B2 R2 U2 F2 L2 F2": "as2.png",
  "U' R' U' F' U F R F2 U2 R2 B2 L2 D' L2 B2 R2 U F2": "as3.png",
  "U' B2 L2 B2 F' R' F2 R F' R2 U' F2 R2 U' B2 D' B2 U' R2 U' R2": "as4.png",
  "U' B U' L' B' U2 F2 D R' D B2 L2 B2 L2 D L2 D B2 L2 B2 F2": "blb1.png",
  "B L' B' U B2 L D L' D' B2 U2 L2 U' L2 U' L2 U2 L2": "blb2.png",
  "U L B L2 B' L U D' R2 D L2 D' R2 U' D L2": "c1.png",
  "U2 B2 U L' D B D' B' L U L2 F2 U' B2 R2 B2 F2 U2 D' B2": "c2.png",
  "U' F B L F2 L F B D2 R2 U L2 U' F2 D B2 D R2 D' L2 F2": "co1.png",
  "U2 B R D L2 B D2 R U' F U F2 U L2 D B2 D' L2 F2 D B2": "co2.png",
  "U L' U' B2 L B2 L2 U L B2 U F2 D2 L2 U' R2 U' B2 L2 D' R2": "cr1.png",
  "U' R2 F D' B' R2 B' D F D' R2 D F2 U' B2 R2 B2 D B2 D' L2": "cr2.png",
  "U2 B R2 B' L2 B R2 B D2 R2 D2 B2 U B2 D' R2 D B2 U2 L2": "cr3.png",
  "L2 U L D' R2 D L D' L2 R2 D F2 U' F2 L2": "cr4.png",
  "U2 F2 U R U' L2 U R U' F2 R2 B2 U' F2 U' L2 U L2 U' R2 D'": "cr5.png",
  "U R U R2 U' R2 U R B2 U2 B2 R2 B2 U F2 U B2 U' F2 U R2": "cr6.png",
  "U' B U2 B' U' B U' B U' B2 D B2 D' R2 U R2 B2": "cr7.png",
  "U2 L U2 L' B' U B' R' U' R U' L2 U B2 U B2 L2 D' B2 D": "fs1.png",
  "U R' F' L F' L' F2 R F2 U L2 U' L2 F2 D' L2 D L2": "fs2.png",
  "U F R' F' U2 L' B2 L U' F2 U' R2 U' L2 R2 D L2 U F2": "fs3.png",
  "U' R' L U2 L' U' F' U F R B2 R2 U B2 U R2 B2 U2 R2 B2": "fs4.png",
  "U L F' L' R2 F R F2 R F' U' F2 R2 D' L2 U L2 F2 D F2": "i1.png",
  "U2 L' U' B U L' D' B U' B' U' L2 F2 U' R2 F2 U2 L2 B2 U L2": "i2.png",
  "U B L' B L' U D2 R F2 R' D2 L2 U' L2 B2 U R2 D' F2 D R2": "i3.png",
  "U' R U R' U' B2 L2 D' B R' B F2 R2 U' B2 U L2 U' B2 F2 R2": "i4.png",
  "F' L2 D L' D' L' F U' B2 U B2 U B2 U B2 U' B2 U B2": "k1.png",
  "U' L F' L B L2 B D2 F U F2 D' F2 L2 F2 D2 R2 D F2": "k2.png",
  "R2 F D R U R' U' D' F U' F2 R2 U' B2 D' F2 D F2 B2": "k3.png",
  "U2 F R B' R B R2 F' U' F2 L2 R2 U R2 U' R2 D R2 D' L2 F2": "k4.png",
  "U2 B L R2 U L' U' R2 B U R2 U R2 U' R2 B2 R2 D B2 D' R2": "p1.png",
  "U R' U' R' U R B' R B U' B2 R2 F2 D B2 L2 B2 D' B2 F2": "p2.png",
  "U' B2 R D' B' D B R U F2 R2 U2 B2 U' R2 F2 D F2 R2 D L2": "p3.png",
  "U R2 F2 R' B U B' U' R B2 D B2 D' F2 D B2 D' B2 R2": "p4.png",
  "U' L D F R2 D2 L B2 D' B' D' R2 F2 U' R2 U R2 D' F2 L2": "sm1.png",
  "U2 F U F R2 U D2 L B' L B2 L2 D' R2 D L2 D L2 F2 D F2": "sm2.png",
  "U2 F D B2 D2 R' D R F D L2 U L2 U' F2 D F2 B2 D' F2": "sm3.png",
  "U' R B2 R2 F R B2 R2 F L2 U' F2 R2 B2 D' B2": "sm4.png",
  "U L2 B L F2 B' L' F2 L U2 R2 D' L2 D R2 U2 L2 U F2 U' L2": "sm5.png",
  "U' L F2 R2 F L B2 L2 F L2 F2 U F2 U' B2 U L2 B2 D B2": "sm6.png",
  "F2 R' F L F L' F2 R U' L2 R2 D L2 U' F2 L2 D' B2 D' L2": "slb1.png",
  "U' L U' L2 U F' L2 F U' L U' F2 B2 D R2 D2 R2 D F2 B2": "slb2.png",
  "B L2 B2 F R' F R' B U R2 U' L2 B2 F2 D L2 D' R2 B2": "slb3.png",
  "U2 R B' L2 B U' L2 U B' R' U B2 D L2 D' B2 L2 U' B2": "slb4.png",
  "U' R2 L F' R2 F R2 F' L D F2 D' B2 D F2 D' R2 B2 L2 F2": "sq1.png",
  "U2 R2 F R' B' R' B R2 F U' R2 U' R2 U F2 U R2": "sq2.png",
  "U2 R U B U' B' R U2 B2 U2 R2 U B2 U B2 L2 D F2 D' L2": "t1.png",
  "F R U R U R2 U2 F' U' F2 R2 D R2 D2 F2 U' F2 D F2": "t2.png",
  "U B2 U' R L2 F R2 F' R U B2 D' R2 U' B2 D' F2 D2 B2 R2": "w1.png",
  "U L U F U' F' L U B2 U' B2 L2 D' L2 F2 U L2 B2 R2 D2 B2": "w2.png",
};

  const [algo, setAlgo] = useState("");
  const [mounted, setMounted] = useState(false);

  const [time, setTime] = useState("0.00");
  const [currentTime, setCurrentTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [solves, setSolves] = useState([]);
  const [cases, setCases] = useState(()=>{
    const savedData = localStorage.getItem("selectedCases")
    const parsedData = JSON.parse(savedData)
    return parsedData ? parsedData : Object.keys(algorithms)
  })
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const currentTimeRef = useRef(0);
  //   useEffect(()=>{
  //   const savedData = localStorage.getItem("selectedCases")
  //   const parsedData = JSON.parse(savedData)
  //   parsedData ? setCases(parsedData) : setCases(Object.keys(algorithms))
  // },[])

  // Generate scramble
  const changeAlgo = () => {
    const algorithmKeys = Object.keys(algorithms)
    const randomNum = Math.floor(Math.random() * cases.length);
    const caseAlgo = cases[randomNum]
    setAlgo(algorithmKeys[caseAlgo-1])
  };

  useEffect(() => {
    setMounted(true);
    changeAlgo();
  }, []);

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.code !== "Space") return;

      e.preventDefault();

      // START
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

      // STOP
      clearInterval(intervalRef.current);

      const finalTime = currentTimeRef.current;

      if (finalTime <= 0) return;

      setCurrentTime(finalTime);

      setSolves((prev) => [...prev, finalTime]);

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

  // Get image based on current algorithm
  const currentImage =
    algo && algorithms[algo] ? `/oll/${algorithms[algo]}` : null;

  return (
    <>
      {/* Scramble Display */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-md transition-all hover:border-zinc-700/80 sm:p-6">
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500" />

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Scramble
          </span>

          <span className="text-[11px] font-medium tracking-wider text-zinc-500">
            3x3 WCA
          </span>
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
                alt="OLL Case Diagram"
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
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="relative text-center">
            <span className="inline-block rounded-full border border-zinc-700/50 bg-zinc-800/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Ready
            </span>

            <p className="my-4 font-mono text-7xl font-black tracking-tight text-white tabular-nums drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] sm:text-8xl md:text-9xl">
              {time}
            </p>

            <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-800/40 px-3 py-1.5 text-xs font-medium text-zinc-400">
              <kbd className="rounded bg-zinc-700/70 px-1.5 py-0.5 font-mono text-[10px] text-zinc-200 shadow">
                SPACE
              </kbd>

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
                  setBestTime(null);
                  setCurrentTime(null);
                  setSolves([]);
                  setTime("0.00");
                }}
                title="Reset Session"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700/60 bg-zinc-800/50 text-zinc-400 transition-colors hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400"
              >
                ↻
              </button>
            </div>

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

                <p className="mt-1 font-mono text-xl font-extrabold text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                  {bestTime !== null ? bestTime.toFixed(2) : "--"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl border border-zinc-800/60 bg-zinc-950/40 px-4 py-3">
            <span className="text-xs font-semibold text-zinc-400">
              Total Solves
            </span>

            <span className="rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-sm font-bold text-zinc-200">
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
                <p className="text-xs font-medium text-zinc-600">
                  No solves completed in this session
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {solves.map((solve, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs font-mono transition-all hover:border-zinc-700"
                  >
                    <span className="font-sans text-[10px] text-zinc-500">
                      #{index + 1}
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