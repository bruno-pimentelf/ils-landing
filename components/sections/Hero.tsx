"use client"

import { motion } from "framer-motion"
import { HeroBeams } from "@/components/diagrams/HeroBeams"

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      {/* Ambient runway + beams */}
      <div className="absolute inset-0">
        <HeroBeams />
      </div>

      {/* Bottom dissolve into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-bg-base via-bg-base/70 to-transparent" />

      {/* Top dim for navbar legibility (if added later) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-bg-base/80 via-bg-base/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-tertiary"
        >
          ILS · A LONG-FORM EXPLAINER
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
          className="mt-8 max-w-[18ch] text-[clamp(2.4rem,6.4vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-foreground"
        >
          Instrument
          <br />
          Landing System
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="mt-8 max-w-[42ch] text-[17px] leading-relaxed text-text-secondary"
        >
          How two radio beams, an antenna array, and a subtraction make
          zero-visibility landings possible.
        </motion.p>

        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: [0.32, 0.72, 0, 1] }}
          className="group mt-16 inline-flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-text-tertiary hover:text-foreground transition-colors"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block h-6 w-px bg-border"
          />
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="opacity-60 group-hover:opacity-100">
            <path d="M 1 1 L 7 7 L 13 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </motion.button>
      </div>

      {/* Side rails — sentence-case label per design system */}
      <div className="pointer-events-none absolute inset-y-12 left-6 hidden md:flex flex-col items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-text-tertiary [writing-mode:vertical-rl]">
          Built with Claude Code
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-text-tertiary [writing-mode:vertical-rl]">
          MMXXVI
        </span>
      </div>
      <div className="pointer-events-none absolute inset-y-12 right-6 hidden md:flex flex-col items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-text-tertiary [writing-mode:vertical-rl] rotate-180">
          ICAO Annex 10
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-text-tertiary [writing-mode:vertical-rl] rotate-180">
          Edition 001
        </span>
      </div>
    </section>
  )
}
