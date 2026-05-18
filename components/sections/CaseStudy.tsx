"use client"

import { motion } from "framer-motion"
import { FadeIn, Stagger, StaggerItem } from "@/components/motion"

const facts: Array<{ label: string; value: string; mono?: boolean; accent?: string }> = [
  { label: "Airport", value: "San Francisco · KSFO", accent: "var(--color-loc)" },
  { label: "Runway", value: "28L · 11,381 ft / 3,469 m", mono: true },
  { label: "Localizer", value: "ISFO · 109.55 MHz · course 284°", mono: true, accent: "var(--color-loc)" },
  { label: "Glide slope", value: "Paired 332.45 MHz · 3.00°", mono: true, accent: "var(--color-gs)" },
  { label: "TCH", value: "~56 ft above threshold", mono: true },
  { label: "Approach lighting", value: "MALSR (28L) · ALSF-2 on adjacent 28R", mono: false },
  { label: "Decision height", value: "200 ft AGL · CAT I baseline", mono: true },
  { label: "Approach plate", value: "FAA chart code ILS or LOC RWY 28L", mono: false },
]

export function CaseStudy() {
  return (
    <section id="case-study" className="relative py-32 md:py-44 border-t border-border/50">
      <div className="section-frame-wide">
        <FadeIn className="mb-14 max-w-[58ch]">
          <p className="eyebrow">Section · Case study</p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            One approach, fully specified. KSFO Runway 28L.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[15.5px] leading-[1.7] text-muted-foreground">
            A real, current-day instrument approach. The numbers are not illustrative — they are the actual published values a pilot tunes, reads, and flies.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
          {/* Approach-plate styled card */}
          <FadeIn>
            <div className="relative rounded-lg border border-border bg-card overflow-hidden">
              {/* Header strip — mimics IAP plate header */}
              <div className="px-6 py-4 border-b border-border bg-bg-subtle flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-text-tertiary">
                    FAA IAP · CHART
                  </span>
                  <span className="font-mono text-[14px] tabular-nums text-foreground font-semibold">
                    ILS or LOC RWY 28L
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary">
                  San Francisco Intl · KSFO
                </span>
              </div>

              {/* Body */}
              <div className="p-7 md:p-9">
                <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                  {facts.map((f) => (
                    <StaggerItem key={f.label}>
                      <div>
                        <div
                          className="font-mono text-[10px] tracking-[0.22em] uppercase mb-1.5"
                          style={{ color: f.accent ?? "var(--color-text-tertiary)" }}
                        >
                          {f.label}
                        </div>
                        <div
                          className={`text-[15.5px] leading-[1.5] text-foreground/90 ${f.mono ? "font-mono tabular-nums" : ""}`}
                        >
                          {f.value}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>

                {/* Profile view inset — mini side profile (HTML/CSS, single anchor) */}
                <CaseStudyProfile />
              </div>
            </div>
          </FadeIn>

          {/* Asiana 214 sidebar — the cautionary tale */}
          <FadeIn delay={0.15}>
            <div className="rounded-lg border border-danger/30 bg-danger/[0.03] p-8 h-full flex flex-col">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-danger mb-5">
                <motion.span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-danger"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                When the slope was switched off
              </div>

              <h3 className="text-[22px] font-semibold tracking-[-0.01em] text-foreground mb-4 leading-[1.25]">
                Asiana 214 · 6 July 2013
              </h3>

              <p className="text-[14.5px] leading-[1.7] text-foreground/85 mb-5">
                A Boeing 777-200ER struck the seawall short of KSFO Runway 28L on a clear-weather visual approach. Three fatalities, 187 injuries, the aircraft destroyed.
              </p>

              <p className="text-[14.5px] leading-[1.7] text-muted-foreground mb-5">
                Critical detail: the runway's <span className="text-foreground">glide slope was NOTAM'd out of service</span> for construction. The crew was flying a visual approach without the ILS-paired vertical guidance they had been trained to rely on. Auto-throttle behaviour in <span className="font-mono text-[13px]">FLCH SPD</span> idled the engines below target speed; nobody noticed until 1.5 seconds before impact.
              </p>

              <div className="mt-auto pt-5 border-t border-danger/20">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-tertiary mb-2">Takeaway</p>
                <p className="text-[14px] leading-[1.6] text-foreground/85">
                  ILS is not the safety system. The pilot is. The ILS lets the pilot do their job in conditions that would otherwise make it impossible.
                </p>
              </div>

              <p className="mt-6 font-mono text-[10px] tracking-[0.18em] uppercase text-text-tertiary">
                Source · NTSB AAR-14/01
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/**
 * Mini profile-view inset for the KSFO 28L case study. Same single-source
 * pattern: antenna + path-end constants; DME markers derive from pointOnPath.
 */
function CaseStudyProfile() {
  const ANTENNA = { left: 92, top: 80 }
  const PATH_END = { left: 5, top: 28 }

  const pointOnPath = (t: number) => ({
    left: ANTENNA.left + t * (PATH_END.left - ANTENNA.left),
    top: ANTENNA.top + t * (PATH_END.top - ANTENNA.top),
  })

  // Rotated-div geometry for the dashed path line
  const ASPECT = 700 / 130 // matches the previous SVG viewBox ratio
  const dxPct = PATH_END.left - ANTENNA.left
  const dyPct = PATH_END.top - ANTENNA.top
  const angleDeg = Math.atan2(dyPct, dxPct * ASPECT) * (180 / Math.PI)
  const lenPct = Math.sqrt(dxPct * dxPct + (dyPct / ASPECT) * (dyPct / ASPECT))

  // DME markers along the path at chosen fractions
  const markers = [
    { t: 0.18, label: "FAF · 6.2 DME" },
    { t: 0.43, label: "10 DME" },
    { t: 0.68, label: "intercept" },
  ]

  // DH bar sits along the path at ~92% of the way toward antenna
  const dhPoint = pointOnPath(0.92)

  return (
    <div className="mt-10 rounded-md border border-border bg-bg-subtle/60 p-5">
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary mb-4">
        Profile view · published descent
      </p>
      <div className="relative w-full aspect-[700/130] bg-bg-base/40 rounded-sm overflow-hidden">
        {/* Ground line */}
        <div
          className="absolute left-0 right-0 h-px bg-border"
          style={{ top: `${ANTENNA.top}%` }}
        />
        {/* Runway extension behind antenna */}
        <div
          className="absolute bg-bg-subtle border-y border-border"
          style={{
            left: `${ANTENNA.left}%`,
            right: 0,
            top: `${ANTENNA.top - 1.5}%`,
            height: "3%",
          }}
        />

        {/* Dashed glide path */}
        <div
          className="absolute origin-left h-px"
          style={{
            left: `${ANTENNA.left}%`,
            top: `${ANTENNA.top}%`,
            width: `${lenPct}%`,
            transform: `rotate(${angleDeg}deg)`,
            transformOrigin: "left center",
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(93,202,165,0.85) 0 4px, transparent 4px 7px)",
          }}
        />

        {/* GS antenna */}
        <div
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${ANTENNA.left}%`, top: `${ANTENNA.top}%` }}
        >
          <div className="relative h-7 w-px bg-gs mx-auto">
            <span className="absolute left-1/2 -translate-x-1/2 top-1 h-[3px] w-3.5 bg-gs rounded-sm" />
            <span className="absolute left-1/2 -translate-x-1/2 top-3 h-[3px] w-3.5 bg-gs rounded-sm" />
            <span className="absolute left-1/2 -translate-x-1/2 top-5 h-[3px] w-3.5 bg-gs rounded-sm" />
          </div>
        </div>

        {/* DME markers — circles ON the path */}
        {markers.map((m) => {
          const p = pointOnPath(m.t)
          return (
            <div
              key={m.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
            >
              <span className="font-mono text-[8.5px] text-text-secondary whitespace-nowrap">
                {m.label}
              </span>
              <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-bg-base ring-1 ring-onpath" />
            </div>
          )
        })}

        {/* DH bar — small dashed segment near the runway */}
        <div
          className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-none"
          style={{ left: `${dhPoint.left}%`, top: `${dhPoint.top - 6}%` }}
        >
          <span className="font-mono text-[8.5px] text-loc">DH 200</span>
          <span className="mt-0.5 h-px w-12 bg-loc/70" style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(239,159,39,0.85) 0 3px, transparent 3px 6px)",
            backgroundColor: "transparent",
          }} />
        </div>

        {/* TCH label near antenna */}
        <span
          className="absolute font-mono text-[8.5px] text-text-secondary pointer-events-none"
          style={{ left: `${ANTENNA.left}%`, top: `${ANTENNA.top + 5}%`, transform: "translateX(-50%)" }}
        >
          TCH 56
        </span>

        {/* Slope label upper-left */}
        <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.1em] text-onpath font-semibold">
          3.00° GS
        </span>
      </div>
    </div>
  )
}
