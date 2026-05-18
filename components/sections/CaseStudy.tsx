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

                {/* Profile view inset — mini side profile */}
                <div className="mt-10 rounded-md border border-border bg-bg-subtle/60 p-5">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-text-tertiary mb-4">
                    Profile view · published descent
                  </p>
                  <svg viewBox="0 0 700 130" className="w-full h-auto">
                    {/* Ground */}
                    <line x1="0" y1="100" x2="700" y2="100" stroke="#2a3441" strokeWidth="1" />
                    {/* Path */}
                    <line x1="640" y1="100" x2="40" y2="35" stroke="#5dcaa5" strokeWidth="1.4" strokeDasharray="3 4" opacity="0.85" />
                    {/* Antenna */}
                    <rect x="638" y="74" width="2" height="26" fill="#3b8bd4" />
                    {[0, 1, 2].map((i) => (
                      <rect key={i} x="633" y={78 + i * 7} width="12" height="2" fill="#3b8bd4" />
                    ))}
                    {/* Runway extension */}
                    <rect x="640" y="100" width="60" height="3" fill="#1a2029" stroke="#2a3441" />
                    {/* DH @ ~200ft */}
                    <line x1="500" y1="92" x2="540" y2="92" stroke="#ef9f27" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="500" y="86" fontSize="9" fontFamily="var(--font-mono)" fill="#ef9f27">DH 200</text>
                    {/* TCH */}
                    <text x="640" y="118" fontSize="9" fontFamily="var(--font-mono)" fill="#9ba8b8" textAnchor="middle">TCH 56</text>
                    {/* Distance fix annotations */}
                    {[
                      { x: 540, label: "FAF · 6.2 DME" },
                      { x: 360, label: "10 DME" },
                      { x: 180, label: "intercept" },
                    ].map((m) => {
                      const y = Number((100 - (640 - m.x) * (65 / 600)).toFixed(2))
                      return (
                        <g key={m.x}>
                          <circle cx={m.x} cy={y} r="3" fill="#0a0e14" stroke="#5dcaa5" strokeWidth="1" />
                          <text x={m.x} y={Number((y - 8).toFixed(2))} textAnchor="middle" fontSize="8.5" fontFamily="var(--font-mono)" fill="#9ba8b8">
                            {m.label}
                          </text>
                        </g>
                      )
                    })}
                    {/* Slope label */}
                    <text x="40" y="55" fontSize="10" fontFamily="var(--font-mono)" fill="#5dcaa5" letterSpacing="0.1em">
                      3.00° GS
                    </text>
                  </svg>
                </div>
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
