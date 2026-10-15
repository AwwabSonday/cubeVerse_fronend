"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";

const CUBE_FACTS = [
  {
    title: "43 Quintillion",
    fact: "A standard 3x3 Rubik's Cube has 43,252,003,274,489,856,000 possible permutations, but only one solved state!",
    tag: "Permutations",
  },
  {
    title: "God's Number is 20",
    fact: "Mathematicians proved in 2010 that ANY valid scrambled cube position can be solved in 20 moves or fewer.",
    tag: "Mathematics",
  },
  {
    title: "Ernő Rubik's Struggle",
    fact: "Ernő Rubik invented the cube in 1974 as a teaching tool for 3D geometry and took over a month to solve it himself!",
    tag: "History",
  },
  {
    title: "World Record: 3.13s",
    fact: "Max Park set the 3x3 single world record of 3.13 seconds in 2023 at Pride in Long Beach.",
    tag: "World Record",
  },
  {
    title: "Robot Speed: 0.305s",
    fact: "In 2024, a robot built by Mitsubishi Electric solved a Rubik's Cube in 0.305 seconds—faster than a human blink!",
    tag: "Robotics",
  },
  {
    title: "Best-Selling Toy",
    fact: "Over 450 million Rubik's cubes have been sold globally, making it the top-selling puzzle toy in world history.",
    tag: "Trivia",
  },
  {
    title: "1.4 Trillion Years",
    fact: "If you examined one combination every second, it would take you 1.4 trillion years to see them all.",
    tag: "Mind-Blowing",
  },
  {
    title: "Blindfolded: 12.00s",
    fact: "Tommy Cherry holds the 3x3 blindfolded world record at 12.00 seconds, memorizing and solving it completely blind.",
    tag: "Blindfolded",
  },
];

export default function AuthLayout({ children }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  const handleFlipCard = () => {
    if (isFlipped) {
      // Advance to next fact when flipping back or flipping again
      setFactIndex((prev) => (prev + 1) % CUBE_FACTS.length);
    }
    setIsFlipped(!isFlipped);
  };

  const nextFact = (e) => {
    e.stopPropagation();
    setFactIndex((prev) => (prev + 1) % CUBE_FACTS.length);
  };

  const currentFact = CUBE_FACTS[factIndex];

  return (
    <div className="h-screen max-h-screen w-full flex flex-col bg-paper text-ink overflow-hidden select-none">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 md:px-8 overflow-hidden min-h-0">
        {/* Split Showcase Card */}
        <div className="w-full max-w-5xl h-[84vh] max-h-[660px] grid grid-cols-1 md:grid-cols-12 rounded-2xl border-2 border-ink bg-white shadow-[8px_8px_0px_0px_rgba(27,26,23,1)] overflow-hidden">
          {/* Left Column: Visual Art Showcase Panel with 3D Flip Card */}
          <div className="hidden md:flex md:col-span-5 bg-[#fcfbfa] border-r-2 border-ink p-5 lg:p-7 flex-col justify-between relative overflow-hidden">
            {/* Top Rubik's Color Strip */}
            <div className="flex gap-2">
              <div className="h-2 w-8 rounded-full bg-cube-red" />
              <div className="h-2 w-8 rounded-full bg-cube-yellow" />
              <div className="h-2 w-8 rounded-full bg-cube-blue" />
              <div className="h-2 w-8 rounded-full bg-cube-green" />
              <div className="h-2 w-8 rounded-full bg-cube-orange" />
            </div>

            <div className="relative z-10 my-1">
              <span className="inline-block rounded-md border border-ink bg-cube-yellow/40 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                CubeVerse Hub
              </span>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight leading-snug">
                Every algorithm. Every record.
              </h2>
              <p className="mt-1 text-xs lg:text-sm text-muted leading-relaxed">
                Click the cube card below to flip it and discover cube facts!
              </p>
            </div>

            {/* 3D Flip Card Container - Enlarged & Interactive */}
            <div className="my-auto py-1 relative flex flex-col items-center justify-center [perspective:1000px]">
              <div
                onClick={handleFlipCard}
                role="button"
                tabIndex={0}
                aria-label="Click to flip card for Rubik's Cube facts"
                className={`relative w-64 h-64 lg:w-72 lg:h-72 cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] hover:scale-[1.02] ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* Front Side: Big Cube Artwork */}
                <div className="absolute inset-0 rounded-2xl border-2 border-ink bg-white p-3.5 shadow-[5px_5px_0px_0px_rgba(27,26,23,1)] flex flex-col items-center justify-between [backface-visibility:hidden]">
                  <div className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-muted">
                    <span>3x3 Math Art</span>
                    <span className="rounded bg-cube-yellow px-1.5 py-0.5 text-ink border border-ink">
                      Click to Flip ↻
                    </span>
                  </div>

                  <div className="relative w-full flex-1 my-1">
                    <Image
                      src="/random/cube-doodle.png"
                      alt="Rubik's cube artwork doodles"
                      fill
                      className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  </div>

                  <div className="w-full text-center">
                    <span className="text-[11px] font-bold text-muted flex items-center justify-center gap-1.5">
                      <span>✨</span> Tap card to reveal secret fact
                    </span>
                  </div>
                </div>

                {/* Back Side: Speedcubing Fact Card */}
                <div className="absolute inset-0 rounded-2xl border-2 border-ink bg-[#fffdfa] p-5 shadow-[5px_5px_0px_0px_rgba(27,26,23,1)] flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-ink/15 pb-2">
                    <span className="rounded-md border border-ink bg-cube-yellow px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-ink">
                      {currentFact.tag}
                    </span>
                    <span className="text-[10px] font-bold text-muted">
                      Fact #{factIndex + 1} of {CUBE_FACTS.length}
                    </span>
                  </div>

                  {/* Fact Body */}
                  <div className="my-auto py-2 text-center">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper text-base mb-2">
                      💡
                    </div>
                    <h3 className="text-base font-black text-ink mb-1.5 leading-snug">
                      {currentFact.title}
                    </h3>
                    <p className="text-xs font-semibold text-muted leading-relaxed">
                      {currentFact.fact}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-ink/15">
                    <button
                      type="button"
                      onClick={nextFact}
                      className="flex-1 rounded-md border-2 border-ink bg-cube-yellow py-1.5 text-xs font-bold text-ink shadow-[2px_2px_0px_0px_rgba(27,26,23,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none"
                    >
                      Next Fact ↻
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
                      }}
                      className="rounded-md border-2 border-ink bg-paper px-3 py-1.5 text-xs font-bold text-ink hover:bg-ink hover:text-paper"
                    >
                      Flip Back
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-muted pt-2 border-t border-ink/10">
              <span>CFOP • Roux • ZZ</span>
              <span className="font-mono text-ink">E = mc² • Σ = 464⁴</span>
            </div>
          </div>

          {/* Right Column: Form Panel (Comfortable, large inputs, non-scrollable) */}
          <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white overflow-hidden">
            <div className="max-w-md mx-auto w-full my-auto flex flex-col justify-center">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
