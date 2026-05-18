"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/**
 * Side profile — pure HTML + CSS + Framer Motion.
 *
 * Single source of truth: ONE antenna anchor point + ONE path. Everything
 * else (lobes, distance markers, aircraft positions) is derived from those
 * two values so the geometry always agrees.
 *
 *   ▏╲                                                   ── 90 Hz lobe
 *   ▏ ╲   ✈ fly down  ↘
 *   ▏  ╲   ✈ on path  ──╲                         ── path
 *   ▏   ✈ fly up  ──╲    ╲                        ╪╪═══ GS antenna
 *   ▏              ──╲    ╲                       ▦▦▦▦▦ runway →
 *   ▏              ── 150 Hz lobe
 */

// Geometry constants — change these and everything moves together.
const ANTENNA = { left: 90, top: 84 }        // % from top-left of container
const PATH_START = { left: 10, top: 20 }     // % — far upper-left end of the path
const GROUND_Y = 88                          // % — runway/ground level
const ABOVE_LIMIT_Y = 4                       // % — top edge of 90 Hz lobe at the far end

// Point along the path at parameter t (0 = far end / 4 NM out, 1 = antenna).
function pointOnPath(t: number) {
  return {
    left: PATH_START.left + t * (ANTENNA.left - PATH_START.left),
    top: PATH_START.top + t * (ANTENNA.top - PATH_START.top),
  }
}

// Line length and angle (so the dashed path line can be a plain rotated div).
// Container has aspect-[16/8], so width_px = 2 × height_px. The CSS rotation
// works in pixel space, so we have to convert percentage deltas to pixel ratio.
const PATH_DX_PCT = ANTENNA.left - PATH_START.left      // 80%
const PATH_DY_PCT = ANTENNA.top - PATH_START.top        // 64%
// In aspect 16:8 (2:1): 1% W ↔ 2% of "H-px-units". So in pixels, dx is 2× the
// percentage figure (relative to H), dy is 1×.
const PATH_DX_REL = PATH_DX_PCT * 2                     // 160 (H-units)
const PATH_DY_REL = PATH_DY_PCT * 1                     // 64
const PATH_ANGLE_DEG = Math.atan2(PATH_DY_REL, PATH_DX_REL) * (180 / Math.PI)  // ≈ 21.8°
// Length in % of container width: sqrt((Δx_W)² + (Δy_H × 0.5)²)
const PATH_LEN_PCT = Math.sqrt(PATH_DX_PCT ** 2 + (PATH_DY_PCT * 0.5) ** 2)    // ≈ 86%

