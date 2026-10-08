"use client";

import { useEffect, useRef, useState } from "react";

// Hold Space -> ready (0.00), release -> runs, press Space again -> stops.
export default function useSpaceTimer(onStop) {
  const [time, setTime] = useState(0);
  const [holding, setHolding] = useState(false);
  const [running, setRunning] = useState(false);
  const onStopRef = useRef(onStop);

  useEffect(() => {
    onStopRef.current = onStop;
  });

  useEffect(() => {
    let state = "idle"; // idle | holding | running | stopped
    let start = 0;
    let raf = 0;

    const tick = () => {
      setTime((performance.now() - start) / 1000);
      raf = requestAnimationFrame(tick);
    };

    const down = (e) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      if (e.repeat) return;

      if (state === "running") {
        cancelAnimationFrame(raf);
        const final = (performance.now() - start) / 1000;
        state = "stopped";
        setRunning(false);
        setTime(final);
        onStopRef.current(final);
      } else {
        state = "holding";
        setHolding(true);
        setTime(0);
      }
    };

    const up = (e) => {
      if (e.code !== "Space") return;
      e.preventDefault();

      if (state === "holding") {
        state = "running";
        setHolding(false);
        setRunning(true);
        start = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (state !== "running") {
        state = "idle";
      }
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { time, holding, running, resetTime: () => setTime(0) };
}
