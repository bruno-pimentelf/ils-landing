"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/**
 * Top-down airport diagram — pure HTML + Tailwind + Framer Motion.
 *
 * Layout (left-to-right):
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ ✈                                              ╔═══════════╗ │
 *   │   ←── localizer beam fan (amber) ──            ║  09 │ 27  ║ ║─ LOC array (right)
 *   │                                                ╚═══════════╝ │
 *   │  GS ─── glide-slope fan (blue) ───                            │
 *   └──────────────────────────────────────────────────────────────┘
 */
export function TopDownView() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3, margin: "-50px" })

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/7] bg-bg-base rounded-md overflow-hidden border border-border"
    >
      {/* Compass rose, top-left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 0.55, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className="absolute top-5 left-5 h-10 w-10 rounded-full border border-border flex items-center justify-center"
      >
        <span className="absolute -top-3 text-[8px] font-mono text-text-tertiary">N</span>
        <span className="absolute -right-3 text-[8px] font-mono text-text-tertiary">E</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="h-full w-px bg-border" />
          <span className="absolute w-full h-px bg-border" />
        </div>
      </motion.div>

      {/* "APPROACH ←" label far left */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="absolute left-[6%] top-1/2 -translate-y-[180%] font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary"
      >
        ↘ APPROACH
      </motion.div>

      {/* Localizer beam fan — amber gradient triangle from right antenna toward left */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="absolute top-1/2 right-[8%] origin-right"
        style={{
          width: "70%",
          height: "60%",
          transform: "translateY(-50%)",
          clipPath: "polygon(100% 50%, 0% 0%, 0% 100%)",
          background:
            "linear-gradient(to left, rgba(239,159,39,0.0) 0%, rgba(239,159,39,0.22) 50%, rgba(239,159,39,0) 100%)",
          transformOrigin: "right center",
        }}
      />

      {/* Centerline dashed line — extends from LOC antenna along runway out to aircraft */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 0.5, scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute top-1/2 left-[8%] right-[8%] h-px origin-right"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(239,159,39,0.55) 0 4px, transparent 4px 10px)",
        }}
      />

      {/* Glide-slope fan — blue, narrower, from GS antenna toward approaching
          aircraft on the LEFT. Apex at the antenna (right edge of this box),
          fans out to the left. */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 1.0, ease: [0.32, 0.72, 0, 1] }}
        className="absolute origin-right"
        style={{
          left: "5%",
          right: "78%",
          top: "30%",
          height: "20%",
          clipPath: "polygon(100% 50%, 0% 0%, 0% 100%)",
          background:
            "linear-gradient(to left, rgba(59,139,212,0.25) 0%, rgba(59,139,212,0) 100%)",
        }}
      />

      {/* Runway strip — horizontal grey bar in the middle */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.9 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="absolute left-[24%] right-[8%] top-1/2 h-[8%] -translate-y-1/2 bg-bg-subtle border border-border"
      >
        {/* Threshold stripes — left side */}
        <div className="absolute left-1 top-1 bottom-1 w-3 flex flex-col justify-between gap-px">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="block h-[3px] bg-text-tertiary/55" />
          ))}
        </div>
        {/* Threshold stripes — right side */}
        <div className="absolute right-1 top-1 bottom-1 w-3 flex flex-col justify-between gap-px">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="block h-[3px] bg-text-tertiary/55" />
          ))}
        </div>
        {/* Runway designators — aircraft approaches from the west (left), so
            it crosses the RWY 09 threshold first. "09" goes on the left,
            "27" on the right end. */}
        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-mono text-[11px] font-semibold text-text-tertiary">
          09
        </span>
        <span className="absolute right-5 top-1/2 -translate-y-1/2 font-mono text-[11px] font-semibold text-text-tertiary">
          27
        </span>
        {/* Centerline dashes — inside the runway */}
        <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-px bg-text-tertiary/55"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(155,168,184,0.55) 0 14px, transparent 14px 22px)",
            backgroundColor: "transparent",
          }}
        />
      </motion.div>

      {/* Runway label below */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.7 } : {}}
        transition={{ duration: 0.5, delay: 1.8 }}
        className="absolute left-1/2 top-[63%] -translate-x-1/2 font-mono text-[9px] tracking-[0.2em] uppercase text-text-tertiary"
      >
        Runway 09/27 · ≈ 3000 m
      </motion.span>

      {/* Localizer antenna — at right end of runway */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className="absolute right-[7%] top-1/2 -translate-y-1/2 h-[28%] w-1 flex flex-col justify-between"
      >
        {/* 9 dipoles in a vertical array */}
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="block h-[6px] w-2 bg-loc rounded-sm -translate-x-[3px]"
          />
        ))}
        {/* Pulse */}
        <motion.span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full border border-loc"
          animate={inView ? { scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
        />
      </motion.div>

      {/* Glide-slope antenna — offset above the left end of the runway */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute left-[22%] top-[36%] flex flex-col items-center gap-[3px]"
      >
        <span className="block h-1 w-6 bg-gs rounded-sm" />
        <span className="block h-1 w-6 bg-gs rounded-sm" />
        <span className="block h-1 w-6 bg-gs rounded-sm" />
        <span className="block h-3 w-px bg-gs" />
        <motion.span
          className="absolute left-1/2 top-0 -translate-x-1/2 h-2 w-2 rounded-full bg-gs"
          animate={inView ? { scale: [1, 1.8, 1], opacity: [1, 0.4, 1] } : {}}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        />
      </motion.div>

      {/* Aircraft icon — left side, on centerline */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute left-[8%] top-1/2 -translate-y-1/2 text-foreground text-[20px] leading-none"
        style={{ transform: "translateY(-50%) rotate(90deg)" }}
      >
        ✈
      </motion.div>

      {/* LOC label, top-right with leader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute right-[6%] top-[14%] text-right"
      >
        <div className="font-mono text-[10px] tracking-[0.15em] text-loc font-semibold">
          LOCALIZER
        </div>
        <div className="font-mono text-[9px] text-text-tertiary mt-0.5">
          far end · 108–112 MHz
        </div>
      </motion.div>

      {/* GS label, top-left with leader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute left-[22%] top-[16%]"
      >
        <div className="font-mono text-[10px] tracking-[0.15em] text-gs font-semibold">
          GLIDE SLOPE
        </div>
        <div className="font-mono text-[9px] text-text-tertiary mt-0.5">
          ~120 m offset · 329–335 MHz
        </div>
      </motion.div>

      {/* Course-width annotation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.65 } : {}}
        transition={{ duration: 0.5, delay: 1.7 }}
        className="absolute top-[20%] left-[44%] font-mono text-[9px] tracking-[0.12em] uppercase text-loc"
      >
        ± 2.5° course width
      </motion.div>
    </div>
  )
}
