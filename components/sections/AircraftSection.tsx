"use client"

import { FadeIn, Stagger, StaggerItem } from "@/components/motion"
import { Aircraft } from "@/components/diagrams/Aircraft"
import { SignalChain } from "@/components/diagrams/SignalChain"

const antennas = [
  {
    name: "Glide slope",
    color: "var(--color-gs)",
    location: "Nose radome (forward-pointing)",
    freq: "329–335 MHz",
    why: "Unobstructed forward+downward view of ground antenna",
  },
  {
    name: "Localizer",
    color: "var(--color-loc)",
    location: "Top of vertical stabilizer (V-blade or twin-blade)",
    freq: "108–112 MHz",
    why: "High position — airframe doesn't shadow the signal",
  },
  {
    name: "Marker beacon",
    color: "var(--color-marker)",
    location: "Belly of fuselage (flat blade pointing down)",
    freq: "75 MHz",
    why: "Receives narrow vertical fan-beam as aircraft passes overhead",
  },
]

export function AircraftSection() {
  return (
    <section id="aircraft" className="relative py-32 md:py-44 border-t border-border/50">
      <div className="section-frame-wide">
        <FadeIn className="mb-10 max-w-[58ch]">
          <p className="eyebrow">Section 07 · Aircraft reception</p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            Three antennas in three deliberate places — each chosen for the frequency it has to hear.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-lg border border-border bg-card p-3 md:p-6">
            <Aircraft />
          </div>
        </FadeIn>

        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {antennas.map((a) => (
            <StaggerItem key={a.name}>
              <div className="bg-card p-7 h-full">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: a.color }}>
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: a.color }} />
                  {a.name}
                </div>
                <div className="text-[15px] leading-relaxed text-foreground mb-3">{a.location}</div>
                <div className="font-mono text-[11px] tabular-nums text-muted-foreground mb-4">{a.freq}</div>
                <p className="text-[13px] leading-relaxed text-muted-foreground border-t border-border pt-4">
                  {a.why}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-20">
          <p className="eyebrow">Signal chain</p>
          <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.01em] text-foreground max-w-[56ch]">
            From antenna to autopilot: the path every ILS signal travels through the airframe.
          </h3>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8">
          <div className="rounded-lg border border-border bg-card p-6 overflow-x-auto">
            <SignalChain />
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-10 max-w-[68ch]">
          <p className="text-[15.5px] leading-[1.7] text-foreground/85">
            In modern aircraft, all three are integrated into a single <span className="font-medium text-foreground">Multi-Mode Receiver (MMR)</span> that also handles VOR, DME, and GBAS/SBAS. The localizer and glide slope frequencies are paired by ICAO — tuning one auto-tunes the other.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
