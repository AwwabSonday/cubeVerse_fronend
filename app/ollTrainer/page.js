import Link from "next/link";
import Timer from "../components/ollTimer.jsx";
import Navbar from "../components/Navbar";
export default function Page() {

  return (
    <>
      {/* <Navbar /> */}
      <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              OLL Trainer
            </h1>

            <Link
              href="/oll"
              className="mt-3 inline-block text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Algorithms
            </Link>
          </div>
        </div>
        <Timer />
      </main>
    </>
  );
}