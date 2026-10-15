"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function BeginnerPLLPage() {
  const [selectrow, setSelectrow] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const cases = [
    // Step 1: Permute Corners (First Look)
    [
      "Headlights",
      "headlights.png",
      "R U R' U' R' F R2 U' R' U' R U R' F'",
      "Permute Corners",
    ],
    [
      "Diagonal",
      "diagonal.png",
      "F R U' R' U' R U R' F' R U R' U' R' F R F'",
      "Permute Corners",
    ],

    // Step 2: Permute Edges (Second Look)
    [
      "Ua",
      "ua.png",
      "R U' R U R U R U' R' U' R2",
      "Permute Edges",
    ],
    [
      "Ub",
      "ub.png",
      "R2 U R U R' U' R' U' R' U R'",
      "Permute Edges",
    ],
    [
      "H",
      "h.png",
      "M2 U M2 U2 M2 U M2",
      "Permute Edges",
    ],
    [
      "Z",
      "z.png",
      "M' U M2 U M2 U M' U2 M2",
      "Permute Edges",
    ],
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("beginnerPllSelectedCases");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSelectrow(parsedData);
      } catch (err) {
        console.error("Failed to parse saved cases", err);
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("beginnerPllSelectedCases", JSON.stringify(selectrow));
    }
  }, [selectrow, loaded]);

  const handleSelectAll = () => {
    const allNames = cases.map(([name]) => name);
    setSelectrow(allNames);
  };

  const handleClearAll = () => {
    setSelectrow([]);
  };

  const setTrainerBeginnerMode = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pllTrainerMode", "beginner");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-md border-2 border-ink bg-cube-green px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-paper">
                  2-Look PLL
                </span>
                <span className="text-sm font-semibold text-muted">6 Algorithms</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">
                2-Look PLL Algorithms
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-muted">
                2-Look PLL solves the cube after OLL in two steps:
                first permuting the corners (Headlights or Diagonal), then permuting the edges (Ua, Ub, H, or Z).
                Only 6 algorithms instead of 21!
              </p>
              <p className="mt-2 text-sm text-muted">
                Click rows or cards to select cases to practice in the PLL Trainer.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:self-end">
              <Link
                href="/pllAlgorithm"
                className="rounded-md border-2 border-ink px-4 py-2 font-semibold transition hover:bg-ink hover:text-paper"
              >
                Full PLL (21)
              </Link>
              <Link
                href="/pllTrainer?mode=beginner"
                onClick={setTrainerBeginnerMode}
                className="rounded-md border-2 border-ink bg-ink px-4 py-2 font-semibold text-paper transition hover:bg-muted"
              >
                Train 2-Look PLL
              </Link>
            </div>
          </div>

          {/* Quick Selection Toolbar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border-2 border-ink bg-white p-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-ink">Selected:</span>
              <span className="rounded-md bg-paper px-2.5 py-1 font-mono font-semibold text-ink">
                {selectrow.length === 0
                  ? "All 6 cases active in trainer"
                  : `${selectrow.length} of 6 selected`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="rounded-md border border-ink/40 bg-paper px-3 py-1 text-xs font-semibold text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="rounded-md border border-ink/40 bg-paper px-3 py-1 text-xs font-semibold text-ink transition hover:border-ink hover:bg-cube-red hover:text-paper"
              >
                Clear Selection
              </button>
            </div>
          </div>

          {/* Cases Display: Mobile Cards (< md) & Desktop Table (>= md) */}
          <div className="overflow-hidden rounded-xl border-2 border-ink bg-white">
            {/* Mobile Cards View (< md) */}
            <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:hidden">
              {cases.map(([name, image, algorithm, group]) => {
                const isSelected = selectrow.includes(name);
                return (
                  <div
                    key={name}
                    onClick={() => {
                      setSelectrow((prev) =>
                        prev.includes(name)
                          ? prev.filter((id) => id !== name)
                          : [...prev, name]
                      );
                    }}
                    className={`cursor-pointer rounded-xl border-2 border-ink p-3 transition-all ${
                      isSelected
                        ? "bg-cube-yellow shadow-[4px_4px_0px_0px_rgba(27,26,23,1)]"
                        : "bg-paper hover:bg-white shadow-[2px_2px_0px_0px_rgba(27,26,23,1)]"
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-ink/15 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-ink">{name}</span>
                        <span className="rounded-md border border-ink/30 bg-white px-2 py-0.5 text-[10px] font-bold text-muted">
                          {group}
                        </span>
                      </div>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border border-ink text-xs font-black transition-colors ${
                          isSelected ? "bg-ink text-paper" : "bg-white text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className="h-16 w-16 shrink-0 rounded-lg border border-ink/20 bg-white bg-contain bg-center bg-no-repeat p-1"
                        style={{
                          backgroundImage: `url("/b_pll/${image}")`,
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                          Algorithm
                        </span>
                        <p className="font-mono text-xs font-bold text-ink break-words leading-relaxed mt-0.5">
                          {algorithm}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View (>= md) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[750px] border-collapse text-left">
                <thead>
                  <tr className="bg-ink text-paper">
                    <th className="px-5 py-4 text-center font-semibold">
                      Name
                    </th>

                    <th className="px-5 py-4 text-center font-semibold">
                      Case
                    </th>

                    <th className="px-5 py-4 font-semibold text-center">
                      Algorithm
                    </th>

                    <th className="px-5 py-4 font-semibold text-center">
                      Group
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cases.map(([name, image, algorithm, group]) => (
                    <tr
                      key={name}
                      onClick={() => {
                        setSelectrow((prev) =>
                          prev.includes(name)
                            ? prev.filter((id) => id !== name)
                            : [...prev, name],
                        );
                      }}
                      className={`cursor-pointer border-b border-ink/20 transition-colors ${
                        selectrow.includes(name)
                          ? "bg-cube-yellow shadow-[inset_6px_0_0_var(--color-ink)] hover:bg-cube-yellow"
                          : "hover:bg-ink/5"
                      }`}
                    >
                      <td className="px-5 py-4 text-center font-bold">
                        {name}
                      </td>

                      <td className="px-5 py-4">
                        <div
                          className="mx-auto h-20 w-20 rounded-lg border border-ink/20 bg-white bg-contain bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url("/b_pll/${image}")`,
                          }}
                        />
                      </td>

                      <td className="px-5 py-4 font-mono text-base font-semibold">
                        {algorithm}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="whitespace-nowrap rounded-md border-2 border-ink bg-paper px-3 py-1 text-sm font-medium">
                          {group}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Train Button */}
            <div className="flex flex-wrap justify-center gap-4 border-t-2 border-ink p-6">
              <Link
                href="/pllTrainer?mode=beginner"
                onClick={setTrainerBeginnerMode}
                className="rounded-md border-2 border-ink bg-ink px-7 py-3 font-semibold text-paper transition hover:bg-muted"
              >
                Train 2-Look PLL ({selectrow.length > 0 ? `${selectrow.length} Cases` : "All 6 Cases"})
              </Link>
              <Link
                href="/pllAlgorithm"
                className="rounded-md border-2 border-ink px-7 py-3 font-semibold transition hover:bg-ink hover:text-paper"
              >
                View Full PLL (21 Cases)
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
