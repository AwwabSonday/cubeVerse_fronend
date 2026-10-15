"use client";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const pllCases = [
  ["H", "h.png", "M2 U M2 U2 M2 U M2", "Edges Only"],
  ["Ua", "ua.png", "M2 U M U2 M' U M2", "Edges Only"],
  ["Ub", "ub.png", "M2 U' M U2 M' U' M2", "Edges Only"],
  ["Z", "z.png", "M2 U' M2 U' M' U2 M2 U2 M'", "Edges Only"],
  [
    "E",
    "e.png",
    "x R U' R' D R U R' D' R U R' D R U' R' D'",
    "Diagonal Corner Swap",
  ],
  [
    "Na",
    "na.png",
    "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
    "Diagonal Corner Swap",
  ],
  [
    "Nb",
    "nb.png",
    "R' U R U' R' F' U' F R U R' F R' F' R U' R",
    "Diagonal Corner Swap",
  ],
  [
    "V",
    "v.png",
    "R' U R' U' y R' F' R2 U' R' U R' F R F",
    "Diagonal Corner Swap",
  ],
  [
    "Y",
    "y.png",
    "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    "Diagonal Corner Swap",
  ],
  [
    "Aa",
    "aa.png",
    "x L2 D2 L' U' L D2 L' U L'",
    "Adjacent Corner Swap",
  ],
  [
    "Ab",
    "ab.png",
    "x' L2 D2 L U L' D2 L U' L",
    "Adjacent Corner Swap",
  ],
  [
    "F",
    "f.png",
    "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    "Adjacent Corner Swap",
  ],
  [
    "Ga",
    "ga.png",
    "R2 U R' U R' U' R U' R2 D U' R' U R D'",
    "Adjacent Corner Swap",
  ],
  [
    "Gb",
    "gb.png",
    "R' U' R y R2 u R' U R U' R u' R2",
    "Adjacent Corner Swap",
  ],
  [
    "Gc",
    "gc.png",
    "R2 U' R U' R U R' U R2 D' U R U' R' D",
    "Adjacent Corner Swap",
  ],
  [
    "Gd",
    "gd.png",
    "R U R' y' R2 u' R U' R' U R' u R2",
    "Adjacent Corner Swap",
  ],
  [
    "Ja",
    "ja.png",
    "x R2 F R F' R U2 r' U r U2",
    "Adjacent Corner Swap",
  ],
  [
    "Jb",
    "jb.png",
    "R U R' F' R U R' U' R' F R2 U' R' U'",
    "Adjacent Corner Swap",
  ],
  [
    "Ra",
    "ra.png",
    "R U' R' U' R U R D R' U' R D' R' U2 R'",
    "Adjacent Corner Swap",
  ],
  [
    "Rb",
    "rb.png",
    "R2 F R U R U' R' F' R U2 R' U2 R",
    "Adjacent Corner Swap",
  ],
  [
    "T",
    "t.png",
    "R U R' U' R' F R2 U' R' U' R U R' F'",
    "Adjacent Corner Swap",
  ],
];

export default function page() {
  const [selectrow, setSelectrow] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("PllSelectedCases");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSelectrow(parsedData);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("PllSelectedCases", JSON.stringify(selectrow));
    }
  }, [selectrow, loaded]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                PLL Algorithms
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-muted">
                PLL (Permutation of the Last Layer) solves the cube after OLL.
                This is the last step of the CFOP method.
              </p>
              <p className="mt-2 text-sm text-muted">
                Click a row or card to add or remove that case from the trainer.
              </p>
            </div>

            <div className="flex gap-2 sm:self-end">
              <Link
                href="/beginnerPll"
                className="rounded-md border-2 border-ink bg-cube-green px-4 py-2 font-semibold text-paper transition hover:brightness-95"
              >
                Beginner PLL (6 Cases)
              </Link>
            </div>
          </div>

          {/* Cases Display: Mobile Cards (< md) & Desktop Table (>= md) */}
          <div className="overflow-hidden rounded-xl border-2 border-ink bg-white">
            {/* Mobile Cards View (< md) */}
            <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:hidden">
              {pllCases.map(([name, image, algorithm, group]) => {
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
                          backgroundImage: image ? `url("/pll/${image}")` : "none",
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
                  {pllCases.map(([name, image, algorithm, group]) => (
                    <tr
                      key={name}
                      onClick={() => {
                        setSelectrow((prev) =>
                          prev.includes(name)
                            ? prev.filter((id) => id !== name)
                            : [...prev, name]
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
                        {image ? (
                          <div
                            className="mx-auto h-20 w-20 rounded-lg border border-ink/20 bg-white bg-contain bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url("/pll/${image}")`,
                            }}
                          />
                        ) : (
                          <div className="mx-auto h-20 w-20 rounded-lg border border-ink/20 bg-white" />
                        )}
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
            <div className="flex justify-center border-t-2 border-ink p-6">
              <Link
                href="/pllTrainer"
                className="rounded-md border-2 border-ink bg-ink px-7 py-3 font-semibold text-paper transition hover:bg-muted"
              >
                Train PLL
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
