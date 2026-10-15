import React from 'react'
import Navbar from './components/Navbar'
import Link from 'next/link'
import Image from 'next/image'

// Each tool is one "face" of the cube, so each gets a sticker colour.
const sections = [
  {
    title: 'Learn',
    items: [
      { href: '/notation', img: '/notations/x.png', label: 'Cube Notations', text: 'Read R, U, F and every turn.', face: 'bg-paper' },
      { href: '/beginnerOll', img: '/b_oll/sune.png', label: 'Beginner OLL', text: 'Orient last layer with 10 algorithms.', face: 'bg-cube-orange' },
      { href: '/ollAlgorithm', img: '/random/ollImage.png', label: 'OLL Algorithms', text: 'Full 57 last layer cases.', face: 'bg-cube-yellow' },
      { href: '/beginnerPll', img: '/b_pll/headlights.png', label: 'Beginner PLL', text: 'Permute last layer with 6 algorithms.', face: 'bg-cube-blue' },
      { href: '/pllAlgorithm', img: '/random/pllImage.png', label: 'PLL Algorithms', text: 'Full 21 last layer cases.', face: 'bg-cube-green' },
    ],
  },
  {
    title: 'Practice',
    items: [
      { href: '/pllTrainer', img: '/random/plltrainer.webp', label: 'PLL Trainer', text: 'Drill cases until they are instant.', face: 'bg-cube-blue' },
      { href: '/ollTrainer', img: '/random/olltrainer.webp', label: 'OLL Trainer', text: 'Recognise every OLL case.', face: 'bg-cube-orange' },
      { href: '/trainer', img: '/random/notaionImage.webp', label: 'Cube Timer', text: 'Time your solves.', face: 'bg-cube-red' },
    ],
  },
]

// 3x3 face used as the hero graphic
const stickers = [
  'bg-cube-red', 'bg-cube-yellow', 'bg-cube-blue',
  'bg-cube-green', 'bg-paper', 'bg-cube-orange',
  'bg-cube-orange', 'bg-cube-blue', 'bg-cube-green',
]

export default function page() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Solve faster. Learn every algorithm.
            </h1>
            <p className="mt-4 max-w-md text-lg leading-7 text-muted">
              Notation, OLL and PLL references, trainers and a timer, all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/trainer"
                className="rounded-md border-2 border-ink bg-ink px-6 py-3 font-semibold text-paper transition hover:bg-muted"
              >
                Start the timer
              </Link>
              <Link
                href="/notation"
                className="rounded-md border-2 border-ink px-6 py-3 font-semibold transition hover:bg-ink hover:text-paper"
              >
                Learn notation
              </Link>
            </div>
          </div>

          <div aria-hidden="true" className="mx-auto grid w-full max-w-xs grid-cols-3 gap-2 rounded-xl bg-ink p-2 sm:max-w-sm">
            {stickers.map((color, i) => (
              <div key={i} className={`aspect-square rounded-md ${color}`} />
            ))}
          </div>
        </section>

        {/* Tools */}
        {sections.map((section) => (
          <section key={section.title} className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
            <h2 className="mb-5 border-b-2 border-ink pb-2 text-2xl font-bold">{section.title}</h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group block h-full overflow-hidden rounded-xl border-2 border-ink bg-white transition hover:-translate-y-1"
                  >
                    <div className={`${item.face} p-3`}>
                      <Image
                        src={item.img}
                        width={300}
                        height={300}
                        alt=""
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="aspect-square w-full rounded-md border-2 border-ink bg-white object-contain p-2"
                      />
                    </div>
                    <div className="border-t-2 border-ink p-4">
                      <p className="text-lg font-bold group-hover:underline">{item.label}</p>
                      <p className="mt-1 text-muted">{item.text}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      {/* Contact / About */}
      <footer className="mt-8 bg-ink px-4 py-12 text-paper sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="mb-3 text-xl font-bold">Contact us</h2>
            <p className="mb-4 text-paper/80">
              Have questions or suggestions? We’d love to hear from you.
            </p>
            <p className="text-paper/80">
              Email:{' '}
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sayyedmustaqim736@gmail.com,awwabsonday@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cube-yellow underline underline-offset-4"
              >
                support@cubeverse.com
              </Link>
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">About us</h2>
            <p className="leading-7 text-paper/80">
              Whether you’re learning your first algorithm or chasing your next
              personal best, CubeVerse is here to teach and connect you with the
              cubing community.
            </p>
          </div>

          <div className="flex items-center md:justify-end">
            <Image
              src="/random/logo.png"
              width={88}
              height={88}
              alt="CubeVerse logo"
              className="rounded-md"
            />
          </div>
        </div>
      </footer>
    </>
  )
}
