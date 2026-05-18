"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/**
 * Aircraft schematic with three antenna positions. HTML + CSS — fuselage,
 * wing, tail, and stabilizer are all positioned divs; antennas are small
 * pulsing badges; labels connect with CSS-only leader lines.
 */
export function Aircraft() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3, margin: "-50px" })

  // Antenna highlights — positions are percentages relative to the diagram
  const antennas = [
    {
      key: "gs",
      left: "8%",
      top: "55%",
      colorBg: "rgba(59,139,212,0.18)",
      colorDot: "var(--color-gs)",
      label: "GLIDE SLOPE",
      sub: "nose radome · 329–335 MHz",
      labelLeft: "12%",
      labelTop: "82%",
      labelColor: "text-gs",
    },
    {
      key: "loc",
      left: "78%",
      top: "20%",
      colorBg: "rgba(239,159,39,0.18)",
      colorDot: "var(--color-loc)",
      label: "LOCALIZER",
      sub: "vertical stab · 108–112 MHz",
      labelLeft: "60%",
      labelTop: "4%",
      labelColor: "text-loc",
    },
    {
      key: "marker",
      left: "40%",
      top: "70%",
      colorBg: "rgba(29,158,117,0.18)",
      colorDot: "var(--color-marker)",
      label: "MARKER BEACON",
      sub: "belly blade · 75 MHz",
      labelLeft: "44%",
      labelTop: "88%",
      labelColor: "text-onpath",
    },
  ]

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[20/7] bg-bg-base rounded-md overflow-hidden border border-border"
    >
      {/* Airframe — a wide rounded shape simulating fuselage */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="absolute left-[5%] right-[10%] top-1/2 -translate-y-1/2 bg-bg-subtle border border-border"
        style={{
          height: "30%",
          borderRadius: "100% / 50%",
          background: "linear-gradient(to bottom, #1a2029 0%, #131820 60%, #0e131b 100%)",
        }}
      >
        {/* Cockpit window strip — left tip */}
        <div
          className="absolute left-2 top-1/2 -translate-y-1/2 h-[35%] w-[6%] rounded-sm"
          style={{
            background: "rgba(59,139,212,0.18)",
            border: "1px solid rgba(42,52,65,1)",
          }}
        />
        {/* Passenger window strip — small dots */}
        <div className="absolute left-[12%] right-[18%] top-[36%] flex justify-between">
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i} className="block h-[3px] w-[3px] rounded-full bg-border" />
          ))}
        </div>
      </motion.div>

      {/* Vertical stabilizer (tail fin) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute right-[10%] top-[28%] bg-bg-subtle border border-border"
        style={{
          width: "10%",
          height: "26%",
          clipPath: "polygon(0% 100%, 50% 0%, 100% 0%, 100% 100%)",
          background: "linear-gradient(to bottom, #1a2029, #0e131b)",
        }}
      />

      {/* Horizontal stabilizer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute right-[6%] top-[44%] bg-bg-subtle border border-border"
        style={{
          width: "14%",
          height: "6%",
          clipPath: "polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%)",
          background: "linear-gradient(to bottom, #1a2029, #0e131b)",
        }}
      />

      {/* Wing — slanted, below fuselage center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="absolute left-[34%] top-[62%] bg-bg-subtle border border-border"
        style={{
          width: "22%",
          height: "14%",
          clipPath: "polygon(0% 0%, 50% 100%, 100% 100%, 70% 0%)",
          background: "linear-gradient(to bottom, #1a2029, #0e131b)",
        }}
      />

      {/* Engine nacelle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="absolute left-[40%] top-[74%] rounded-full bg-bg-base border border-border flex items-center justify-start pl-1"
        style={{ width: "12%", height: "8%" }}
      >
        <span className="block h-[60%] aspect-square rounded-full bg-gs/25" />
      </motion.div>

      {/* Antenna highlights */}
      {antennas.map((a, i) => (
        <motion.div
          key={a.key}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 + i * 0.18, type: "spring", stiffness: 320, damping: 22 }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: a.left, top: a.top }}
        >
          {/* halo */}
          <span
            className="absolute inset-0 -m-3 rounded-full"
            style={{ background: a.colorBg }}
          />
          {/* core dot */}
          <span
            className="relative block h-3 w-3 rounded-full"
            style={{ background: a.colorDot }}
          />
          {/* pulsing ring */}
          <motion.span
            className="absolute inset-0 -m-1 rounded-full"
            style={{ border: `1px solid ${a.colorDot}` }}
            animate={inView ? { scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] } : {}}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.0 + i * 0.4 }}
          />
        </motion.div>
      ))}

      {/* Labels with simple leader-line indicators */}
      {antennas.map((a, i) => (
        <motion.div
          key={`${a.key}-label`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
          className="absolute"
          style={{ left: a.labelLeft, top: a.labelTop }}
        >
          <div className={`font-mono text-[10px] tracking-[0.15em] font-semibold ${a.labelColor}`}>
            {a.label}
          </div>
          <div className="font-mono text-[9px] text-text-tertiary mt-0.5">{a.sub}</div>
        </motion.div>
      ))}
    </div>
  )
}
