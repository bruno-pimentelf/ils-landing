"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * False glide path demonstrator. Pure HTML + CSS + Framer Motion.
 *
 * Single antenna anchor. All paths (3° true + 9° false + 15° false) are
 * rotated div lines that share the same origin point.
 */

const ANTENNA = { left: 5, top: 88 } // % from top-left
const ASPECT = 13 / 6 // container aspect-[13/6] (≈ 2.17:1)

// Endpoint of each path (visual exaggeration, labelled as the real angle)
const PATH_3_END = { left: 95, top: 75 }
const PATH_9_END = { left: 95, top: 32 }
const PATH_15_END = { left: 62, top: 4 }

// Compute rotated-div geometry for a path from ANTENNA to `end`
function pathGeometry(end: { left: number; top: number }) {
  const dxPct = end.left - ANTENNA.left
  const dyPct = end.top - ANTENNA.top
  // dyPct is negative when going up (top decreases)
  const dxRel = dxPct * ASPECT
  const dyRel = dyPct
  const angleDeg = Math.atan2(dyRel, dxRel) * (180 / Math.PI)
  // Length in % of container width: sqrt(dxPct² + (dyPct / ASPECT)²)
  const lenPct = Math.sqrt(dxPct * dxPct + (dyPct / ASPECT) * (dyPct / ASPECT))
  return { angleDeg, lenPct }
}

