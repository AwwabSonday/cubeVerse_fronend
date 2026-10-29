"use client";

import { useEffect, useRef, useState } from "react";

// History chips are a fixed size so we can work out how many fit in the available space.
const CHIP_H = 32;
const CHIP_MIN_W = 100;
const GAP = 6;
const MOBILE_ROWS = 2;
const fmt = (n) => (n === null || n === undefined ? "--" : Number(n).toFixed(2));

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2";

function Stat({ label, value, accent }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border px-1 py-1.5 text-center ${
        accent ? "border-2 border-ink bg-cube-yellow" : "border-ink/30 bg-paper"
      }`}
    >
      <span
        className={`text-[10px] font-bold uppercase tracking-wider ${
          accent ? "text-ink" : "text-muted"
        }`}
      >
        {label}
      </span>
      <span className="font-mono text-sm font-extrabold leading-tight text-ink tabular-nums sm:text-base">
        {value}
      </span>
    </div>
  );
}

/**
 * Viewport-locked timer screen shared by the 3x3, OLL and PLL trainers.
 * Fills its parent (which must be a flex column with min-h-0); nothing in it scrolls,
 * history is paged instead.
 *
 * history: newest first, [{ time }]. Pass onDelete(globalIndex) to show a delete button.
 */
export default function TimerShell({
  modeBar,
  scrambleMeta,
  scramble,
  scrambleExtra,
  scrambleVisual,
  time,
  holding,
  running,
  onPointerDown,
  onPointerUp,
  stats,
  history,
  onReset,
  onDelete,
}) {
  const [page, setPage] = useState(0);
  const listRef = useRef(null);
  const [grid, setGrid] = useState({ cols: 2, rows: 3 });

  // On desktop the list fills the sidebar, so size the page to what fits; on mobile use a fixed strip.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const measure = () => {
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const cols = Math.max(1, Math.floor((el.clientWidth + GAP) / (CHIP_MIN_W + GAP)));
      const rows = wide
        ? Math.max(1, Math.floor((el.clientHeight + GAP) / (CHIP_H + GAP)))
        : MOBILE_ROWS;
      setGrid((g) => (g.cols === cols && g.rows === rows ? g : { cols, rows }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pageSize = grid.cols * grid.rows;
  const pages = Math.max(1, Math.ceil(history.length / pageSize));
  const current = Math.min(page, pages - 1);
  const start = current * pageSize;
  const shown = history.slice(start, start + pageSize);

  const status = running ? "Solving..." : holding ? "Release to start" : "Ready";

  return (
    <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-3 lg:grid-cols-[minmax(0,1fr)_17rem] lg:grid-rows-1">
      {/* Main column: mode bar, scramble, timer */}
      <div className="flex min-h-0 flex-col gap-3">
        {modeBar}

        <section
          aria-label="Scramble"
          className="relative shrink-0 overflow-hidden rounded-xl border-2 border-ink bg-white px-3 pb-3 pt-4"
        >
          <div className="absolute left-0 top-0 flex h-1.5 w-full" aria-hidden="true">
            <span className="flex-1 bg-cube-red" />
            <span className="flex-1 bg-cube-orange" />
            <span className="flex-1 bg-cube-yellow" />
            <span className="flex-1 bg-cube-green" />
            <span className="flex-1 bg-cube-blue" />
            <span className="flex-1 bg-paper" />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold uppercase tracking-widest text-ink">Scramble</span>
            {scrambleMeta}
          </div>

          <div className="mt-2 flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-sm font-bold leading-snug tracking-wide text-ink sm:text-base md:text-lg">
                {scramble}
              </p>
              {scrambleExtra}
            </div>
            {scrambleVisual}
          </div>
        </section>

        <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          role="button"
          tabIndex={0}
          aria-label="Speedcubing timer. Hold to get ready, release to start, tap to stop"
          className={`flex min-h-0 flex-1 cursor-pointer select-none touch-none flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-ink bg-white p-3 transition-colors active:bg-ink/5 ${focusRing}`}
        >
          <div className="pointer-events-none flex flex-col items-center text-center">
            <span className="rounded-md border border-ink/30 bg-paper px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted">
              {status}
            </span>
            <p
              aria-live="off"
              className={`my-1 font-mono text-[clamp(3.5rem,min(16vw,24dvh),9rem)] font-black leading-none tracking-tight tabular-nums ${
                holding ? "text-cube-green" : "text-ink"
              }`}
            >
              {time.toFixed(2)}
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg border border-ink/30 bg-paper px-2.5 py-1 text-[11px] font-medium text-muted sm:text-xs [@media(max-height:720px)]:hidden">
              <kbd className="hidden rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper sm:inline-block">
                SPACE
              </kbd>
              <span>
                {running ? "Press SPACE or tap to stop" : "Hold SPACE or touch, release to start"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Side column: stats + paged history */}
      <aside className="flex min-h-0 flex-col gap-3">
        <section className="shrink-0 rounded-xl border-2 border-ink bg-white p-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink">Statistics</h2>
            <button
              type="button"
              onClick={onReset}
              title="Reset session"
              aria-label="Reset session"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border border-ink/30 bg-paper text-sm text-muted transition-colors hover:border-cube-red hover:text-cube-red ${focusRing}`}
            >
              ↻
            </button>
          </div>
          <div className="grid grid-cols-4 gap-1.5 lg:grid-cols-2">
            <Stat label="Current" value={fmt(stats.current)} />
            <Stat label="Best" value={fmt(stats.best)} accent />
            <Stat label="Solves" value={stats.count} />
            <Stat label="Average" value={fmt(stats.average)} />
          </div>
        </section>

        <section className="flex min-h-0 flex-col rounded-xl border-2 border-ink bg-white p-2.5 lg:flex-1 [@media(max-height:700px)]:max-lg:hidden">
          <div className="mb-1.5 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink">History</h2>
            <div className="flex items-center gap-1 text-xs font-medium text-muted">
              <button
                type="button"
                onClick={() => setPage(current - 1)}
                disabled={current === 0}
                aria-label="Newer solves"
                className={`flex h-8 w-8 items-center justify-center rounded-md border border-ink/30 bg-paper text-ink disabled:opacity-30 ${focusRing}`}
              >
                ‹
              </button>
              <span className="min-w-10 text-center tabular-nums">
                {current + 1}/{pages}
              </span>
              <button
                type="button"
                onClick={() => setPage(current + 1)}
                disabled={current >= pages - 1}
                aria-label="Older solves"
                className={`flex h-8 w-8 items-center justify-center rounded-md border border-ink/30 bg-paper text-ink disabled:opacity-30 ${focusRing}`}
              >
                ›
              </button>
            </div>
          </div>

          <div ref={listRef} className="flex min-h-0 flex-col overflow-hidden lg:flex-1">
          {history.length === 0 ? (
            <p className="rounded-lg border border-ink/30 bg-paper px-2 py-3 text-center text-xs font-medium text-muted lg:flex-1 lg:content-center">
              No solves yet. Start solving to build history.
            </p>
          ) : (
            <ul
              className="grid content-start gap-1.5"
              style={{ gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))` }}
            >
              {shown.map((solve, i) => {
                const index = start + i;
                return (
                  <li
                    key={solve.id ?? index}
                    className="flex h-8 items-center justify-between gap-1 rounded-md border border-ink/30 bg-paper px-2 font-mono text-xs"
                  >
                    <span className="font-sans text-[10px] text-muted">
                      #{history.length - index}
                    </span>
                    <span className="font-bold tabular-nums">{fmt(solve.time)}</span>
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(index)}
                        title="Delete solve"
                        aria-label={`Delete solve ${history.length - index}`}
                        className={`text-muted transition-colors hover:text-cube-red ${focusRing}`}
                      >
                        ✕
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          </div>
        </section>
      </aside>
    </div>
  );
}
