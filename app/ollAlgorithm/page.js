"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
              OLL Algorithms
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-muted">
              OLL (Orientation of the Last Layer) solves the top color of the
              last layer. This is the 3rd step of the CFOP method.
            </p>
            <p className="mt-2 text-sm text-muted">
              Click a row to add or remove that case from the trainer.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border-2 border-ink bg-white">
            <div className="overflow-x-auto">
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
                  {[
                    ["1", "d1.png", "R U2 R2 F R F' U2 R' F R F'", "Dot"],
                    ["2", "d2.png", "r U r' U2 r U2 R' U2 R U' r'", "Dot"],
                    ["3", "d3.png", "r' R2 U R' U r U2 r' U M'", "Dot"],
                    ["4", "d4.png", "M U' r U2 r' U' R U' R' M'", "Dot"],
                    ["5", "d5.png", "F R' F' R2 r' U R U' R' U' M'", "Dot"],
                    ["6", "d6.png", "r U R' U R U2 r2 U' R U' R' U2 r", "Dot"],
                    ["7", "d7.png", "r' R U R U R' U' M' R' F R F'", "Dot"],
                    ["8", "d8.png", "r U R' U' M2 U R U' R' U' M'", "Dot"],

                    [
                      "9",
                      "as1.png",
                      "R U R' U' R U' R' F' U' F R U R'",
                      "Awkward Shape",
                    ],
                    [
                      "10",
                      "as2.png",
                      "F R' F R2 U' R' U' R U R' F2",
                      "Awkward Shape",
                    ],
                    [
                      "11",
                      "as3.png",
                      "R U R' U R U2 R' F R U R' U' F'",
                      "Awkward Shape",
                    ],
                    [
                      "12",
                      "as4.png",
                      "R' U' R U' R' U2 R F R U R' U' F'",
                      "Awkward Shape",
                    ],

                    [
                      "13",
                      "blb1.png",
                      "L F' L' U' L U F U' L'",
                      "Big Lightning Bolt",
                    ],
                    [
                      "14",
                      "blb2.png",
                      "R' F R U R' U' F' U R",
                      "Big Lightning Bolt",
                    ],

                    ["15", "c1.png", "R U R2 U' R' F R U R U' F'", "C Shape"],
                    ["16", "c2.png", "R' U' R' F R F' U R", "C Shape"],

                    [
                      "17",
                      "co1.png",
                      "r U R' U' r' R U R U' R'",
                      "Corners Oriented",
                    ],
                    [
                      "18",
                      "co2.png",
                      "R U R' U' M' U R U' r'",
                      "Corners Oriented",
                    ],

                    ["19", "cr1.png", "R U2 R' U' R U R' U' R U' R'", "Cross"],
                    ["20", "cr2.png", "R U2 R2 U' R2 U' R2 U2 R", "Cross"],
                    ["21", "cr3.png", "R2 D' R U2 R' D R U2 R", "Cross"],
                    ["22", "cr4.png", "r U R' U' r' F R F'", "Cross"],
                    ["23", "cr5.png", "F' r U R' U' r' F R", "Cross"],
                    ["24", "cr6.png", "R U2 R' U' R U' R'", "Cross"],
                    ["25", "cr7.png", "R U R' U R U2 R'", "Cross"],

                    [
                      "26",
                      "fs1.png",
                      "R U R' U' R' F R2 U R' U' F'",
                      "Fish Shape",
                    ],
                    [
                      "27",
                      "fs2.png",
                      "R U R' U R' F R F' R U2 R'",
                      "Fish Shape",
                    ],
                    ["28", "fs3.png", "R U2 R2 F R F' R U2 R'", "Fish Shape"],
                    ["29", "fs4.png", "F R' F' R U R U' R'", "Fish Shape"],

                    ["30", "i1.png", "F U R U' R' U R U' R' F'", "I Shape"],
                    ["31", "i2.png", "R U R' U R U' B U' B' R'", "I Shape"],
                    [
                      "32",
                      "i3.png",
                      "R' F R U R U' R2 F' R2 U' R' U R U R'",
                      "I Shape",
                    ],
                    [
                      "33",
                      "i4.png",
                      "r' U' r U' R' U R U' R' U R r' U r",
                      "I Shape",
                    ],

                    [
                      "34",
                      "k1.png",
                      "F U R U' R2 F' R U R U' R'",
                      "Knight Move Shape",
                    ],
                    [
                      "35",
                      "k2.png",
                      "R' F R U R' F' R F U' F'",
                      "Knight Move Shape",
                    ],
                    [
                      "36",
                      "k3.png",
                      "l' U' l L' U' L U l' U l",
                      "Knight Move Shape",
                    ],
                    [
                      "37",
                      "k4.png",
                      "r U r' R U R' U' r U' r'",
                      "Knight Move Shape",
                    ],

                    ["38", "p1.png", "R' U' F U R U' R' F' R", "P Shape"],
                    ["39", "p2.png", "L U F' U' L' U L F L'", "P Shape"],
                    ["40", "p3.png", "F' U' L' U L F", "P Shape"],
                    ["41", "p4.png", "F U R U' R' F'", "P Shape"],

                    [
                      "42",
                      "sm1.png",
                      "R' U' R' F R F' R' F R F' U R",
                      "Small L Shape",
                    ],
                    [
                      "43",
                      "sm2.png",
                      "F R U R' U' R U R' U' F'",
                      "Small L Shape",
                    ],
                    [
                      "44",
                      "sm3.png",
                      "r U' r2 U r2 U r2 U' r",
                      "Small L Shape",
                    ],
                    [
                      "45",
                      "sm4.png",
                      "r' U r2 U' r2 U' r2 U r'",
                      "Small L Shape",
                    ],
                    [
                      "46",
                      "sm5.png",
                      "l' U2 L U L' U' L U L' U l",
                      "Small L Shape",
                    ],
                    [
                      "47",
                      "sm6.png",
                      "r U2 R' U' R U R' U' R U' r'",
                      "Small L Shape",
                    ],

                    [
                      "48",
                      "slb1.png",
                      "r U R' U R U2 r'",
                      "Small Lightning Bolt",
                    ],
                    [
                      "49",
                      "slb2.png",
                      "l' U' L U' L' U2 l",
                      "Small Lightning Bolt",
                    ],
                    [
                      "50",
                      "slb3.png",
                      "r U R' U R' F R F' R U2 r'",
                      "Small Lightning Bolt",
                    ],
                    [
                      "51",
                      "slb4.png",
                      "M' R' U' R U' R' U2 R U' R r'",
                      "Small Lightning Bolt",
                    ],

                    ["52", "sq1.png", "l' U2 L U L' U l", "Square Shape"],
                    ["53", "sq2.png", "r U2 R' U' R U' r'", "Square Shape"],

                    ["54", "t1.png", "R U R' U' R' F R F'", "T Shape"],
                    ["55", "t2.png", "F R U R' U' F'", "T Shape"],

                    [
                      "56",
                      "w1.png",
                      "L' U' L U' L' U L U L F' L' F",
                      "W Shape",
                    ],
                    [
                      "57",
                      "w2.png",
                      "R U R' U R U' R' U' R' F R F'",
                      "W Shape",
                    ],
                  ].map(([number, image, algorithm, group]) => (
                    <tr
                      key={number}
                      onClick={() => {
                        console.log(selectrow);
                        setSelectrow((prev) =>
                          prev.includes(number)
                            ? prev.filter((id) => id !== number)
                            : [...prev, number],
                        );
                      }}
                      className={`cursor-pointer border-b border-ink/20 transition-colors ${selectrow.includes(number) ? "bg-cube-yellow shadow-[inset_6px_0_0_var(--color-ink)] hover:bg-cube-yellow" : "hover:bg-ink/5"}`}
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
              <a
                href="/ollTrainer"
                className="rounded-md border-2 border-ink bg-ink px-7 py-3 font-semibold text-paper transition hover:bg-muted"
              >
                Train OLL
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
