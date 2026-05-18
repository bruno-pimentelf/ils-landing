"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/**
 * Side profile of the glide slope — HTML + Tailwind + Framer Motion only.
 *
 *   90 Hz lobe (above, blue)
 *           ╲
 *  ✈ "fly down"  ╲
 *           ✈ "on path"  ╲
 *                ✈ "fly up"  ╲  ← GS antenna
 *           ╱                  ░
 *   150 Hz lobe (below, amber) ░──── runway ────→
 *
 * The glide path is a single dashed line drawn from antenna to upper-left
 * using a CSS rotate. The lobes are gradient triangles via clip-path. The
 * three aircraft sit at hand-tuned positions ON, ABOVE, and BELOW the path.
 */
export function SideProfile() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25, margin: "-50px" })

  // Three aircraft, positioned as percentages of the diagram. Each entry
  // sits on a specific point relative to the path. Tuned by eye.
  const aircraft = [
    {
      key: "above",
      left: "18%",
      top: "28%",
      label: "fly down",
      sub: "more 90 Hz",
      color: "text-gs",
      needle: "above" as const,
    },
    {
      key: "on",
      left: "44%",
      top: "53%",
      label: "on path",
      sub: "DDM = 0",
      color: "text-onpath",
      needle: "on" as const,
    },
    {
      key: "below",
      left: "70%",
      top: "82%",
      label: "fly up",
      sub: "more 150 Hz",
      color: "text-loc",
      needle: "below" as const,
    },
  ]

  // Distance NM markers along the path
  const markers = [
    { left: "20%", top: "32%", label: "4 NM" },
    { left: "38%", top: "47%", label: "3 NM" },
    { left: "56%", top: "62%", label: "2 NM" },
    { left: "74%", top: "77%", label: "1 NM" },
  ]

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
        className="absolute top-4 left-5"
      >
        <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary">
          ↘ APPROACH
        </div>
        <div className="font-mono text-[9px] text-text-tertiary/65 mt-0.5">
          aircraft descending toward threshold
        </div>
      </motion.div>

      {/* 90 Hz upper lobe — triangle gradient, anchored at antenna (right) extending up-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute right-[8%] top-0 origin-bottom-right"
        style={{
          width: "82%",
          height: "70%",
          clipPath: "polygon(100% 100%, 0% 0%, 0% 100%)",
          background:
            "linear-gradient(to bottom right, rgba(59,139,212,0) 0%, rgba(59,139,212,0.25) 60%, rgba(59,139,212,0) 100%)",
        }}
      />

      {/* 150 Hz lower lobe — triangle gradient, below the path */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.55 }}
        className="absolute right-[8%] bottom-[12%] origin-top-right"
        style={{
          width: "82%",
          height: "28%",
          clipPath: "polygon(100% 0%, 0% 100%, 0% 0%)",
          background:
            "linear-gradient(to top right, rgba(239,159,39,0) 0%, rgba(239,159,39,0.22) 60%, rgba(239,159,39,0) 100%)",
        }}
      />

      {/* Ground line at the bottom */}
      <div className="absolute left-0 right-0 bottom-[12%] h-px bg-border" />

      {/* Runway strip — behind antenna at the right */}
      <div className="absolute right-0 bottom-[10%] h-[3%] bg-bg-subtle border-y border-border" style={{ width: "16%" }}>
        {/* Centerline ticks */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(155,168,184,0.55) 0 14px, transparent 14px 22px)",
          }}
        />
      </div>

      {/* Glide path — a dashed line from antenna (right, ~88% left) at bottom to upper-left */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1.6, delay: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="absolute origin-right h-px"
        style={{
          right: "8.5%",
          bottom: "13.5%",
          width: "88%",
          transform: "rotate(-11deg)",
          transformOrigin: "right center",
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(93,202,165,0.85) 0 5px, transparent 5px 9px)",
          boxShadow: "0 0 6px rgba(93,202,165,0.45)",
        }}
      />

      {/* GS antenna — at threshold, right side */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute right-[8%] bottom-[13%] flex flex-col items-center gap-[3px]"
      >
        {/* 3 dipoles (capture-effect M-array) */}
        <span className="absolute -top-[36px] h-1 w-6 bg-gs rounded-sm" />
        <span className="absolute -top-[26px] h-1 w-6 bg-gs rounded-sm" />
        <span className="absolute -top-[16px] h-1 w-6 bg-gs rounded-sm" />
        {/* Mast */}
        <span className="absolute -top-[40px] h-10 w-px bg-gs" />
        {/* Top antenna ball + pulse */}
        <motion.span
          className="absolute -top-[44px] h-2 w-2 rounded-full bg-gs"
          animate={inView ? { scale: [1, 1.8, 1], opacity: [1, 0.4, 1] } : {}}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </motion.div>

      {/* GS antenna label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.7 }}
        className="absolute right-[12%] bottom-[24%] text-right"
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
        className="absolute right-[9%] bottom-[3%] font-mono text-[9px] tracking-[0.15em] uppercase text-text-tertiary"
      >
        Runway →
      </motion.div>

      {/* 3° angle annotation near antenna */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="absolute right-[12.5%] bottom-[18%] flex items-center gap-1"
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
          transition={{ duration: 0.4, delay: 1.4 + i * 0.08, type: "spring", stiffness: 260, damping: 22 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: m.left, top: m.top }}
        >
          <span className="font-mono text-[9px] tracking-[0.05em] text-onpath/85">{m.label}</span>
          <span className="block mt-1 h-1.5 w-1.5 rounded-full bg-onpath/80 ring-1 ring-bg-base" />
        </motion.div>
      ))}

      {/* Lobe labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.9 }}
        className="absolute top-[14%] left-[18%]"
      >
        <div className="font-mono text-[10px] tracking-[0.12em] text-gs font-semibold">90 Hz</div>
        <div className="font-mono text-[9px] text-gs/70">upper lobe</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-[18%] left-[14%]"
      >
        <div className="font-mono text-[10px] tracking-[0.12em] text-loc font-semibold">150 Hz</div>
        <div className="font-mono text-[9px] text-loc/70">lower lobe</div>
      </motion.div>

      {/* Three aircraft positions */}
      {aircraft.map((ac, i) => (
        <motion.div
          key={ac.key}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 1.55 + i * 0.18, ease: [0.32, 0.72, 0, 1] }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: ac.left, top: ac.top }}
        >
          {/* Mini CDI badge — above the aircraft */}
          <div className="relative flex flex-col items-center">
            <div className="rounded-[3px] border border-border bg-bg-base/95 px-1.5 py-1 mb-1.5">
              <div className="grid grid-cols-5 gap-[2px] items-center w-9">
                {[0, 1, 2, 3, 4].map((dot) => {
                  // Single bar across — represents needle position
                  const needleColor =
                    ac.needle === "on"
                      ? "bg-onpath"
                      : ac.needle === "above"
                      ? "bg-gs"
                      : "bg-loc"
                  return (
                    <span
                      key={dot}
                      className={`block h-[3px] rounded-sm ${needleColor}`}
                    />
                  )
                })}
              </div>
            </div>
            {/* Aircraft glyph */}
            <span className={`text-[20px] leading-none ${ac.color}`} aria-hidden>
              ✈
            </span>
            {/* Label below */}
            <div className="mt-1 text-center">
              <div className={`font-mono text-[9px] tracking-[0.12em] uppercase font-semibold ${ac.color}`}>
                {ac.label}
              </div>
              <div className="font-mono text-[8.5px] text-text-tertiary mt-0.5">{ac.sub}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
