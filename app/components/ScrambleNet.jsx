"use client";

import React from "react";

// Flat 2D net of a 3x3 Rubik's cube after applying a scramble.
// Standard WCA orientation: White on U (top), Green on F (front).
// Axes: x = R (+1) / L (-1), y = U (+1) / D (-1), z = F (+1) / B (-1).
const FACES = {
  U: [1, 1],
  D: [1, -1],
  R: [0, 1],
  L: [0, -1],
  F: [2, 1],
  B: [2, -1],
};

// Vibrant authentic speedcube sticker colors
const COLORS = {
  U: "#FFFFFF", // White
  D: "#FFD500", // Vibrant Yellow
  F: "#00D024", // Vibrant Green
  B: "#0048E0", // Vibrant Blue
  R: "#DC2626", // Vibrant Red
  L: "#FF6B00", // Vibrant Orange
};

// 90° rotation about +axis, clockwise seen from + side
const rot = ([x, y, z], a) =>
  a === 0 ? [x, z, -y] : a === 1 ? [-z, y, x] : [y, -x, z];

function solved() {
  const stickers = [];
  for (const [face, [axis, sign]] of Object.entries(FACES)) {
    for (let a = -1; a <= 1; a++) {
      for (let b = -1; b <= 1; b++) {
        const p = [0, 0, 0];
        const n = [0, 0, 0];
        const [i, j] = [0, 1, 2].filter((k) => k !== axis);
        p[axis] = sign;
        p[i] = a;
        p[j] = b;
        n[axis] = sign;
        stickers.push({ p, n, color: COLORS[face] });
      }
    }
  }
  return stickers;
}

function scramble(moves) {
  if (!moves) return solved();
  const stickers = solved();
  for (const move of moves.split(/\s+/)) {
    const m = /^([UDRLFB])(2|')?$/.exec(move);
    if (!m) continue;
    const [axis, sign] = FACES[m[1]];
    const k = m[2] === "2" ? 2 : m[2] === "'" ? 3 : 1;
    const turns = sign > 0 ? k : (4 - k) % 4;
    for (const s of stickers) {
      if (s.p[axis] !== sign) continue;
      for (let t = 0; t < turns; t++) {
        s.p = rot(s.p, axis);
        s.n = rot(s.n, axis);
      }
    }
  }
  return stickers;
}

// Maps sticker coordinates (p, n) to face and local sticker cell (row, col in 0..2)
function getFaceInfo({ p: [x, y, z], n: [nx, ny, nz] }) {
  if (ny === 1) return { face: "U", col: 1, row: 0, rInFace: z + 1, cInFace: x + 1 };
  if (ny === -1) return { face: "D", col: 1, row: 2, rInFace: 1 - z, cInFace: x + 1 };
  if (nz === 1) return { face: "F", col: 1, row: 1, rInFace: 1 - y, cInFace: x + 1 };
  if (nz === -1) return { face: "B", col: 3, row: 1, rInFace: 1 - y, cInFace: 1 - x };
  if (nx === 1) return { face: "R", col: 2, row: 1, rInFace: 1 - y, cInFace: 1 - z };
  return { face: "L", col: 0, row: 1, rInFace: 1 - y, cInFace: z + 1 };
}

// Net layout definition:
//       [ U ]
// [ L ] [ F ] [ R ] [ B ]
//       [ D ]
const FACE_DEFS = [
  { face: "U", col: 1, row: 0 },
  { face: "L", col: 0, row: 1 },
  { face: "F", col: 1, row: 1 },
  { face: "R", col: 2, row: 1 },
  { face: "B", col: 3, row: 1 },
  { face: "D", col: 1, row: 2 },
];

const STICKER_SIZE = 14;
const INNER_GAP = 1.2;
const FACE_GAP = 5.5;
const PAD = 2.5;
const FACE_SIZE = 3 * STICKER_SIZE + 2 * INNER_GAP; // 44.4

// Width: 2 * 2.5 + 4 * 44.4 + 3 * 5.5 = 5 + 177.6 + 16.5 = 199.1
// Height: 2 * 2.5 + 3 * 44.4 + 2 * 5.5 = 5 + 133.2 + 11 = 149.2

export default function ScrambleNet({ scramble: moves, className = "" }) {
  if (!moves) return null;
  const stickers = scramble(moves);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      title="Cube scramble preview"
    >
      <svg
        viewBox="0 0 200 150"
        role="img"
        aria-label="Cube state after the scramble"
        className="h-full w-full object-contain"
      >
        {/* Crisp ink boundary around each 3x3 face */}
        {FACE_DEFS.map(({ face, col, row }) => {
          const fx = PAD + col * (FACE_SIZE + FACE_GAP);
          const fy = PAD + row * (FACE_SIZE + FACE_GAP);
          return (
            <rect
              key={face}
              x={fx}
              y={fy}
              width={FACE_SIZE}
              height={FACE_SIZE}
              rx="2.5"
              fill="none"
              stroke="#1b1a17"
              strokeWidth="1.8"
            />
          );
        })}

        {/* 54 individual stickers with dark ink borders */}
        {stickers.map((s, i) => {
          const info = getFaceInfo(s);
          const fx = PAD + info.col * (FACE_SIZE + FACE_GAP);
          const fy = PAD + info.row * (FACE_SIZE + FACE_GAP);
          const x = fx + info.cInFace * (STICKER_SIZE + INNER_GAP);
          const y = fy + info.rInFace * (STICKER_SIZE + INNER_GAP);
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={STICKER_SIZE}
              height={STICKER_SIZE}
              rx="1.5"
              fill={s.color}
              stroke="#1b1a17"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    </div>
  );
}
