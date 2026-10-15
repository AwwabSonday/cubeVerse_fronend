"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import useSpaceTimer from "./useSpaceTimer";

// Full 57 OLL scrambles and corresponding images in /oll/
const fullOllAlgorithms = {
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

// 10 Beginner OLL Cases with images in /b_oll/
const beginnerCases = {
  "Dot": {
    name: "Dot",
    image: "/b_oll/dot.png",
    scramble: "U2 R' U2 L F' U2 L F R' D2 B2 U L2 U R2 B2 L2 D L2 D F2",
    algorithm: "F R U R' U' F' f R U R' U' f'",
    group: "Orient Edges",
  },
  "F Shape": {
    name: "F Shape",
    image: "/b_oll/FShape.png",
    scramble: "U' R' L U2 L' U' F' U F R B2 R2 U B2 U R2 B2 U2 R2 B2",
    algorithm: "f R U R' U' f'",
    group: "Orient Edges",
  },
  "I Shape": {
    name: "I Shape",
    image: "/b_oll/IShape.png",
    scramble: "F R U R U R2 U2 F' U' F2 R2 D R2 D2 F2 U' F2 D F2",
    algorithm: "F R U R' U' F'",
    group: "Orient Edges",
  },
  "Sune": {
    name: "Sune",
    image: "/b_oll/sune.png",
    scramble: "U' B U2 B' U' B U' B U' B2 D B2 D' R2 U R2 B2",
    algorithm: "R U R' U R U2 R'",
    group: "Orient Corners",
  },
  "Anti-Sune": {
    name: "Anti-Sune",
    image: "/b_oll/antiSune.png",
    scramble: "U R U R2 U' R2 U R B2 U2 B2 R2 B2 U F2 U B2 U' F2 U R2",
    algorithm: "R U2 R' U' R U' R'",
    group: "Orient Corners",
  },
  "H Shape": {
    name: "H Shape",
    image: "/b_oll/h.png",
    scramble: "U L' U' B2 L B2 L2 U L B2 U F2 D2 L2 U' R2 U' B2 L2 D' R2",
    algorithm: "R U2 R' U' R U R' U' R U' R'",
    group: "Orient Corners",
  },
  "Pi Shape": {
    name: "Pi Shape",
    image: "/b_oll/pi.png",
    scramble: "U' R2 F D' B' R2 B' D F D' R2 D F2 U' B2 R2 B2 D B2 D' L2",
    algorithm: "R U2 R2 U' R2 U' R2 U2 R",
    group: "Orient Corners",
  },
  "T Shape": {
    name: "T Shape",
    image: "/b_oll/t.png",
    scramble: "L2 U L D' R2 D L D' L2 R2 D F2 U' F2 L2",
    algorithm: "r U R' U' r' F R F'",
    group: "Orient Corners",
  },
  "U Shape": {
    name: "U Shape",
    image: "/b_oll/u.png",
    scramble: "U2 B R2 B' L2 B R2 B D2 R2 D2 B2 U B2 D' R2 D B2 U2 L2",
    algorithm: "R2 D R' U2 R D' R' U2 R'",
    group: "Orient Corners",
  },
  "Cr5 Shape": {
    name: "Cr5 Shape",
    image: "/b_oll/cr5.png",
    scramble: "U2 F2 U R U' L2 U R U' F2 R2 B2 U' F2 U' L2 U L2 U' R2 D'",
    algorithm: "F' r U R' U' r' F R",
    group: "Orient Corners",
  },
};

// 57 Full OLL Algorithms solutions
const fullOllSolutions = {
  1: "R U2 R2 F R F' U2 R' F R F'",
  2: "r U r' U2 r U2 R' U2 R U' r'",
  3: "r' R2 U R' U r U2 r' U M'",
  4: "M U' r U2 r' U' R U' R' M'",
  5: "F R' F' R2 r' U R U' R' U' M'",
  6: "r U R' U R U2 r2 U' R U' R' U2 r",
  7: "r' R U R U R' U' M' R' F R F'",
  8: "r U R' U' M2 U R U' R' U' M'",
  9: "R U R' U' R U' R' F' U' F R U R'",
  10: "F R' F R2 U' R' U' R U R' F2",
  11: "R U R' U R U2 R' F R U R' U' F'",
  12: "R' U' R U' R' U2 R F R U R' U' F'",
  13: "L F' L' U' L U F U' L'",
  14: "R' F R U R' U' F' U R",
  15: "R U R2 U' R' F R U R U' F'",
  16: "R' U' R' F R F' U R",
  17: "r U R' U' r' R U R U' R'",
  18: "R U R' U' M' U R U' r'",
  19: "R U2 R' U' R U R' U' R U' R'",
  20: "R U2 R2 U' R2 U' R2 U2 R",
  21: "R2 D' R U2 R' D R U2 R",
  22: "r U R' U' r' F R F'",
  23: "F' r U R' U' r' F R",
  24: "R U2 R' U' R U' R'",
  25: "R U R' U R U2 R'",
  26: "R U R' U' R' F R2 U R' U' F'",
  27: "R U R' U R' F R F' R U2 R'",
  28: "R U2 R2 F R F' R U2 R'",
  29: "F R' F' R U R U' R'",
  30: "F U R U' R' U R U' R' F'",
  31: "R U R' U R U' B U' B' R'",
  32: "R' F R U R U' R2 F' R2 U' R' U R U R'",
  33: "r' U' r U' R' U R U' R' U R r' U r",
  34: "F U R U' R2 F' R U R U' R'",
  35: "R' F R U R' F' R F U' F'",
  36: "l' U' l L' U' L U l' U l",
  37: "r U r' R U R' U' r U' r'",
  38: "R' U' F U R U' R' F' R",
  39: "L U F' U' L' U L F L'",
  40: "F' U' L' U L F",
  41: "F U R U' R' F'",
  42: "R' U' R' F R F' R' F R F' U R",
  43: "F R U R' U' R U R' U' F'",
  44: "r U' r2 U r2 U r2 U' r",
  45: "r' U r2 U' r2 U' r2 U r'",
  46: "l' U2 L U L' U' L U L' U l",
  47: "r U2 R' U' R U R' U' R U' r'",
  48: "r U R' U R U2 r'",
  49: "l' U' L U' L' U2 l",
  50: "r U R' U R' F R F' R U2 r'",
  51: "M' R' U' R U' R' U2 R U' R r'",
  52: "l' U2 L U L' U l",
  53: "r U2 R' U' R U' r'",
  54: "R U R' U' R' F R F'",
  55: "F R U R' U' F'",
  56: "L' U' L U' L' U L U L F' L' F",
  57: "R U R' U R U' R' U' R' F R F'",
};

const normalizeBeginnerKey = (key) => {
  if (!key) return null;
  const clean = key.toLowerCase().replace(/[-_\s]/g, "");
  for (const k of Object.keys(beginnerCases)) {
    if (k.toLowerCase().replace(/[-_\s]/g, "") === clean) {
      return k;
    }
  }
  return null;
};

export default function Timer() {
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

  // Load saved preferences from localStorage & URL
  useEffect(() => {
    let initialMode = "full";
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get("mode");

      const savedBeg = localStorage.getItem("beginnerOllSelectedCases");
      const parsedBeg = savedBeg ? JSON.parse(savedBeg) : [];
      setBeginnerSelected(parsedBeg);

      const savedFull = localStorage.getItem("selectedCases");
      const parsedFull = savedFull ? JSON.parse(savedFull) : [];
      setFullSelected(parsedFull);

      const savedMode = localStorage.getItem("ollTrainerMode");

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
        const allKeys = Object.keys(beginnerCases);
        const validSelected = begList
          .map((k) => normalizeBeginnerKey(k))
          .filter(Boolean);

        const pool = validSelected.length > 0 ? validSelected : allKeys;
        const randomKey = pool[Math.floor(Math.random() * pool.length)];
        const caseData = beginnerCases[randomKey];

        if (caseData) {
          setAlgo(caseData.scramble);
          setCurrentImage(caseData.image);
          setCaseLabel(`Beginner: ${caseData.name}`);
          setCaseGroup(caseData.group);
          setCaseAlgorithm(caseData.algorithm);
        }
      } else {
        const algorithmKeys = Object.keys(fullOllAlgorithms);
        const pool = fullList.length > 0 ? fullList : [];

        let chosenScramble = "";
        let caseNumber = null;

        if (pool.length > 0) {
          const randomIndex = Math.floor(Math.random() * pool.length);
          caseNumber = pool[randomIndex];
          const numIdx = parseInt(caseNumber, 10) - 1;
          if (!isNaN(numIdx) && algorithmKeys[numIdx]) {
            chosenScramble = algorithmKeys[numIdx];
          }
        }

        if (!chosenScramble) {
          const randomNum = Math.floor(Math.random() * algorithmKeys.length);
          chosenScramble = algorithmKeys[randomNum];
          caseNumber = randomNum + 1;
        }

        setAlgo(chosenScramble);
        const imgFile = fullOllAlgorithms[chosenScramble];
        setCurrentImage(imgFile ? `/oll/${imgFile}` : null);
        setCaseLabel(`Case #${caseNumber}`);
        setCaseGroup("Full OLL");
        setCaseAlgorithm(fullOllSolutions[caseNumber] || "");
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
    localStorage.setItem("ollTrainerMode", newMode);
    changeAlgo(newMode);
  };

  const { time, holding, running, resetTime } = useSpaceTimer((finalTime) => {
    setCurrentTime(finalTime);
    setSolves((prev) => [...prev, finalTime]);
    setBestTime((prev) => (prev === null || finalTime < prev ? finalTime : prev));
    changeAlgo();
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
              Beginner OLL ({beginnerSelected.length > 0 ? `${beginnerSelected.length} selected` : "All 10"})
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
              Full OLL ({fullSelected.length > 0 ? `${fullSelected.length} selected` : "All 57"})
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
                alt="OLL Case Diagram"
                className="h-16 w-16 object-contain"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Trainer Grid */}
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        {/* Timer Hero Card */}
        <div className="flex min-h-[220px] sm:min-h-[250px] items-center justify-center rounded-xl border-2 border-ink bg-white p-4 sm:p-6 lg:col-span-2">
          <div className="relative text-center">
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
              <kbd className="rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper">
                SPACE
              </kbd>

              <span>
                {running ? "Press to stop" : "Hold until green, release to start"}
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