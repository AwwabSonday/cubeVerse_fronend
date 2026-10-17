"use client";

import Image from "next/image";
import useSpaceTimer from "./useSpaceTimer";
import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { apiGetTimes, apiSaveTime, apiResetTimes } from "../services/api";

// Full 21 PLL algorithms & scrambles
const fullPllAlgorithms = {
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

const fullCaseMap = {
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
  "T": 20,
};

// 21 Full PLL Algorithms solutions
const fullPllSolutions = {
  "H": "M2 U M2 U2 M2 U M2",
  "Ua": "M2 U M U2 M' U M2",
  "Ub": "M2 U' M U2 M' U' M2",
  "Z": "M2 U' M2 U' M' U2 M2 U2 M'",
  "E": "x R U' R' D R U R' D' R U R' D R U' R' D'",
  "Na": "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
  "Nb": "R' U R U' R' F' U' F R U R' F R' F' R U' R",
  "V": "R' U R' U' y R' F' R2 U' R' U R' F R F",
  "Y": "F R U' R' U' R U R' F' R U R' U' R' F R F'",
  "Aa": "x L2 D2 L' U' L D2 L' U L'",
  "Ab": "x' L2 D2 L U L' D2 L U' L",
  "F": "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
  "Ga": "R2 U R' U R' U' R U' R2 U' D R' U R D'",
  "Gb": "R' U' R U D' R2 U R' U R U' R U' R2 D",
  "Gc": "R2 U' R U' R U R' U R2 U D' R U' R' D",
  "Gd": "R U R' U' D R2 U' R U' R' U R' U R2 D'",
  "Ja": "x R2 F R F' R U2 r' U r U2",
  "Jb": "R U R' F' R U R' U' R' F R2 U' R'",
  "Ra": "R U' R' U' R U R D R' U' R D' R' U2 R'",
  "Rb": "R2 F R U R U' R' F' R U2 R' U2 R",
  "T": "R U R' U' R' F R2 U' R' U' R U R' F'",
};

// 6 Beginner PLL Cases with images in /b_pll/
const beginnerPllCases = {
  "Headlights": {
    name: "Headlights",
    image: "/b_pll/headlights.png",
    scramble: "U L R B2 L R U L2 U' R2 B2 U' B2 U B2 L2 U' L2 B2",
    algorithm: "R U R' U' R' F R2 U' R' U' R U R' F'",
    group: "Permute Corners",
  },
  "Diagonal": {
    name: "Diagonal",
    image: "/b_pll/diagonal.png",
    scramble: "U' F B U2 F' B U' R2 U L2 D' L2 U' F2 D L2 D' R2",
    algorithm: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    group: "Permute Corners",
  },
  "Ua": {
    name: "Ua Perm",
    image: "/b_pll/ua.png",
    scramble: "U2 L2 D' L2 B2 L2 D L R' B2 D2 F2 U2 L' R' F2 D2",
    algorithm: "R U' R U R U R U' R' U' R2",
    group: "Permute Edges",
  },
  "Ub": {
    name: "Ub Perm",
    image: "/b_pll/ub.png",
    scramble: "U L2 U' B2 L2 B2 U L2 B2 U2 B2 L2 B2 U2 L2 B2 U2 L2",
    algorithm: "R2 U R U R' U' R' U' R' U R'",
    group: "Permute Edges",
  },
  "H": {
    name: "H Perm",
    image: "/b_pll/h.png",
    scramble: "U2 F B D2 F B D2 F2 R2 D2 R2 B2 L2 U2 F2 L2",
    algorithm: "M2 U M2 U2 M2 U M2",
    group: "Permute Edges",
  },
  "Z": {
    name: "Z Perm",
    image: "/b_pll/z.png",
    scramble: "U' L R U2 L R' U' L2 U' L2 U' L2 U' L2 U' L2 F2 L2 F2",
    algorithm: "M' U M2 U M2 U M' U2 M2",
    group: "Permute Edges",
  },
};

const normalizeBeginnerPllKey = (key) => {
  if (!key) return null;
  const clean = key.toLowerCase().replace(/[-_\s]/g, "");
  for (const k of Object.keys(beginnerPllCases)) {
    if (k.toLowerCase().replace(/[-_\s]/g, "") === clean) {
      return k;
    }
  }
  return null;
};

export default function Timer() {
  const { user, token } = useAuth();
  const [trainerMode, setTrainerMode] = useState("full"); // "beginner" | "full"
  const [mounted, setMounted] = useState(false);

  const [beginnerSelected, setBeginnerSelected] = useState([]);
  const [fullSelected, setFullSelected] = useState([]);

  const [algo, setAlgo] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [caseLabel, setCaseLabel] = useState("");
  const [caseGroup, setCaseGroup] = useState("");
  const [caseAlgorithm, setCaseAlgorithm] = useState("");
  const [showAlgoHint, setShowAlgoHint] = useState(false);

  const [currentTime, setCurrentTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [solves, setSolves] = useState([]);

  // Sync saved times from backend if authenticated
  useEffect(() => {
    const activeToken = token || user?.token;
    if (activeToken) {
      apiGetTimes("pll", activeToken)
        .then((data) => {
          if (data?.success) {
            if (data.currentTime !== null && data.currentTime !== undefined) {
              setCurrentTime(Number(data.currentTime));
            }
            if (data.bestTime !== null && data.bestTime !== undefined) {
              setBestTime(Number(data.bestTime));
            }
            if (Array.isArray(data.timeLogs) && data.timeLogs.length > 0) {
              setSolves(data.timeLogs.map((l) => Number(l.time)));
            }
          }
        })
        .catch(() => {});
    }
  }, [user, token]);

  // Load preferences from URL & localStorage
  useEffect(() => {
    let initialMode = "full";
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get("mode");

      const savedBeg = localStorage.getItem("beginnerPllSelectedCases");
      const parsedBeg = savedBeg ? JSON.parse(savedBeg) : [];
      setBeginnerSelected(parsedBeg);

      const savedFull = localStorage.getItem("PllSelectedCases");
      const parsedFull = savedFull ? JSON.parse(savedFull) : [];
      setFullSelected(parsedFull);

      const savedMode = localStorage.getItem("pllTrainerMode");

      if (modeParam === "beginner" || modeParam === "full") {
        initialMode = modeParam;
      } else if (savedMode === "beginner" || savedMode === "full") {
        initialMode = savedMode;
      } else if (parsedBeg.length > 0 && parsedFull.length === 0) {
        initialMode = "beginner";
      }

      setTrainerMode(initialMode);
    }

    setMounted(true);
  }, []);

  const changeAlgo = useCallback(
    (modeToUse = trainerMode, begList = beginnerSelected, fullList = fullSelected) => {
      if (modeToUse === "beginner") {
        const allKeys = Object.keys(beginnerPllCases);
        const validSelected = begList
          .map((k) => normalizeBeginnerPllKey(k))
          .filter(Boolean);

        const pool = validSelected.length > 0 ? validSelected : allKeys;
        const randomKey = pool[Math.floor(Math.random() * pool.length)];
        const caseData = beginnerPllCases[randomKey];

        if (caseData) {
          setAlgo(caseData.scramble);
          setCurrentImage(caseData.image);
          setCaseLabel(`Beginner: ${caseData.name}`);
          setCaseGroup(caseData.group);
          setCaseAlgorithm(caseData.algorithm);
        }
      } else {
        const algorithmKeys = Object.keys(fullPllAlgorithms);
        const pool = fullList.length > 0 ? fullList : [];

        let chosenScramble = "";
        let caseName = "";

        if (pool.length > 0) {
          const randomIndex = Math.floor(Math.random() * pool.length);
          const caseAlgo = pool[randomIndex];
          const idx = fullCaseMap[caseAlgo];
          if (idx !== undefined && algorithmKeys[idx]) {
            chosenScramble = algorithmKeys[idx];
            caseName = caseAlgo;
          }
        }

        if (!chosenScramble) {
          const randomNum = Math.floor(Math.random() * algorithmKeys.length);
          chosenScramble = algorithmKeys[randomNum];
          const keys = Object.keys(fullCaseMap);
          caseName = keys[randomNum] || `Case #${randomNum + 1}`;
        }

        setAlgo(chosenScramble);
        const imgFile = fullPllAlgorithms[chosenScramble];
        setCurrentImage(imgFile ? `/pll/${imgFile}` : null);
        setCaseLabel(`PLL: ${caseName}`);
        setCaseGroup("Full PLL");
        setCaseAlgorithm(fullPllSolutions[caseName] || "");
      }
    },
    [trainerMode, beginnerSelected, fullSelected]
  );

  // Trigger initial scramble when mounted or mode changes
  useEffect(() => {
    if (mounted) {
      changeAlgo();
    }
  }, [mounted, trainerMode, changeAlgo]);

  const handleSwitchMode = (newMode) => {
    setTrainerMode(newMode);
    localStorage.setItem("pllTrainerMode", newMode);
    changeAlgo(newMode);
  };

  const { time, holding, running, resetTime, handlePointerDown, handlePointerUp } = useSpaceTimer((finalTime) => {
    const currentScramble = algo;
    setCurrentTime(finalTime);
    setSolves((prev) => [...prev, finalTime]);
    setBestTime((prev) => (prev === null || finalTime < prev ? finalTime : prev));
    changeAlgo();

    const activeToken = token || user?.token;
    if (activeToken) {
      apiSaveTime({ time: finalTime, scramble: currentScramble, category: "pll" }, activeToken)
        .catch((err) => console.warn("Failed to sync PLL time:", err));
    }
  });

  const status = running ? "Solving..." : holding ? "Release to start" : "Ready";

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {/* Mode Switcher Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-ink bg-white px-4 py-2.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Mode:
          </span>
          <div className="inline-flex rounded-lg border-2 border-ink bg-paper p-0.5">
            <button
              type="button"
              onClick={() => handleSwitchMode("beginner")}
              className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                trainerMode === "beginner"
                  ? "bg-cube-yellow text-ink shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              Beginner PLL ({beginnerSelected.length > 0 ? `${beginnerSelected.length} selected` : "All 6"})
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode("full")}
              className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                trainerMode === "full"
                  ? "bg-cube-yellow text-ink shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              Full PLL ({fullSelected.length > 0 ? `${fullSelected.length} selected` : "All 21"})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          {caseAlgorithm && (
            <button
              type="button"
              onClick={() => setShowAlgoHint((prev) => !prev)}
              className="rounded-md border border-ink/40 bg-paper px-2.5 py-1 font-semibold text-ink transition hover:bg-ink hover:text-paper"
            >
              {showAlgoHint ? "Hide Algorithm" : "Show Algorithm"}
            </button>
          )}
        </div>
      </div>

      {/* Scramble Display */}
      <div className="relative overflow-hidden rounded-xl border-2 border-ink bg-white p-4 pt-5">
        <div className="absolute left-0 top-0 flex h-2 w-full" aria-hidden="true">
          <span className="flex-1 bg-cube-red" />
          <span className="flex-1 bg-cube-orange" />
          <span className="flex-1 bg-cube-yellow" />
          <span className="flex-1 bg-cube-green" />
          <span className="flex-1 bg-cube-blue" />
          <span className="flex-1 bg-paper" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-ink">
              Scramble
            </span>
            {caseLabel && (
              <span className="rounded-md border border-ink bg-cube-yellow px-2 py-0.5 text-xs font-bold text-ink">
                {caseLabel}
              </span>
            )}
            {caseGroup && (
              <span className="rounded-md border border-ink/20 bg-paper px-2 py-0.5 text-[11px] font-semibold text-muted">
                {caseGroup}
              </span>
            )}
          </div>

          <span className="text-[11px] font-medium tracking-wider text-muted">
            3x3 WCA
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-4 rounded-xl border border-ink/30 bg-paper p-3">
          <div className="min-w-0 flex-1">
            <p className="break-words font-mono text-base font-bold tracking-wide text-ink sm:text-lg md:text-xl">
              {mounted ? algo : "Generating scramble..."}
            </p>

            {showAlgoHint && caseAlgorithm && (
              <div className="mt-2 rounded-lg border border-ink/20 bg-white p-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  Solution:{" "}
                </span>
                <span className="font-mono text-sm font-semibold text-ink">
                  {caseAlgorithm}
                </span>
              </div>
            )}
          </div>

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
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        {/* Timer Hero Card - Supports Keyboard Space & Mobile Touch/Click */}
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          role="button"
          tabIndex={0}
          aria-label="Speedcubing timer card. Hold to ready, release to start, tap to stop"
          className="flex min-h-[220px] cursor-pointer select-none touch-none items-center justify-center rounded-xl border-2 border-ink bg-white p-4 transition-colors active:bg-ink/5 sm:min-h-[250px] sm:p-6 lg:col-span-2"
        >
          <div className="relative text-center pointer-events-none">
            <span className="inline-block rounded-md border border-ink/30 bg-paper px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted sm:text-[11px]">
              {status}
            </span>

            <p
              className={`my-2 font-mono text-6xl font-black leading-none tracking-tight tabular-nums sm:text-7xl md:text-8xl ${
                holding ? "text-cube-green" : "text-ink"
              }`}
            >
              {time.toFixed(2)}
            </p>

            <div className="inline-flex items-center gap-2 rounded-lg border border-ink/30 bg-paper px-2.5 py-1 text-[11px] font-medium text-muted sm:text-xs">
              <kbd className="hidden sm:inline-block rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper">
                SPACE
              </kbd>

              <span>
                {running ? "Press SPACE or tap card to stop" : "Hold SPACE or touch card, release to start"}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="flex min-h-[220px] sm:min-h-[250px] flex-col justify-between rounded-xl border-2 border-ink bg-white p-3.5 sm:p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink sm:text-sm">
              Statistics
            </h2>
            <button
              onClick={() => {
                setBestTime(null);
                setCurrentTime(null);
                setSolves([]);
                resetTime();
                const activeToken = token || user?.token;
                if (activeToken) {
                  apiResetTimes("pll", activeToken).catch(() => {});
                }
              }}
              title="Reset session"
              aria-label="Reset session"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink/30 bg-paper text-xs text-muted transition-colors hover:border-cube-red hover:text-cube-red"
            >
              ↻
            </button>
          </div>

          <div className="my-auto grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center justify-center rounded-lg border border-ink/30 bg-paper px-2 py-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Current
              </span>
              <span className="font-mono text-sm font-extrabold leading-tight text-ink sm:text-base md:text-lg">
                {currentTime !== null ? currentTime.toFixed(2) : "--"}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-ink bg-cube-yellow px-2 py-2 text-center shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink">
                Best
              </span>
              <span className="font-mono text-sm font-extrabold leading-tight text-ink sm:text-base md:text-lg">
                {bestTime !== null ? bestTime.toFixed(2) : "--"}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg border border-ink/30 bg-paper px-2 py-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Solves
              </span>
              <span className="font-mono text-sm font-extrabold leading-tight text-ink sm:text-base md:text-lg">
                {solves.length}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg border border-ink/30 bg-paper px-2 py-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Average
              </span>
              <span className="font-mono text-sm font-extrabold leading-tight text-ink sm:text-base md:text-lg">
                {solves.length > 0
                  ? (solves.reduce((a, b) => a + b, 0) / solves.length).toFixed(2)
                  : "--"}
              </span>
            </div>
          </div>
        </div>

        {/* Solve Logs */}
        <div className="flex flex-col rounded-xl border-2 border-ink bg-white p-3 sm:p-4 lg:col-span-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink sm:text-sm">
              Solve History
            </h3>

            <span className="text-xs font-medium text-muted">
              {solves.length} recorded
            </span>
          </div>

          <div className="max-h-36 min-h-20 overflow-y-auto rounded-lg border border-ink/30 bg-paper p-2">
            {solves.length === 0 ? (
              <div className="flex h-16 items-center justify-center">
                <p className="text-xs font-medium text-muted">
                  No solves completed in this session
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {solves.map((solve, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-ink/30 bg-paper px-3 py-2 font-mono text-xs hover:border-ink"
                  >
                    <span className="font-sans text-[10px] text-muted">
                      #{index + 1}
                    </span>

                    <span className="font-bold text-ink">
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