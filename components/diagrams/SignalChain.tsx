"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/**
 * Receiver signal chain — antenna through to autopilot. Pure HTML + Tailwind +
 * Framer Motion. Each box animates in with stagger; arrows draw between them.
 */
const stages: Array<{
  label: string
  sub: string
  kind: "hardware" | "compute" | "display"
}> = [
  { label: "Antenna", sub: "RF capture", kind: "hardware" },
  { label: "RF preamp", sub: "low-noise gain", kind: "hardware" },
  { label: "NAV receiver", sub: "AM demod", kind: "hardware" },
  { label: "Tone filter bank", sub: "90 / 150 Hz split", kind: "hardware" },
  { label: "DDM comparator", sub: "m₁₅₀ − m₉₀", kind: "compute" },
  { label: "CDI / HSI / EFIS", sub: "needle deflection", kind: "display" },
]

const groupClass = {
  hardware: "border-border bg-bg-subtle/60 text-foreground",
  compute: "border-loc/45 bg-loc/[0.07] text-loc",
  display: "border-onpath/45 bg-onpath/[0.06] text-onpath",
}

export function SignalChain() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "-30px" })

  return (
    <div ref={ref} className="w-full">
      {/* Category labels */}
      <div className="grid grid-cols-12 gap-3 mb-3 font-mono text-[9px] tracking-[0.2em] uppercase">
        <div className="col-span-8 text-center text-text-tertiary">Analog · Hardware</div>
        <div className="col-span-2 text-center text-loc">Compute</div>
        <div className="col-span-2 text-center text-onpath">Display</div>
      </div>

      {/* Stage row */}
      <div className="flex flex-wrap items-stretch gap-y-4">
        {stages.map((stage, i) => {
          const isLast = i === stages.length - 1
          return (
            <div key={stage.label} className="flex items-center flex-1 min-w-0">
              {/* Box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 * i, ease: [0.32, 0.72, 0, 1] }}
                className={`relative rounded-md border px-3 py-3 flex-1 min-w-0 ${groupClass[stage.kind]}`}
              >
                <div className="text-[12px] font-medium leading-tight">{stage.label}</div>
                <div className="font-mono text-[10px] tracking-[0.05em] opacity-70 mt-1 leading-tight truncate">
                  {stage.sub}
                </div>
              </motion.div>

              {/* Connector arrow — between boxes */}
              {!isLast && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * i + 0.25 }}
                  className="flex items-center px-1 shrink-0 origin-left text-text-tertiary"
                >
                  <span className="block h-px w-3 bg-current" />
                  <span className="block w-0 h-0 border-y-[4px] border-y-transparent border-l-[5px] border-l-current ml-px" />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Autopilot branch — drawn below the CDI box (rightmost) */}
      <div className="grid grid-cols-6 mt-3">
        <div className="col-start-6">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.85 }}
            className="relative"
          >
            {/* Elbow connector — vertical line + arrowhead */}
            <div className="flex justify-center mb-1">
              <span className="block w-px h-5 border-l border-dashed border-text-tertiary/45" />
            </div>
            <div className="flex justify-center mb-1">
              <span
                className="block w-0 h-0 border-x-[4px] border-x-transparent border-t-[5px]"
                style={{ borderTopColor: "rgba(155,168,184,0.65)" }}
              />
            </div>
            <div className="rounded-md border border-dashed border-text-tertiary/45 bg-bg-subtle/30 px-3 py-3 text-center">
              <div className="text-[12px] font-medium text-text-secondary leading-tight">
                Autopilot / FD
              </div>
              <div className="font-mono text-[10px] tracking-[0.05em] text-text-tertiary opacity-80 mt-1 leading-tight">
                autoland (optional)
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
