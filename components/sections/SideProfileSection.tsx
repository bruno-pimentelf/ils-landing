"use client"

import { FadeIn } from "@/components/motion"
import { SideProfile } from "@/components/diagrams/SideProfile"
import { BeamLobe } from "@/components/interactive/BeamLobe"

export function SideProfileSection() {
  return (
    <section id="side-profile" className="relative py-32 md:py-44 border-t border-border/50">
      <div className="section-frame-wide">
        <FadeIn className="mb-12 max-w-[60ch]">
          <p className="eyebrow">Section 06 · Side profile</p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            Where two lobes meet in equal strength, you have a glide path.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-lg border border-border bg-card p-3 md:p-6">
            <SideProfile />
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-[1000px]">
          <FadeIn delay={0.2}>
            <p className="text-[15.5px] leading-[1.7] text-foreground/85">
              The glide slope antenna radiates two overlapping lobes: an upper lobe modulated at <span className="text-gs">90 Hz</span>, a lower lobe at <span className="text-loc">150 Hz</span>. Where the lobes overlap in equal strength is the glide path — a line in space at roughly 3°.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[15.5px] leading-[1.7] text-foreground/85">
              Above the path: more 90 Hz received → the CDI shows "fly down". Below the path: more 150 Hz → "fly up". The same logic applies to the localizer, just rotated 90° — horizontal lobes for left and right.
            </p>
          </FadeIn>
        </div>

        {/* Interactive */}
        <FadeIn delay={0.1} className="mt-20">
          <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="eyebrow">Interactive · Beam lobes</p>
              <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.01em] text-foreground">
                Move the aircraft and watch the DDM resolve to zero on the glide path.
              </h3>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-tertiary">
              ↕ vertical · DDM = m₁₅₀ − m₉₀
            </div>
          </div>
          <BeamLobe />
        </FadeIn>
      </div>
    </section>
  )
}
