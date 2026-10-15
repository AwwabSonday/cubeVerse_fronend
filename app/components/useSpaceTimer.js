"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Supports both Spacebar (desktop) and Touch / Pointer (mobile/tablet).
export default function useSpaceTimer(onStop) {
  const [time, setTime] = useState(0);
  const [holding, setHolding] = useState(false);
  const [running, setRunning] = useState(false);

  const onStopRef = useRef(onStop);
  const stateRef = useRef("idle"); // idle | holding | running | stopped
  const startRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    onStopRef.current = onStop;
  });

  const tick = useCallback(() => {
    setTime((performance.now() - startRef.current) / 1000);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const triggerStop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const final = (performance.now() - startRef.current) / 1000;
    stateRef.current = "stopped";
    setRunning(false);
    setTime(final);
    if (onStopRef.current) {
      onStopRef.current(final);
    }
  }, []);

  const triggerHold = useCallback(() => {
    stateRef.current = "holding";
    setHolding(true);
    setTime(0);
  }, []);

  const triggerStart = useCallback(() => {
    stateRef.current = "running";
    setHolding(false);
    setRunning(true);
    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // Keyboard events (Spacebar)
  useEffect(() => {
    const down = (e) => {
      if (e.code !== "Space") return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      e.preventDefault();
      if (e.repeat) return;

      if (stateRef.current === "running") {
        triggerStop();
      } else {
        triggerHold();
      }
    };

    const up = (e) => {
      if (e.code !== "Space") return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      e.preventDefault();

      if (stateRef.current === "holding") {
        triggerStart();
      } else if (stateRef.current !== "running") {
        stateRef.current = "idle";
      }
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      cancelAnimationFrame(rafRef.current);
    };
  }, [triggerStop, triggerHold, triggerStart]);

  // Pointer / Touch handlers for mobile & touchscreen devices
  const handlePointerDown = useCallback((e) => {
    if (e.target.closest("button") || e.target.closest("a") || e.target.closest("input")) return;

    if (stateRef.current === "running") {
      triggerStop();
    } else {
      triggerHold();
    }
  }, [triggerStop, triggerHold]);

  const handlePointerUp = useCallback((e) => {
    if (e.target.closest("button") || e.target.closest("a") || e.target.closest("input")) return;

    if (stateRef.current === "holding") {
      triggerStart();
    } else if (stateRef.current !== "running") {
      stateRef.current = "idle";
    }
  }, [triggerStart]);

  return {
    time,
    holding,
    running,
    resetTime: () => setTime(0),
    handlePointerDown,
    handlePointerUp,
  };
}
