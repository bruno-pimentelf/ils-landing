"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * False glide path demonstrator. Toggle reveals the 9° and 15° ghost paths
 * that satisfy the same DDM condition. Animation plays an aircraft
 * intercepting from above and being captured by the 9° false path.
 */
export function FalsePath() {
  const [showFalse, setShowFalse] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Animate "intercept from above" capture
  useEffect(() => {
    if (!playing) return
    let raf: number
    const start = performance.now()
    const duration = 4000
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(t)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setPlaying(false)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  // Aircraft path: starts top-left (above 9°), descends, gets captured by 9°.
  // Pre-computed visual slopes (rounded so SSR matches client).
  const tan3 = 0.157  // tan(3°) * 3 visual
  const tan9 = 0.475  // tan(9°) * 3 visual
  const tan15 = 0.804 // tan(15°) * 3 visual
  const r2 = (n: number) => Number(n.toFixed(2))
  const acX = r2(460 - progress * 360)
  const falseY = r2(240 - (460 - acX) * tan9 / 3 * 3) // captures on 9°
  // Aircraft starts above 9°, then captures
  const captureT = 0.42
  const acY =
    progress < captureT
      ? r2(40 + progress * 80) // descending freely
      : falseY // captured by false path

  const true3Y2 = r2(240 - 450 * tan3)
  const false9Y2 = r2(240 - 450 * tan9)
  const false9LabelY = r2(240 - 320 * tan9 - 8)
  const false15Y2 = r2(240 - 320 * tan15)
  const false15LabelY = r2(240 - 240 * tan15 - 8)

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
        <div className="relative bg-[linear-gradient(to_bottom,#0a0e14_0%,#0e131b_100%)] p-6">
          <svg viewBox="0 0 520 280" className="w-full h-auto">
            {/* Ground */}
            <line x1="0" y1="240" x2="520" y2="240" stroke="#2a3441" strokeWidth="0.8" />
            <rect x="60" y="240" width="450" height="3" fill="#1a2029" stroke="#2a3441" />

            {/* GS antenna */}
            <rect x="60" y="200" width="2.5" height="40" fill="#3b8bd4" opacity="0.85" />

            {/* True 3° path */}
            <line
              x1="60"
              y1="240"
              x2="510"
              y2={true3Y2}
              stroke="#5dcaa5"
              strokeWidth="1.6"
              strokeDasharray="4 3"
            />
            <text x="495" y="232" fontSize="9" fontFamily="var(--font-mono)" fill="#5dcaa5" textAnchor="end" letterSpacing="0.1em">3° · TRUE PATH</text>

            <AnimatePresence>
              {showFalse && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* 9° false path */}
                  <line
                    x1="60"
                    y1="240"
                    x2="510"
                    y2={false9Y2}
                    stroke="#e24b4a"
                    strokeWidth="1.4"
                    strokeDasharray="2 3"
                    opacity="0.7"
                  />
                  <text x="380" y={false9LabelY} fontSize="9" fontFamily="var(--font-mono)" fill="#e24b4a" letterSpacing="0.1em">
                    9° · FALSE PATH
                  </text>

                  {/* 15° false path */}
                  <line
                    x1="60"
                    y1="240"
                    x2="380"
                    y2={false15Y2}
                    stroke="#e24b4a"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    opacity="0.45"
                  />
                  <text x="300" y={false15LabelY} fontSize="9" fontFamily="var(--font-mono)" fill="#e24b4a" opacity="0.55" letterSpacing="0.1em">
                    15° · FALSE PATH
                  </text>
                </motion.g>
              )}
            </AnimatePresence>

            {/* Animated aircraft */}
            {playing && (
              <g transform={`translate(${acX}, ${acY})`}>
                <circle r="13" fill="#e24b4a" fillOpacity="0.15">
                  <animate attributeName="r" values="13;18;13" dur="0.8s" repeatCount="indefinite" />
                </circle>
                <path d="M -16 0 L 4 -2 L 4 -3 L 12 -3 L 12 3 L 4 3 L 4 2 L -16 0 Z" fill="#e24b4a" />
                <path d="M -4 -8 L 2 0 L -4 8 Z" fill="#e24b4a" />
              </g>
            )}

            {/* Decision-height annotation */}
            <text x="14" y="20" fontSize="9" fontFamily="var(--font-mono)" fill="#6b7785" letterSpacing="0.1em">↘ INTERCEPT FROM ABOVE</text>
          </svg>
        </div>

        <div className="p-7 flex flex-col gap-5 bg-bg-subtle/40 border-t md:border-t-0 md:border-l border-border">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">The hazard</p>
            <p className="text-[14px] leading-relaxed text-foreground/85">
              The DDM = 0 condition repeats at multiples of the true angle. An aircraft intercepting from very high altitude can lock onto the 9° "path" — a descent so steep it is unrecoverable.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setShowFalse((s) => !s)}
              className="font-mono text-[11px] tracking-[0.15em] uppercase border border-border rounded-sm py-2.5 hover:border-danger hover:text-danger transition-colors"
            >
              {showFalse ? "Hide false paths" : "Reveal false paths"}
            </button>
            <button
              type="button"
              onClick={() => {
                setProgress(0)
                setPlaying(true)
                setShowFalse(true)
              }}
              disabled={playing}
              className="font-mono text-[11px] tracking-[0.15em] uppercase border border-border rounded-sm py-2.5 hover:border-loc hover:text-loc transition-colors disabled:opacity-50"
            >
              {playing ? "Capturing…" : "Replay capture animation"}
            </button>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="font-mono text-[10px] tracking-[0.2em] text-onpath uppercase mb-2">Procedure</p>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Always intercept the ILS from <em className="text-foreground not-italic">below</em>. Establish on the localizer level, then wait for the glide slope needle to rise up through center before beginning descent.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
