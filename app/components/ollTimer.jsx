"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSpaceTimer from "./useSpaceTimer";

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

  const [currentTime, setCurrentTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [solves, setSolves] = useState([]);
  const [cases, setCases] = useState(()=>{
    const savedData = typeof window === "undefined" ? null : localStorage.getItem("selectedCases")
    const parsedData = JSON.parse(savedData)
    return parsedData?.length ? parsedData : [] // empty = all cases, picked at random
  })

  const changeAlgo = () => {
    const algorithmKeys = Object.keys(algorithms)
    const randomNum = Math.floor(Math.random() * cases.length);
    const caseAlgo = cases[randomNum]
    // console.log("caseAlgo", caseAlgo)
    if(!caseAlgo){
      const randomNum = Math.floor(Math.random() * algorithmKeys.length);
      setAlgo(algorithmKeys[randomNum])
      console.log(algorithmKeys[randomNum])
    }else{
    setAlgo(algorithmKeys[caseAlgo-1])
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

  // Get image based on current algorithm
  const currentImage =
    algo && algorithms[algo] ? `/oll/${algorithms[algo]}` : null;

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

          <span className="text-[11px] font-medium tracking-wider text-muted">
            3x3 WCA
          </span>
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
                alt="OLL Case Diagram"
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

          <div className="relative text-center">
            <span className="inline-block rounded-md border border-ink/30 bg-paper px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted">
              {status}
            </span>

            <p className={`my-2 font-mono text-7xl font-black tracking-tight tabular-nums sm:text-8xl md:text-9xl ${holding ? "text-cube-green" : "text-ink"}`}>
              {time.toFixed(2)}
            </p>

            <div className="inline-flex items-center gap-2 rounded-lg border border-ink/30 bg-paper px-3 py-1.5 text-xs font-medium text-muted">
              <kbd className="rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper">
                SPACE
              </kbd>

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
                  setBestTime(null);
                  setCurrentTime(null);
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
                <p className="text-xs font-medium text-muted">
                  No solves completed in this session
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {solves.map((solve, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-ink/30 bg-paper px-3 py-2 text-xs font-mono hover:border-ink"
                  >
                    <span className="font-sans text-[10px] text-muted">
                      #{index + 1}
                    </span>

                    <span
                      className={`font-bold ${
                        solve === bestTime
                          ? "text-ink"
                          : "text-ink"
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
    </div>
  );
}