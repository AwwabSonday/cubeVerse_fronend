"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
const ollCases = [
  ["1", "d1.png", "R U2 R2 F R F' U2 R' F R F'", "Dot"],
  ["2", "d2.png", "r U r' U2 r U2 R' U2 R U' r'", "Dot"],
  ["3", "d3.png", "r' R2 U R' U r U2 r' U M'", "Dot"],
  ["4", "d4.png", "M U' r U2 r' U' R U' R' M'", "Dot"],
  ["5", "d5.png", "F R' F' R2 r' U R U' R' U' M'", "Dot"],
  ["6", "d6.png", "r U R' U R U2 r2 U' R U' R' U2 r", "Dot"],
  ["7", "d7.png", "r' R U R U R' U' M' R' F R F'", "Dot"],
  ["8", "d8.png", "r U R' U' M2 U R U' R' U' M'", "Dot"],
  ["9", "as1.png", "R U R' U' R U' R' F' U' F R U R'", "Awkward Shape"],
  ["10", "as2.png", "F R' F R2 U' R' U' R U R' F2", "Awkward Shape"],
  ["11", "as3.png", "R U R' U R U2 R' F R U R' U' F'", "Awkward Shape"],
  ["12", "as4.png", "R' U' R U' R' U2 R F R U R' U' F'", "Awkward Shape"],
  ["13", "blb1.png", "L F' L' U' L U F U' L'", "Big Lightning Bolt"],
  ["14", "blb2.png", "R' F R U R' U' F' U R", "Big Lightning Bolt"],
  ["15", "c1.png", "R U R2 U' R' F R U R U' F'", "C Shape"],
  ["16", "c2.png", "R' U' R' F R F' U R", "C Shape"],
  ["17", "co1.png", "r U R' U' r' R U R U' R'", "Corners Oriented"],
  ["18", "co2.png", "R U R' U' M' U R U' r'", "Corners Oriented"],
  ["19", "cr1.png", "R U2 R' U' R U R' U' R U' R'", "Cross"],
  ["20", "cr2.png", "R U2 R2 U' R2 U' R2 U2 R", "Cross"],
  ["21", "cr3.png", "R2 D' R U2 R' D R U2 R", "Cross"],
  ["22", "cr4.png", "r U R' U' r' F R F'", "Cross"],
  ["23", "cr5.png", "F' r U R' U' r' F R", "Cross"],
  ["24", "cr6.png", "R U2 R' U' R U' R'", "Cross"],
  ["25", "cr7.png", "R U R' U R U2 R'", "Cross"],
  ["26", "fs1.png", "R U R' U' R' F R2 U R' U' F'", "Fish Shape"],
  ["27", "fs2.png", "R U R' U R' F R F' R U2 R'", "Fish Shape"],
  ["28", "fs3.png", "r U2 R' U' R U R' U' R U' r'", "Fish Shape"],
  ["29", "fs4.png", "M' U M U2 M' U M", "Fish Shape"],
  ["30", "kl1.png", "r' D' r U' r' D r U r B r'", "Knight Move Shape"],
  ["31", "kl2.png", "r U' r' U' r U r' F' U F", "Knight Move Shape"],
  ["32", "kl3.png", "R' F R U R' F' R F U' F'", "Knight Move Shape"],
  ["33", "kl4.png", "L F' L' U' L F L' F' U F", "Knight Move Shape"],
  ["34", "ll1.png", "r U R' U' r' F R F'", "Little Lightning Bolt"],
  ["35", "ll2.png", "r' U' R U R' U' R U' r", "Little Lightning Bolt"],
  ["36", "ll3.png", "R U2 R' U' R U R' U2 R' F R F'", "Little Lightning Bolt"],
  ["37", "ll4.png", "F R' F' R U2 R U2 R'", "Little Lightning Bolt"],
  ["38", "ls1.png", "r U R' U R U' R' U R U2 r'", "L Shape"],
  ["39", "ls2.png", "l' U' L U' L' U L U' L' U2 l", "L Shape"],
  ["40", "ls3.png", "r' U' r U' R' U R r' U r", "L Shape"],
  ["41", "ls4.png", "r U r' U R U' R' r U' r'", "L Shape"],
  ["42", "ls5.png", "R' U' R' F R F' R' U' R' F R F' U R", "L Shape"],
  ["43", "ls6.png", "F' L' U' L U L' U' L U F", "L Shape"],
  ["44", "p1.png", "f R U R' U' f'", "P Shape"],
  ["45", "p2.png", "f' L' U' L U f", "P Shape"],
  ["46", "p3.png", "R' U' F U R U' R' F' R", "P Shape"],
  ["47", "p4.png", "F U R U' R' F'", "P Shape"],
  ["48", "t1.png", "F R U R' U' F'", "T Shape"],
  ["49", "t2.png", "R U R' U' R' F R F'", "T Shape"],
  ["50", "w1.png", "R' U' R U' R' U R U R B' R' B", "W Shape"],
  ["51", "w2.png", "R U R' U R U' R' U' R' F R F'", "W Shape"],
  ["52", "es1.png", "r U R' U' M U R U' R'", "Small Lightning Bolt"],
  ["53", "es2.png", "r' U' R U M' U' R' U R", "Small Lightning Bolt"],
  ["54", "es3.png", "r U R' U' M2 U R U' R' U' M'", "Small Lightning Bolt"],
  ["55", "es4.png", "M U R U R' U' R' F R F' M'", "Small Lightning Bolt"],
  ["56", "line1.png", "F R U R' U' R F' r U R' U' r'", "All Edges Oriented"],
  ["57", "line2.png", "R U R' U' M' U R U' r'", "All Edges Oriented"],
];