// Position along a path at parameter t (0 = antenna, 1 = endpoint)
function pointOnPath(end: { left: number; top: number }, t: number) {
  return {
    left: ANTENNA.left + t * (end.left - ANTENNA.left),
    top: ANTENNA.top + t * (end.top - ANTENNA.top),
  }
}

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

  // Aircraft animation:
  //   t=0   → upper-right (just inside the diagram, well above 9°)
  //   t=0.5 → captures the 9° false path
  //   t=1   → reached antenna along 9° path
  const captureT = 0.5
  const startPoint = { left: 90, top: 10 }
  const captureStart = pointOnPath(PATH_9_END, 0.85) // where it hits the 9° line
  // Pre-capture: linear from startPoint → captureStart
  // Post-capture: along 9° path from captureStart back toward antenna
  const ac = (() => {
    if (progress < captureT) {
      const t = progress / captureT
      return {
        left: startPoint.left + t * (captureStart.left - startPoint.left),
        top: startPoint.top + t * (captureStart.top - startPoint.top),
      }
    }
    // After capture, ride the 9° false path toward antenna
    const t = (progress - captureT) / (1 - captureT)
    const captureT_onPath = 0.85
    const targetT_onPath = 0.15 // close to antenna by the end
    const pathT = captureT_onPath + t * (targetT_onPath - captureT_onPath)
    return pointOnPath(PATH_9_END, pathT)
  })()

  const path3 = pathGeometry(PATH_3_END)
  const path9 = pathGeometry(PATH_9_END)
  const path15 = pathGeometry(PATH_15_END)

  // Label positions — sit along each path at a chosen fraction
  const label3 = pointOnPath(PATH_3_END, 0.92)
  const label9 = pointOnPath(PATH_9_END, 0.62)
  const label15 = pointOnPath(PATH_15_END, 0.70)

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
        {/* Diagram */}
        <div className="relative aspect-[13/6] bg-[linear-gradient(to_bottom,#0a0e14_0%,#0e131b_100%)] overflow-hidden">
          {/* Ground line */}
          <div
            className="absolute left-0 right-0 h-px bg-border"
            style={{ top: `${ANTENNA.top}%` }}
          />
          {/* Runway strip */}
          <div
            className="absolute bg-bg-subtle border-y border-border"
            style={{
              left: `${ANTENNA.left}%`,
              right: 0,
              top: `${ANTENNA.top - 1}%`,
              height: "2.5%",
            }}
          />

          {/* True 3° path — always visible, teal dashed */}
          <div
            className="absolute origin-left h-px"
            style={{
              left: `${ANTENNA.left}%`,
              top: `${ANTENNA.top}%`,
              width: `${path3.lenPct}%`,
              transform: `rotate(${path3.angleDeg}deg)`,
              transformOrigin: "left center",
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(93,202,165,0.85) 0 5px, transparent 5px 9px)",
              boxShadow: "0 0 6px rgba(93,202,165,0.35)",
            }}
          />
          <div
            className="absolute font-mono text-[9px] tracking-[0.12em] text-onpath font-semibold pointer-events-none"
            style={{
              left: `${label3.left}%`,
              top: `${label3.top}%`,
              transform: "translate(-100%, -130%)",
            }}
          >
            3° · TRUE PATH
          </div>

          {/* False 9° + 15° paths — toggled via AnimatePresence */}
          <AnimatePresence>
            {showFalse && (
              <>
                <motion.div
                  key="p9"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 0.85, scaleX: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute origin-left h-px"
                  style={{
                    left: `${ANTENNA.left}%`,
                    top: `${ANTENNA.top}%`,
                    width: `${path9.lenPct}%`,
                    transform: `rotate(${path9.angleDeg}deg)`,
                    transformOrigin: "left center",
                    backgroundImage:
                      "repeating-linear-gradient(to right, rgba(226,75,74,0.85) 0 4px, transparent 4px 7px)",
                  }}
                />
                <motion.div
                  key="l9"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute font-mono text-[9px] tracking-[0.12em] text-danger pointer-events-none"
                  style={{
                    left: `${label9.left}%`,
                    top: `${label9.top}%`,
                    transform: "translate(-50%, -150%)",
                  }}
                >
                  9° · FALSE PATH
                </motion.div>

                <motion.div
                  key="p15"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 0.55, scaleX: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="absolute origin-left h-px"
                  style={{
                    left: `${ANTENNA.left}%`,
                    top: `${ANTENNA.top}%`,
                    width: `${path15.lenPct}%`,
                    transform: `rotate(${path15.angleDeg}deg)`,
                    transformOrigin: "left center",
                    backgroundImage:
                      "repeating-linear-gradient(to right, rgba(226,75,74,0.7) 0 3px, transparent 3px 6px)",
                  }}
                />
                <motion.div
                  key="l15"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                  className="absolute font-mono text-[9px] tracking-[0.12em] text-danger pointer-events-none"
                  style={{
                    left: `${label15.left}%`,
                    top: `${label15.top}%`,
                    transform: "translate(-50%, -150%)",
                  }}
                >
                  15° · FALSE PATH
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* GS antenna — anchored at ANTENNA */}
          <div
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${ANTENNA.left}%`, top: `${ANTENNA.top}%` }}
          >
            <div className="relative h-10 w-px bg-gs mx-auto">
              <span className="absolute left-1/2 -translate-x-1/2 top-1 h-1 w-5 bg-gs rounded-sm" />
              <span className="absolute left-1/2 -translate-x-1/2 top-4 h-1 w-5 bg-gs rounded-sm" />
              <span className="absolute left-1/2 -translate-x-1/2 top-7 h-1 w-5 bg-gs rounded-sm" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-1 h-1.5 w-1.5 rounded-full bg-gs" />
            </div>
          </div>

          {/* Animated aircraft */}
          {playing && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${ac.left}%`, top: `${ac.top}%` }}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute h-8 w-8 rounded-full bg-danger/15">
                  <span className="block h-full w-full rounded-full bg-danger/15 animate-ping" />
                </span>
                <span className="relative text-[22px] leading-none text-danger" aria-hidden>
                  ✈
                </span>
              </div>
            </div>
          )}

          {/* "↘ INTERCEPT FROM ABOVE" annotation */}
          <div className="absolute top-3 left-4 font-mono text-[9px] tracking-[0.15em] uppercase text-text-tertiary pointer-events-none">
            ↘ INTERCEPT FROM ABOVE
          </div>
        </div>

        {/* Right column */}
        <div className="p-7 flex flex-col gap-5 bg-bg-subtle/40 border-t md:border-t-0 md:border-l border-border">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">
              The hazard
            </p>
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
            <p className="font-mono text-[10px] tracking-[0.2em] text-onpath uppercase mb-2">
              Procedure
            </p>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Always intercept the ILS from <em className="text-foreground not-italic">below</em>. Establish on the localizer level, then wait for the glide slope needle to rise up through center before beginning descent.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
