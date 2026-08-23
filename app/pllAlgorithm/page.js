import Link from 'next/link';
import React from 'react'

export default function page() {
  return (
    <>
  <main className="min-h-screen bg-slate-100 px-4 py-10">
    <div className="mx-auto max-w-7xl">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800">
          PLL Algorithms
        </h1>

        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
          PLL (Permutation of the Last Layer) solves the cube after OLL.
          This is the last step of the CFOP method.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse text-left">
            <thead>
              <tr className="bg-slate-800 text-white">
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
                [
                  "H",
                  "h.png",
                  "M2 U M2 U2 M2 U M2",
                  "Edges Only",
                ],

                [
                  "Ua",
                  "ua.png",
                  "M2 U M U2 M' U M2",
                  "Edges Only",
                ],

                [
                  "Ub",
                  "ub.png",
                  "M2 U' M U2 M' U' M2",
                  "Edges Only",
                ],

                [
                  "Z",
                  "z.png",
                  "M2 U' M2 U' M' U2 M2 U2 M'",
                  "Edges Only",
                ],

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
                  "R2 U R' U R' U' R U' R2 U' D R' U R D'",
                  "Adjacent Corner Swap",
                ],

                [
                  "Gb",
                  "gb.png",
                  "R' U' R U D' R2 U R' U R U' R U' R2 D",
                  "Adjacent Corner Swap",
                ],

                [
                  "Gc",
                  "gc.png",
                  "R2 U' R U' R U R' U R2 U D' R U' R' D",
                  "Adjacent Corner Swap",
                ],

                [
                  "Gd",
                  "gd.png",
                  "R U R' U' D R2 U' R U' R' U R' U R2 D'",
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
                  "R U R' F' R U R' U' R' F R2 U' R'",
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
              ].map(([name, image, algorithm, group]) => (
                <tr
                  key={name}
                  className="border-b border-slate-200 transition hover:bg-slate-50"
                >
                  {/* Name */}
                  <td className="px-5 py-4 text-center font-bold text-slate-700">
                    {name}
                  </td>

                  {/* Case */}
                  <td className="px-5 py-4">
                    {image ? (
                      <div
                        className="mx-auto h-20 w-20 rounded-lg bg-slate-100 bg-contain bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url("/pll/${image}")`,
                        }}
                      />
                    ) : (
                      <div className="mx-auto h-20 w-20 rounded-lg bg-slate-100" />
                    )}
                  </td>

                  {/* Algorithm */}
                  <td className="px-5 py-4 font-mono text-18px font-medium text-slate-700 text-center">
                    {algorithm}
                  </td>

                  {/* Group */}
                  <td className="px-5 py-4 text-center">
                    <span className="whitespace-nowrap rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      {group}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Train Button */}
        <div className="flex justify-center border-t border-slate-200 p-6">
          <a
            href="/pllTrainer"
            className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            Train PLL
          </a>
        </div>
      </div>

      {/* Home Button */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
        >
          Home Page
        </Link>
      </div>
    </div>
  </main>
</>
  );
}
