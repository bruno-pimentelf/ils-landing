"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn } from "@/components/motion"

type ComponentKey = "loc" | "gs" | "marker"

const data: Record<
  ComponentKey,
  {
    label: string
    short: string
    color: string
    accent: string
    frequency: string
    purpose: string
    method: string
    coverage: string
    location: string
    notes?: string
    markers?: Array<{ name: string; tone: string; pattern: string; range: string; light: string; role: string }>
  }
> = {
  loc: {
    label: "Localizer (LOC)",
    short: "Lateral",
    color: "var(--color-loc)",
    accent: "var(--color-loc-light)",
    frequency: "108.10–111.95 MHz · VHF · 40 channels on odd tenths (.10, .15, .30, .35…)",
    purpose: "Lateral alignment with the runway centerline",
    method: "Two overlapping lobes (90 Hz and 150 Hz) — each at 20% AM depth, sum 40% on path",
    coverage: "Course tailored to give 700 ft (~215 m) width at the threshold — typically ±2.5°, ICAO caps at ±3°",
    location: "Far end of the runway, ~300 m past the stop end, on the centerline extended",
  },
  gs: {
    label: "Glide slope (GS)",
    short: "Vertical",
    color: "var(--color-gs)",
    accent: "var(--color-gs-light)",
    frequency: "329.15–335.00 MHz · UHF — auto-paired with the LOC by ICAO Annex 10",
    purpose: "Vertical descent guidance",
    method: "Same 90 / 150 Hz logic, oriented vertically — capture-effect M-array (3 dipoles)",
    coverage: "Standard 3.00°; London City uses 5.5°; ICAO caps at 6.0°",
    location: "Beside the runway, ~120 m laterally from centerline, ~300 m past threshold",
  },
  marker: {
    label: "Marker beacons",
    short: "Distance",
    color: "var(--color-marker)",
    accent: "var(--color-onpath)",
    frequency: "75 MHz · all three markers · 95% AM modulated",
    purpose: "Discrete distance checkpoints along the approach",
    method: "Narrow vertical fan-beam triggered as the aircraft passes overhead",
    coverage: "Aircraft cockpit light + audio tone for ~2–3 seconds",
    location: "Three positions along the final approach path",
    notes: "Largely decommissioned since the late 2000s. The FAA permits DME, RNAV, compass locator, or NDB substitutes per AIM 1-1-9. Most modern receivers omit the 75 MHz receiver entirely.",
    markers: [
      { name: "Outer (OM)", tone: "400 Hz", pattern: "dashes", range: "~7–11 NM out", light: "blue", role: "approach gate" },
      { name: "Middle (MM)", tone: "1300 Hz", pattern: "dots + dashes", range: "~0.5–1 NM", light: "amber", role: "CAT I decision point" },
      { name: "Inner (IM)", tone: "3000 Hz", pattern: "dots", range: "near threshold", light: "white", role: "CAT II/III decision point" },
    ],
  },
}

export function Components() {
  const [active, setActive] = useState<ComponentKey>("loc")
  const c = data[active]

  return (
    <section id="components" className="relative py-32 md:py-44 border-t border-border/50">
      <div className="section-frame">
        <FadeIn className="mb-16 max-w-[58ch]">
          <p className="eyebrow">Section 04 · The three components</p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            Three transmitters. Two precise needles. One distance fix every few miles.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {(Object.keys(data) as ComponentKey[]).map((k) => {
              const isActive = active === k
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setActive(k)}
                  className={`relative bg-card p-6 text-left transition-colors ${isActive ? "" : "hover:bg-bg-subtle"}`}
                >
                  <div
                    className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3"
                    style={{ color: isActive ? data[k].color : "var(--color-text-tertiary)" }}
                  >
                    {data[k].short}
                  </div>
                  <div
                    className={`text-[18px] font-semibold transition-colors ${
                      isActive ? "text-foreground" : "text-foreground/55"
                    }`}
                  >
                    {data[k].label}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="comp-bar"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: data[k].color }}
                      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
          >
            <Spec label="Frequency" value={c.frequency} color={c.color} />
            <Spec label="Purpose" value={c.purpose} color={c.color} />
            <Spec label="Method" value={c.method} color={c.color} />
            <Spec label="Coverage" value={c.coverage} color={c.color} />
            <div className="md:col-span-2">
              <Spec label="Location" value={c.location} color={c.color} />
            </div>

            {c.markers && (
              <div className="md:col-span-2 mt-4">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-tertiary mb-5">
                  Three markers
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
                  {c.markers.map((m) => (
                    <div key={m.name} className="bg-card p-6">
                      <div
                        className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase mb-3"
                        style={{ color: m.light === "blue" ? "var(--color-gs)" : m.light === "amber" ? "var(--color-loc)" : "var(--color-text-secondary)" }}
                      >
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{
                            background:
                              m.light === "blue" ? "var(--color-gs)" : m.light === "amber" ? "var(--color-loc)" : "#e8ecf1",
                          }}
                        />
                        {m.name}
                      </div>
                      <div className="font-mono text-[12px] tabular-nums text-foreground mb-1">{m.tone} · {m.pattern}</div>
                      <div className="font-mono text-[11px] text-muted-foreground mb-3">{m.range}</div>
                      <div className="text-[13px] leading-relaxed text-foreground/85">{m.role}</div>
                    </div>
                  ))}
                </div>
                {c.notes && (
                  <p className="mt-5 text-[14px] leading-relaxed text-muted-foreground max-w-[64ch]">{c.notes}</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Spec({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] uppercase text-text-tertiary mb-2.5">
        <span className="inline-block h-1 w-1 rounded-full" style={{ background: color }} />
        {label}
      </div>
      <div className="text-[15.5px] leading-[1.6] text-foreground/90 max-w-[56ch]">{value}</div>
    </div>
  )
}
