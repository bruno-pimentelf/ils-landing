"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type CategoryKey = "I" | "II" | "IIIa" | "IIIb" | "IIIc"

const categories: Array<{
  key: CategoryKey
  label: string
  dh: string
  rvr: string
  fog: number // 0..1, density
  useCase: string
}> = [
  { key: "I", label: "CAT I", dh: "200 ft (60 m)", rvr: "550 m", fog: 0.15, useCase: "Standard airline operations" },
  { key: "II", label: "CAT II", dh: "100 ft (30 m)", rvr: "300 m", fog: 0.4, useCase: "Autoland capable" },
  { key: "IIIa", label: "CAT IIIa", dh: "50 ft (15 m)", rvr: "200 m", fog: 0.6, useCase: "Fail-passive autoland" },
  { key: "IIIb", label: "CAT IIIb", dh: "50 ft or less", rvr: "50–200 m", fog: 0.78, useCase: "Fail-operational autoland" },
  { key: "IIIc", label: "CAT IIIc", dh: "0 ft", rvr: "0 m", fog: 0.96, useCase: "Zero-zero — fully blind landing" },
]

export function CategoriesViewer() {
  const [active, setActive] = useState<CategoryKey>("I")
  const cat = categories.find((c) => c.key === active)!

  // Decision height marker — y-position in the approach diagram
  // Higher DH = higher marker; lower DH = lower marker
  const dhTop = 40 + (1 - (cat.fog === 0.96 ? 1 : cat.fog)) * 130

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex border-b border-border overflow-x-auto">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActive(c.key)}
            className={`flex-1 min-w-[110px] px-5 py-4 font-mono text-[11px] tracking-[0.15em] uppercase border-r border-border last:border-r-0 transition-colors relative ${
              active === c.key
                ? "bg-bg-subtle text-loc"
                : "text-muted-foreground hover:text-foreground hover:bg-bg-subtle/40"
            }`}
          >
            {c.label}
            {active === c.key && (
              <motion.div
                layoutId="cat-underline"
                className="absolute bottom-0 left-0 right-0 h-px bg-loc"
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
        <div className="relative bg-[linear-gradient(to_bottom,#0a0e14_0%,#0e131b_100%)] p-6 min-h-[280px]">
          <svg viewBox="0 0 520 240" className="w-full h-auto">
            {/* Distant approach scene — sky + runway */}
            <rect x="0" y="0" width="520" height="240" fill="#0a0e14" />

            {/* Far runway in perspective */}
            <path d="M 220 200 L 300 200 L 360 230 L 160 230 Z" fill="#1a2029" stroke="#2a3441" strokeWidth="0.6" />
            {/* Centerline */}
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={i} x={258 - i * 1.5} y={205 + i * 4} width={4 + i * 0.6} height={2} fill="#6b7785" opacity="0.6" />
            ))}
            {/* Runway lights */}
            {[218, 230, 240, 250, 260, 270, 280, 290, 302].map((x, i) => (
              <circle key={i} cx={x} cy={Number((200 - i * 0.3).toFixed(2))} r="0.8" fill="#5dcaa5" opacity={Number((0.7 - i * 0.05).toFixed(2))} />
            ))}

            {/* Fog overlay — density tied to category */}
            <AnimatePresence mode="wait">
              <motion.rect
                key={cat.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                x="0"
                y="0"
                width="520"
                height="240"
                fill={`rgba(232, 236, 241, ${cat.fog * 0.7})`}
              />
            </AnimatePresence>

            {/* Decision-height bar */}
            <AnimatePresence mode="wait">
              <motion.g
                key={`dh-${cat.key}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
              >
                <line x1="20" x2="500" y1={dhTop} y2={dhTop} stroke="#ef9f27" strokeWidth="1" strokeDasharray="4 4" />
                <rect x="20" y={dhTop - 12} width="56" height="14" fill="#0a0e14" stroke="#ef9f27" strokeWidth="0.8" />
                <text x="48" y={dhTop - 2} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="#ef9f27" letterSpacing="0.1em">
                  DH
                </text>
              </motion.g>
            </AnimatePresence>

            {/* RVR readout */}
            <g>
              <rect x="430" y="14" width="80" height="22" fill="#0a0e14" stroke="#2a3441" />
              <text x="438" y="29" fontSize="9" fontFamily="var(--font-mono)" fill="#6b7785" letterSpacing="0.1em">RVR</text>
              <AnimatePresence mode="wait">
                <motion.text
                  key={`rvr-${cat.key}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  x="504"
                  y="29"
                  textAnchor="end"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fill="#e8ecf1"
                >
                  {cat.rvr}
                </motion.text>
              </AnimatePresence>
            </g>
          </svg>
        </div>

        <div className="p-7 flex flex-col gap-5 bg-bg-subtle/40 border-t md:border-t-0 md:border-l border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-2">Category</p>
              <h4 className="text-3xl font-semibold tracking-tight text-foreground mb-5">{cat.label}</h4>
              <div className="space-y-4">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Decision height</div>
                  <div className="font-mono text-[17px] tabular-nums text-foreground">{cat.dh}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Runway visual range</div>
                  <div className="font-mono text-[17px] tabular-nums text-foreground">{cat.rvr}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Use case</div>
                  <div className="text-[14px] leading-relaxed text-foreground/85">{cat.useCase}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
