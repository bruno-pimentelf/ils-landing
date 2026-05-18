"use client"

import { FadeIn } from "@/components/motion"
import { CategoriesViewer } from "@/components/interactive/CategoriesViewer"

export function Categories() {
  return (
    <section id="categories" className="relative py-32 md:py-44 border-t border-border/50">
      <div className="section-frame-wide">
        <FadeIn className="mb-12 max-w-[60ch]">
          <p className="eyebrow">Section 09 · Categories</p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            Five tiers, scaling from "see the runway by 200 feet" to "you don't need to see anything at all".
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <CategoriesViewer />
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12 max-w-[68ch]">
          <p className="text-[15px] leading-[1.7] text-muted-foreground">
            Each step down the category ladder demands more from every link in the chain — ground equipment redundancy, airborne autoland fail-modes, crew training, airport lighting and surface conditions. The math at the heart of it never changes; what changes is how much you trust it.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
