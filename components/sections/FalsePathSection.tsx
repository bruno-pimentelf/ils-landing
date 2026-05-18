"use client"

import { FadeIn } from "@/components/motion"
import { FalsePath } from "@/components/interactive/FalsePath"

export function FalsePathSection() {
  return (
    <section id="false-path" className="relative py-32 md:py-44 border-t border-border/50">
      <div className="section-frame-wide">
        <FadeIn className="mb-12 max-w-[58ch]">
          <p className="eyebrow text-danger">Section 10 · The false glide path</p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            The same DDM = 0 condition repeats above the true path. Pilots have to remember it's there.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-[1000px] mb-12">
          <FadeIn delay={0.1}>
            <p className="text-[15.5px] leading-[1.7] text-foreground/85">
              The DDM condition (90 Hz = 150 Hz) repeats at multiples of the true glide angle. A second "on-path" zone exists at ~9°, a third at ~15° — they're sidelobes of the same antenna pattern.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[15.5px] leading-[1.7] text-foreground/85">
              Aircraft intercepting from very high altitude can lock onto the 9° false path — a descent rate so steep it is <span className="text-danger">unrecoverable</span> at landing speeds. The CDI shows the same picture as the real glide path; only the airspeed and ground proximity tell you something is wrong.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <FalsePath />
        </FadeIn>
      </div>
    </section>
  )
}
