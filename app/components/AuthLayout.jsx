"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./Navbar";

const BACKGROUND_OPTIONS = [
  {
    id: "doodle",
    name: "Doodle Art (Provided)",
    type: "image",
    src: "/random/cube-doodle.png",
    bgClass: "bg-white",
    cardBg: "bg-white/95 backdrop-blur-md",
    badge: "User Uploaded",
  },
  {
    id: "cinematic",
    name: "Cinematic 3D & Algorithms",
    type: "image",
    src: "/random/cubeverse-wallpaper.jpg",
    bgClass: "bg-neutral-900",
    cardBg: "bg-[#f6f1e7]/95 backdrop-blur-md",
    badge: "Suggested 3D",
  },
  {
    id: "studio",
    name: "Studio Cube (Minimal)",
    type: "image",
    src: "/random/loginBg.png",
    bgClass: "bg-[#9dbad2]",
    cardBg: "bg-white/95 backdrop-blur-md",
    badge: "Clean 3D",
  },
  {
    id: "split",
    name: "Split Showcase",
    type: "split",
    src: "/random/cube-doodle.png",
    bgClass: "bg-paper",
    cardBg: "bg-white",
    badge: "Two-Panel",
  },
];

export default function AuthLayout({ children, title, subtitle }) {
  const [selectedBg, setSelectedBg] = useState("doodle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cubeverse_auth_bg");
    if (saved && BACKGROUND_OPTIONS.some((o) => o.id === saved)) {
      setSelectedBg(saved);
    }
  }, []);

  const handleSelectBg = (id) => {
    setSelectedBg(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("cubeverse_auth_bg", id);
    }
  };

  const currentOption = BACKGROUND_OPTIONS.find((o) => o.id === selectedBg) || BACKGROUND_OPTIONS[0];

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink transition-colors duration-300">
      <Navbar />

      <main className="relative flex-1 flex flex-col justify-center items-center px-4 py-8 sm:py-12 overflow-hidden">
        {/* Background Layer */}
        {currentOption.type === "image" && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-100"
              style={{
                backgroundImage: `url('${currentOption.src}')`,
                backgroundPosition: currentOption.id === "doodle" ? "center" : "center",
              }}
            />

            {/* Subtle Overlay to guarantee readability & contrast */}
            {currentOption.id === "doodle" && (
              <div className="absolute inset-0 bg-[#f6f1e7]/75 backdrop-blur-[2px] mix-blend-multiply" />
            )}
            {currentOption.id === "cinematic" && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            )}
            {currentOption.id === "studio" && (
              <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
            )}
          </div>
        )}

        {/* Floating Background Selector Bar */}
        <div className="relative z-20 mb-6 flex flex-wrap items-center justify-center gap-2 rounded-full border-2 border-ink bg-white/90 px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(27,26,23,1)] backdrop-blur-md text-xs font-semibold">
          <span className="text-muted flex items-center gap-1.5 px-1">
            <span className="inline-block w-2 h-2 rounded-full bg-cube-yellow border border-ink" />
            Theme:
          </span>
          {BACKGROUND_OPTIONS.map((opt) => {
            const isActive = selectedBg === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectBg(opt.id)}
                className={`rounded-full px-3 py-1 transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-ink text-paper shadow-sm scale-105"
                    : "text-ink hover:bg-ink/10"
                }`}
              >
                <span>{opt.name}</span>
                {opt.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-bold ${
                      isActive ? "bg-paper text-ink" : "bg-ink/10 text-muted"
                    }`}
                  >
                    {opt.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-center">
          {currentOption.type === "split" ? (
            /* Split Showcase Mode */
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-2xl border-2 border-ink bg-white shadow-[8px_8px_0px_0px_rgba(27,26,23,1)] overflow-hidden">
              {/* Left Column: Visual Art Panel */}
              <div className="lg:col-span-6 bg-[#fcfbfa] border-b-2 lg:border-b-0 lg:border-r-2 border-ink p-8 flex flex-col justify-between relative overflow-hidden">
                {/* Decorative sticker bar */}
                <div className="flex gap-1.5 mb-6">
                  <div className="h-2 w-8 rounded-full bg-cube-red" />
                  <div className="h-2 w-8 rounded-full bg-cube-yellow" />
                  <div className="h-2 w-8 rounded-full bg-cube-blue" />
                  <div className="h-2 w-8 rounded-full bg-cube-green" />
                  <div className="h-2 w-8 rounded-full bg-cube-orange" />
                </div>

                <div className="relative z-10">
                  <span className="inline-block rounded-md border border-ink bg-cube-yellow/30 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-ink mb-3">
                    CubeVerse Solver Hub
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Every algorithm. Every record.
                  </h2>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    Track your solves, drill OLL & PLL muscle memory, and conquer sub-X milestones with real-time stats.
                  </p>
                </div>

                {/* Doodle Artwork Showcase */}
                <div className="my-6 relative flex items-center justify-center">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-xl border-2 border-ink bg-white p-3 shadow-[4px_4px_0px_0px_rgba(27,26,23,1)] hover:rotate-1 transition-transform">
                    <Image
                      src="/random/cube-doodle.png"
                      alt="Rubik's cube math doodles"
                      fill
                      className="object-contain p-2"
                      priority
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-muted pt-2 border-t border-ink/10">
                  <span>CFOP • Roux • ZZ</span>
                  <span className="font-mono text-ink">E = mc² • Σ = 464⁴</span>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center bg-white">
                <div className="max-w-md mx-auto w-full">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
                    {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
                  </div>
                  {children}
                </div>
              </div>
            </div>
          ) : (
            /* Standard Card Mode with Background Image */
            <div
              className={`w-full max-w-md rounded-2xl border-2 border-ink ${currentOption.cardBg} p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(27,26,23,1)] transition-all duration-300 hover:shadow-[10px_10px_0px_0px_rgba(27,26,23,1)]`}
            >
              {/* Cute top sticker bar */}
              <div className="flex gap-1 mb-5">
                <div className="h-1.5 w-6 rounded-full bg-cube-red" />
                <div className="h-1.5 w-6 rounded-full bg-cube-yellow" />
                <div className="h-1.5 w-6 rounded-full bg-cube-blue" />
                <div className="h-1.5 w-6 rounded-full bg-cube-green" />
                <div className="h-1.5 w-6 rounded-full bg-cube-orange" />
              </div>

              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
                {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
              </div>

              {children}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
