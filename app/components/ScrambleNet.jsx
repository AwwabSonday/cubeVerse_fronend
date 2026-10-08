// Flat (2D) net of a 3x3 after applying a scramble. Axes: x = R, y = U, z = F.
const FACES = { U: [1, 1], D: [1, -1], R: [0, 1], L: [0, -1], F: [2, 1], B: [2, -1] };
const COLORS = { U: "#ffffff", D: "#ffe600", F: "#2e9e5b", B: "#2f6fb5", R: "#c8102e", L: "#ff6a00" };

// quarter turn about +axis, clockwise seen from the + side
const rot = ([x, y, z], a) => (a === 0 ? [x, z, -y] : a === 1 ? [-z, y, x] : [y, -x, z]);

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
  const stickers = solved();
  for (const move of moves.split(/\s+/)) {
    const m = /^([UDRLFB])(2|')?$/.exec(move);
    if (!m) continue; // ponytail: wide/slice moves are ignored, scrambles only use face turns
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

// [row offset, col offset] of each face block in the net, and the sticker's cell inside it
function cell({ p: [x, y, z], n: [nx, ny, nz] }) {
  if (ny === 1) return [0 + z + 1, 3 + x + 1];
  if (ny === -1) return [6 + 1 - z, 3 + x + 1];
  if (nz === 1) return [3 + 1 - y, 3 + x + 1];
  if (nz === -1) return [3 + 1 - y, 9 + 1 - x];
  if (nx === 1) return [3 + 1 - y, 6 + 1 - z];
  return [3 + 1 - y, 0 + z + 1];
}

export default function ScrambleNet({ scramble: moves, className = "" }) {
  if (!moves) return null;
  return (
    <svg viewBox="0 0 12 9" role="img" aria-label="Cube state after the scramble" className={className}>
      {scramble(moves).map((s, i) => {
        const [row, col] = cell(s);
        return <rect key={i} x={col + 0.04} y={row + 0.04} width="0.92" height="0.92" rx="0.1" fill={s.color} stroke="#1b1a17" strokeWidth="0.06" />;
      })}
    </svg>
  );
}
