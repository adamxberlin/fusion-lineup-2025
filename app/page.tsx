'use client'

import FestivalLineupTable from '../festival-lineup-table'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12">
      <h1 className="text-4xl font-bold mb-6 text-red-500">Fusion 2025 🚀</h1>
      <a
        href="https://fusion-festival.de/en/program"
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-400 hover:text-red-300 mb-6 text-sm"
      >
        View full lineup →
      </a>
      <FestivalLineupTable />
    </main>
  )
}
