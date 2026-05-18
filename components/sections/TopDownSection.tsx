"use client"

import { FadeIn } from "@/components/motion"
import { TopDownView } from "@/components/diagrams/TopDownView"

export function TopDownSection() {
  return (
    <section id="topdown" className="relative py-32 md:py-44 border-t border-border/50">
      <div className="section-frame-wide">
        <FadeIn className="mb-12 max-w-[58ch] mx-auto md:mx-0">
          <p className="eyebrow">Section 05 · The top-down view</p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            The localizer transmitter sits at the end of the runway you're flying <em className="not-italic text-loc">toward</em>.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          <FadeIn delay={0.1} className="order-2 lg:order-1">
            <div className="rounded-lg border border-border bg-card p-3 md:p-5">
              <TopDownView />
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="left" className="order-1 lg:order-2 pt-6">
            <div className="space-y-7 text-[15.5px] leading-[1.7] text-foreground/85">
              <p>
                The localizer antenna is at the <span className="text-loc">far end of the runway</span> — the end the aircraft is flying toward, not from. Counterintuitive but necessary: the beam points back along the runway axis toward approaching aircraft, like a flashlight aimed at you.
              </p>
              <p>
                The array is a wide horizontal structure (25–30 m on CAT I, up to 60 m on CAT III) made of multiple dipoles. <span className="font-medium text-foreground">Wider array, sharper beam.</span>
              </p>
              <p>
                The glide slope antenna is <span className="text-gs">offset to the side of the runway</span> — typically the left side as you approach, by convention. It cannot be on the centerline or aircraft would collide with it on rollout.
              </p>
              <p>
                The GS antenna sits ~300 m inboard from the landing threshold and 120–180 m laterally from centerline.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
