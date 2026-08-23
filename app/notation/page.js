import Link from "next/link";
import React from "react";
import Image from "next/image";
function MoveGrid({ moves, small = false }) {
  return (
    <div
      className={`grid gap-4 ${
        small
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
      }`}
    >
      {moves.map(([image, move]) => (
        <div
          key={move}
          className="group overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            className={`${
              small ? "aspect-[4/3] p-6" : "aspect-square p-3"
            } bg-contain bg-center bg-no-repeat transition duration-300 group-hover:scale-105`}
            style={{ backgroundImage: `url("/${image}")` }}
          />

          <p className="border-t border-slate-100 py-3 text-center text-xl font-bold text-slate-700">
            {move}
          </p>
        </div>
      ))}
    </div>
  );
}

function Section({ title, description, moves, small = false }) {
  return (
    <section className="mt-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-300" />

        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          {title}
        </h2>

        <div className="h-px flex-1 bg-slate-300" />
      </div>

      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <p className="leading-7 text-slate-600">{description}</p>
      </div>

      <MoveGrid moves={moves} small={small} />
    </section>
  );
}

export default function Page() {
  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/random/logo.png"
              alt="CubeVerse logo"
              className=" rounded-full object-cover"
              height={70}
              width={70}
            />
          </Link>

          <h1 className="text-center text-xl font-bold text-slate-800 sm:text-2xl md:text-3xl">
            Rubik's Cube Move Notation
          </h1>

          <div className="w-12 text-center text-sm font-medium text-slate-500">
            Note
          </div>
        </div>
      </nav>

      {/* Tutorial */}
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <section className="mx-auto max-w-6xl">
          <div className="mb-10 grid items-center gap-8 rounded-2xl bg-white p-6 shadow-md md:grid-cols-2 md:p-8">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-800">
                Learn Cube Notation
              </h2>

              <p className="leading-7 text-slate-600">
                This video shows how to read moves on the Rubik's Cube so you
                can follow written algorithms. Below are the 3x3 moves for
                reference, but keep in mind that there is also different
                notation for big cubes (4x4 cube and up) mentioned in the
                video.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl shadow-lg">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube.com/embed/24eHm4ri8WM?si=triHctbwJM5zgvku"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Face Turns */}
          <section>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-300" />

              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                Face Turns
              </h2>

              <div className="h-px flex-1 bg-slate-300" />
            </div>

            <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
              <p className="leading-7 text-slate-600">
                The basic moves are <b>U</b>p, <b>D</b>own, <b>R</b>ight,{" "}
                <b>L</b>eft, <b>F</b>ront, <b>B</b>ack.
                <br />
                <br />
                Each move means to turn that side clockwise, as if you were
                facing that side.
              </p>
            </div>

            {/* Basic Moves */}
            <MoveGrid
              moves={[
                ["notations/1.png", "U"],
                ["notations/2.png", "D"],
                ["notations/3.png", "R"],
                ["notations/4.png", "L"],
                ["notations/5.png", "F"],
                ["notations/6.png", "B"],
              ]}
            />

            {/* Prime Moves */}
            <div className="my-8 rounded-xl bg-white p-5 shadow-sm">
              <p className="leading-7 text-slate-600">
                An apostrophe (pronounced as prime) means to turn the face in
                the opposite direction (counterclockwise).
              </p>
            </div>

            <MoveGrid
              moves={[
                ["notations/p1.png", "U'"],
                ["notations/p2.png", "D'"],
                ["notations/p3.png", "R'"],
                ["notations/p4.png", "L'"],
                ["notations/p5.png", "F'"],
                ["notations/p6.png", "B'"],
              ]}
            />

            {/* Double Moves */}
            <div className="my-8 rounded-xl bg-white p-5 shadow-sm">
              <p className="leading-7 text-slate-600">
                The number <b>2</b> means to turn that face twice.
              </p>
            </div>

            <MoveGrid
              moves={[
                ["notations/u2.png", "U2"],
                ["notations/d2.png", "D2"],
                ["notations/r2.png", "R2"],
                ["notations/l2.png", "L2"],
                ["notations/f2.png", "F2"],
                ["notations/b2.png", "B2"],
              ]}
            />

            {/* Wide Moves */}
            <Section
              title="Wide Moves"
              description="Wide moves turn 2 layers at once."
              moves={[
                ["notations/w1.png", "Uw / u"],
                ["notations/w2.png", "Dw / d"],
                ["notations/w3.png", "Rw / r"],
                ["notations/w4.png", "Lw / l"],
                ["notations/w5.png", "Fw / f"],
                ["notations/w6.png", "Bw / b"],
              ]}
            />

            {/* Cube Rotations */}
            <Section
              title="Cube Rotations"
              description="Cube rotations are written as x, y, z."
              moves={[
                ["notations/x.png", "x"],
                ["notations/y.png", "y"],
                ["notations/z.png", "z"],
              ]}
              small
            />

            {/* Slice Moves */}
            <Section
              title="Slice Moves"
              description="Slice moves only turn the middle layer."
              moves={[
                ["notations/m.png", "M"],
                ["notations/e.png", "E"],
                ["notations/s.png", "S"],
              ]}
              small
            />

            {/* Home Button */}
            <div className="mt-12 flex justify-center">
              <Link
                href="/"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-95"
              >
                Home Page
              </Link>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}