"use client"

import { motion } from "framer-motion"

/**
 * Ambient hero backdrop — runway in perspective + two breathing beam fans.
 * Pure HTML + CSS gradients + clip-path + Framer Motion (no SVG).
 */
export function HeroBeams() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Radial horizon glow — soft blue near the vanishing point */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 48%, rgba(59,139,212,0.06) 0%, rgba(10,14,20,0) 70%)",
        }}
      />

      {/* Runway in perspective — trapezoid via clip-path */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.32, 0.72, 0, 1] }}
        className="absolute left-1/2 -translate-x-1/2 bottom-0"
        style={{
          width: "55%",
          height: "55%",
          clipPath: "polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%)",
          background:
            "linear-gradient(to bottom, rgba(42,52,65,0) 0%, rgba(42,52,65,0.45) 100%)",
        }}
      >
        {/* Centerline dashes — scale up as they get closer */}
        <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 pb-6">
          {Array.from({ length: 8 }).map((_, i) => {
            const t = i / 7
            const w = 4 + t * 22
            const h = 8 + t * 26
            const opacity = 0.35 + t * 0.4
            return (
              <span
                key={i}
                className="block bg-text-tertiary rounded-sm"
                style={{ width: `${w}px`, height: `${h}px`, opacity }}
              />
            )
          })}
        </div>
      </motion.div>

      {/* Localizer fan — amber, breathing pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.55, 0.9] }}
        transition={{
          duration: 6,
          times: [0, 0.25, 0.6, 1],
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "120%",
          height: "70%",
          clipPath: "polygon(48% 50%, 52% 50%, 100% 0%, 100% 100%)",
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(239,159,39,0.18) 0%, rgba(239,159,39,0) 75%)",
        }}
      />

      {/* Glide-slope fan — blue, breathing pulse on opposite side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.45, 0.7] }}
        transition={{
          duration: 6,
          times: [0, 0.25, 0.6, 1],
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "120%",
          height: "70%",
          clipPath: "polygon(48% 50%, 52% 50%, 0% 0%, 0% 100%)",
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(59,139,212,0.18) 0%, rgba(59,139,212,0) 75%)",
        }}
      />

      {/* Faint stars — twinkle */}
      {[
        { left: "12%", top: "10%", delay: 0 },
        { left: "22%", top: "18%", delay: 0.6 },
        { left: "38%", top: "8%", delay: 1.2 },
        { left: "68%", top: "12%", delay: 1.8 },
        { left: "84%", top: "10%", delay: 0.3 },
        { left: "94%", top: "20%", delay: 1.5 },
        { left: "6%", top: "28%", delay: 0.9 },
        { left: "96%", top: "34%", delay: 2.1 },
      ].map((s, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          className="absolute h-[2px] w-[2px] rounded-full bg-text-secondary"
          style={{ left: s.left, top: s.top }}
        />
      ))}
    </div>
  )
}