export default function page() {
  const [selectrow, setSelectrow] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("selectedCases");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSelectrow(parsedData);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("selectedCases", JSON.stringify(selectrow));
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
                OLL Algorithms
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-muted">
                OLL (Orientation of the Last Layer) solves the top color of the
                last layer. This is the 3rd step of the CFOP method.
              </p>
              <p className="mt-2 text-sm text-muted">
                Click a row or card to add or remove that case from the trainer.
              </p>
            </div>

            <div className="flex gap-2 sm:self-end">
              <Link
                href="/beginnerOll"
                className="rounded-md border-2 border-ink bg-cube-yellow px-4 py-2 font-semibold text-ink transition hover:brightness-95"
              >
                Beginner OLL (10 Cases)
              </Link>
            </div>
          </div>

          {/* Cases Display: Mobile Cards (< md) & Desktop Table (>= md) */}
          <div className="overflow-hidden rounded-xl border-2 border-ink bg-white">
            {/* Mobile Cards View (< md) */}
            <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:hidden">
              {ollCases.map(([number, image, algorithm, group]) => {
                const isSelected = selectrow.includes(number);
                return (
                  <div
                    key={number}
                    onClick={() => {
                      setSelectrow((prev) =>
                        prev.includes(number)
                          ? prev.filter((id) => id !== number)
                          : [...prev, number]
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
                        <span className="font-extrabold text-sm text-ink">#{number}</span>
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
                          backgroundImage: `url("/oll/${image}")`,
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
                  {ollCases.map(([number, image, algorithm, group]) => (
                    <tr
                      key={number}
                      onClick={() => {
                        setSelectrow((prev) =>
                          prev.includes(number)
                            ? prev.filter((id) => id !== number)
                            : [...prev, number]
                        );
                      }}
                      className={`cursor-pointer border-b border-ink/20 transition-colors ${
                        selectrow.includes(number)
                          ? "bg-cube-yellow shadow-[inset_6px_0_0_var(--color-ink)] hover:bg-cube-yellow"
                          : "hover:bg-ink/5"
                      }`}
                    >
                      <td className="px-5 py-4 text-center font-bold">
                        {number}
                      </td>

                      <td className="px-5 py-4">
                        <div
                          className="mx-auto h-20 w-20 rounded-lg border border-ink/20 bg-white bg-contain bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url("/oll/${image}")`,
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
            <div className="flex justify-center border-t-2 border-ink p-6">
              <Link
                href="/ollTrainer"
                className="rounded-md border-2 border-ink bg-ink px-7 py-3 font-semibold text-paper transition hover:bg-muted"
              >
                Train OLL
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}