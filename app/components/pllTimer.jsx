"use client";

import Image from "next/image";
import useSpaceTimer from "./useSpaceTimer";
import TimerShell from "./TimerShell";
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
              setSolves(data.timeLogs.map((l) => Number(l.time)).reverse());
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

  const history = solves.map((t) => ({ time: t })).reverse();

  return (
    <TimerShell
      modeBar={
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 rounded-xl border-2 border-ink bg-white px-3 py-2">
          <div className="inline-flex rounded-lg border-2 border-ink bg-paper p-0.5">
            {[
              ["beginner", `Beginner PLL (${beginnerSelected.length > 0 ? `${beginnerSelected.length} selected` : "All 6"})`],
              ["full", `Full PLL (${fullSelected.length > 0 ? `${fullSelected.length} selected` : "All 21"})`],
            ].map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => handleSwitchMode(mode)}
                aria-pressed={trainerMode === mode}
                className={`min-h-8 rounded-md px-3 py-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                  trainerMode === mode ? "bg-cube-yellow text-ink shadow-sm" : "text-muted hover:text-ink"
                }`}
              >
                <span className="sm:hidden">{label.split(" (")[0]}</span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {caseAlgorithm && (
            <button
              type="button"
              onClick={() => setShowAlgoHint((prev) => !prev)}
              className="min-h-8 rounded-md border border-ink/40 bg-paper px-2.5 py-1 text-xs font-semibold text-ink transition hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              {showAlgoHint ? "Hide Algorithm" : "Show Algorithm"}
            </button>
          )}
        </div>
      }
      scrambleMeta={
        <>
          {caseLabel && (
            <span className="rounded-md border border-ink bg-cube-yellow px-2 py-0.5 font-bold text-ink">
              {caseLabel}
            </span>
          )}
          {caseGroup && (
            <span className="rounded-md border border-ink/20 bg-paper px-2 py-0.5 text-[11px] font-semibold text-muted">
              {caseGroup}
            </span>
          )}
        </>
      }
      scramble={mounted ? algo : "Generating scramble..."}
      scrambleExtra={
        showAlgoHint && caseAlgorithm && (
          <div className="mt-2 rounded-lg border border-ink/20 bg-paper p-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Solution: </span>
            <span className="font-mono text-sm font-semibold text-ink">{caseAlgorithm}</span>
          </div>
        )
      }
      scrambleVisual={
        mounted && currentImage && (
          <div className="flex shrink-0 items-center justify-center rounded-md border-2 border-ink bg-white p-1.5">
            <Image
              src={currentImage}
              width={64}
              height={64}
              alt="PLL case diagram"
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
              priority
            />
          </div>
        )
      }
      time={time}
      holding={holding}
      running={running}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      stats={{
        current: currentTime,
        best: bestTime,
        count: solves.length,
        average: solves.length > 0 ? solves.reduce((a, b) => a + b, 0) / solves.length : null,
      }}
      history={history}
      onReset={() => {
        setBestTime(null);
        setCurrentTime(null);
        setSolves([]);
        resetTime();
        const activeToken = token || user?.token;
        if (activeToken) {
          apiResetTimes("pll", activeToken).catch(() => {});
        }
      }}
    />
  );
}