export function SideProfile() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25, margin: "-50px" })

  // Distance markers at fractions along the path (close-to-far from antenna)
  const markers = [0.85, 0.65, 0.45, 0.25].map((t, i) => ({
    ...pointOnPath(t),
    label: `${i + 1} NM`,
  }))

  // Three aircraft positions. Each picks a point ALONG the path and offsets
  // it perpendicular (in screen y) to show "above" / "on" / "below".
  const onPathT = 0.5
  const aboveT = 0.25
  const belowT = 0.75
  const aboveOff = -16  // % top (negative = higher in screen = above path)
  const belowOff = 10   // % top (positive = lower in screen = below path)

  const aircraft = [
    {
      key: "above",
      ...pointOnPath(aboveT),
      topOffset: aboveOff,
      label: "fly down",
      sub: "more 90 Hz",
      color: "text-gs",
      needleColor: "bg-gs",
    },
    {
      key: "on",
      ...pointOnPath(onPathT),
      topOffset: 0,
      label: "on path",
      sub: "DDM = 0",
      color: "text-onpath",
      needleColor: "bg-onpath",
    },
    {
      key: "below",
      ...pointOnPath(belowT),
      topOffset: belowOff,
      label: "fly up",
      sub: "more 150 Hz",
      color: "text-loc",
      needleColor: "bg-loc",
    },
  ]

  // Clip-path polygons — vertices use the SAME antenna + path-start coords,
  // so the lobes always converge on the antenna no matter how the container
  // is resized.
  const upperLobeClip = `polygon(${ANTENNA.left}% ${ANTENNA.top}%, ${PATH_START.left}% ${PATH_START.top}%, ${PATH_START.left}% ${ABOVE_LIMIT_Y}%)`
  const lowerLobeClip = `polygon(${ANTENNA.left}% ${ANTENNA.top}%, ${PATH_START.left}% ${PATH_START.top}%, ${PATH_START.left}% ${GROUND_Y}%)`

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/8] bg-bg-base rounded-md overflow-hidden border border-border"
    >
      {/* "↘ APPROACH" annotation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-4 left-5 z-20"
      >
        <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary">
          ↘ APPROACH
        </div>
        <div className="font-mono text-[9px] text-text-tertiary/65 mt-0.5">
          aircraft descending toward threshold
        </div>
      </motion.div>

      {/* 90 Hz upper lobe — clip-path fans from antenna up to top edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute inset-0"
        style={{
          clipPath: upperLobeClip,
          background:
            "radial-gradient(circle at 90% 84%, rgba(59,139,212,0.32) 0%, rgba(59,139,212,0.12) 50%, rgba(59,139,212,0) 100%)",
        }}
      />

      {/* 150 Hz lower lobe — clip-path fans from antenna down to ground edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.55 }}
        className="absolute inset-0"
        style={{
          clipPath: lowerLobeClip,
          background:
            "radial-gradient(circle at 90% 84%, rgba(239,159,39,0.28) 0%, rgba(239,159,39,0.10) 50%, rgba(239,159,39,0) 100%)",
        }}
      />

      {/* Ground line */}
      <div
        className="absolute left-0 right-0 h-px bg-border"
        style={{ top: `${GROUND_Y}%` }}
      />

      {/* Runway strip — behind antenna, extending right past the edge */}
      <div
        className="absolute bg-bg-subtle border-y border-border"
        style={{
          left: `${ANTENNA.left}%`,
          right: 0,
          top: `${GROUND_Y - 1}%`,
          height: "3%",
        }}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(155,168,184,0.55) 0 14px, transparent 14px 22px)",
          }}
        />
      </div>

      {/* Glide path — dashed line, rotated div anchored at antenna */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="absolute origin-right h-px"
        style={{
          left: `${ANTENNA.left - PATH_LEN_PCT}%`,
          top: `${ANTENNA.top}%`,
          width: `${PATH_LEN_PCT}%`,
          transform: `rotate(${-PATH_ANGLE_DEG}deg)`,
          transformOrigin: "right center",
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(93,202,165,0.85) 0 5px, transparent 5px 9px)",
          boxShadow: "0 0 6px rgba(93,202,165,0.45)",
        }}
      />

      {/* GS antenna — anchored EXACTLY at ANTENNA point */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute -translate-x-1/2 -translate-y-full"
        style={{ left: `${ANTENNA.left}%`, top: `${ANTENNA.top}%` }}
      >
        {/* Mast */}
        <div className="relative h-12 w-px bg-gs mx-auto">
          {/* 3 dipoles (capture-effect M-array) */}
          <span className="absolute left-1/2 -translate-x-1/2 top-1 h-1 w-6 bg-gs rounded-sm" />
          <span className="absolute left-1/2 -translate-x-1/2 top-4 h-1 w-6 bg-gs rounded-sm" />
          <span className="absolute left-1/2 -translate-x-1/2 top-7 h-1 w-6 bg-gs rounded-sm" />
          {/* Top ball + pulse */}
          <span className="absolute left-1/2 -translate-x-1/2 -top-1 h-2 w-2 rounded-full bg-gs" />
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 -top-1 h-2 w-2 rounded-full border border-gs"
            animate={inView ? { scale: [1, 2.6, 1], opacity: [0.8, 0, 0.8] } : {}}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
          />
        </div>
      </motion.div>

      {/* GS antenna label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.7 }}
        className="absolute text-right -translate-x-full"
        style={{ left: `${ANTENNA.left - 2}%`, top: `${ANTENNA.top - 22}%` }}
      >
        <div className="font-mono text-[9px] tracking-[0.15em] text-gs font-semibold">
          GS ANTENNA
        </div>
      </motion.div>

      {/* "RUNWAY →" label below threshold */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.7 } : {}}
        transition={{ duration: 0.5, delay: 1.7 }}
        className="absolute font-mono text-[9px] tracking-[0.15em] uppercase text-text-tertiary"
        style={{ left: `${ANTENNA.left + 2}%`, top: `${GROUND_Y + 4}%` }}
      >
        Runway →
      </motion.div>

      {/* 3° angle annotation — sits just above the antenna near the path */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="absolute flex items-center gap-1 -translate-x-full"
        style={{ left: `${ANTENNA.left - 4}%`, top: `${ANTENNA.top - 6}%` }}
      >
        <span className="font-mono text-[11px] text-onpath font-semibold">3°</span>
        <span className="font-mono text-[8px] text-text-tertiary/65">(stylized)</span>
      </motion.div>

      {/* Distance markers along the path */}
      {markers.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: 1.4 + i * 0.08,
            type: "spring",
            stiffness: 260,
            damping: 22,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
          style={{ left: `${m.left}%`, top: `${m.top}%` }}
        >
          <span className="font-mono text-[9px] tracking-[0.05em] text-onpath/85">
            {m.label}
          </span>
          <span className="block mt-1 h-1.5 w-1.5 rounded-full bg-onpath/80 ring-1 ring-bg-base" />
        </motion.div>
      ))}

      {/* Lobe labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.9 }}
        className="absolute"
        style={{ left: `${PATH_START.left + 5}%`, top: `${ABOVE_LIMIT_Y + 4}%` }}
      >
        <div className="font-mono text-[10px] tracking-[0.12em] text-gs font-semibold">
          90 Hz
        </div>
        <div className="font-mono text-[9px] text-gs/70">upper lobe</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute"
        style={{ left: `${PATH_START.left + 5}%`, top: `${GROUND_Y - 8}%` }}
      >
        <div className="font-mono text-[10px] tracking-[0.12em] text-loc font-semibold">
          150 Hz
        </div>
        <div className="font-mono text-[9px] text-loc/70">lower lobe</div>
      </motion.div>

      {/* Three aircraft positions */}
      {aircraft.map((ac, i) => (
        <motion.div
          key={ac.key}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.55,
            delay: 1.55 + i * 0.18,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${ac.left}%`,
            top: `${ac.top + ac.topOffset}%`,
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Mini CDI badge above the aircraft */}
            <div className="rounded-[3px] border border-border bg-bg-base/95 px-1.5 py-1 mb-1.5">
              <div className="grid grid-cols-5 gap-[2px] items-center w-9">
                {[0, 1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className={`block h-[3px] rounded-sm ${ac.needleColor}`}
                  />
                ))}
              </div>
            </div>
            {/* Aircraft glyph */}
            <span className={`text-[20px] leading-none ${ac.color}`} aria-hidden>
              ✈
            </span>
            {/* Label below */}
            <div className="mt-1 text-center">
              <div
                className={`font-mono text-[9px] tracking-[0.12em] uppercase font-semibold ${ac.color}`}
              >
                {ac.label}
              </div>
              <div className="font-mono text-[8.5px] text-text-tertiary mt-0.5">
                {ac.sub}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
