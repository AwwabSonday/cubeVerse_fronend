import React from 'react'
import Navbar from './components/Navbar'
import Link from 'next/link'
import Image from 'next/image'

export default function page() {
  return (
    <>
      <Navbar />

      {/* Main */}
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <div className="mx-auto max-w-6xl space-y-8">

          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            <Link href="/notation" className="group">
              <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="/notations/x.png"
                  loading='eager'
                  width={600}
                  height={400}
                  alt="Cube notation"
                  className="w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />

                <p className="p-5 text-center text-lg font-semibold text-slate-700">
                  Cube Notations
                </p>
              </div>
            </Link>

            <Link href="/ollAlgorithm" className="group">
              <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="/random/ollImage.png"
                  loading = 'eager'
                  width={600}
                  height={400}
                  alt="OLL algorithms"
                  className="w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />

                <p className="p-5 text-center text-lg font-semibold text-slate-700">
                  OLL Algorithms
                </p>
              </div>
            </Link>

            <Link href="/pllAlgorithm" className="group">
              <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="/random/pllImage.png"
                  loading = 'eager'
                  width={600}
                  height={400}
                  alt="PLL algorithms"
                  className="w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />

                <p className="p-5 text-center text-lg font-semibold text-slate-700">
                  PLL Algorithms
                </p>
              </div>
            </Link>

          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            <Link href="/pllTrainer" className="group">
              <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="/random/plltrainer.webp"
                  loading = 'eager'
                  width={600}
                  height={400}
                  alt="PLL trainer"
                  className="w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />

                <p className="p-5 text-center text-lg font-semibold text-slate-700">
                  PLL Trainer
                </p>
              </div>
            </Link>

            <Link href="/ollTrainer" className="group">
              <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="/random/olltrainer.webp"
                  loading = 'eager'
                  width={600}
                  height={400}
                  alt="OLL trainer"
                  className="w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />

                <p className="p-5 text-center text-lg font-semibold text-slate-700">
                  OLL Trainer
                </p>
              </div>
            </Link>

            <Link href="/trainer" className="group">
              <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="/random/notaionImage.webp"
                  loading = 'eager'
                  width={600}
                  height={400}
                  alt="Cube timer"
                  className="w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />

                <p className="p-5 text-center text-lg font-semibold text-slate-700">
                  Cube Timer
                </p>
              </div>
            </Link>

          </div>
        </div>
      </main>

      {/* Contact / About */}
      <section className="bg-slate-900 px-6 py-12 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">

          <div>
            <p className="mb-3 text-xl font-bold">Contact Us</p>

            <p className="mb-4 text-slate-300">
              Have questions or suggestions? We’d love to hear from you!
            </p>

            <p className="text-slate-300">
              Email:{' '}
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sayyedmustaqim736@gmail.com,awwabsonday@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
              >
                support@cubeverse.com
              </Link>
            </p>
          </div>

          <div>
            <p className="mb-3 text-xl font-bold">About Us</p>

            <p className="leading-7 text-slate-300">
              Whether you’re learning your first algorithm or chasing your next
              personal best, CubeVerse is here to inspire, teach, and connect you
              with the cubing community.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <Image
              src="/random/logo.png"
              loading='eager'
              width={100}
              height={100}
              alt="CubeVerse logo"
              className="rounded-full object-cover"
            />
          </div>

        </div>
      </section>
    </>
  )
}