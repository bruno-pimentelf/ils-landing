"use client"

import { FadeIn } from "@/components/motion"

export function WhyEndures() {
  return (
    <section id="endures" className="relative py-32 md:py-44 border-t border-border/50">
      <div className="section-frame">
        <FadeIn className="mb-14 max-w-[58ch]">
          <p className="eyebrow">Section 11 · Why it endures</p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            Built in the 1930s, still beating its replacements at the thing they were designed to replace it for.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-[1000px]">
          <FadeIn delay={0.1}>
            <div className="font-mono text-[10px] tracking-[0.25em] text-text-tertiary uppercase mb-3">Reach</div>
            <p className="text-[15.5px] leading-[1.7] text-foreground/85">
              Despite its 1930s-era engineering, ILS remains the dominant precision approach system globally. GNSS-based approaches (RNAV, RNP, SBAS like WAAS, GBAS) are growing fast and don't require ground equipment.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="font-mono text-[10px] tracking-[0.25em] text-text-tertiary uppercase mb-3">Independence</div>
            <p className="text-[15.5px] leading-[1.7] text-foreground/85">
              But ILS keeps an advantage: <span className="font-medium text-foreground">it does not depend on satellite availability or integrity monitoring</span>. A ground transmitter and a receiver are all you need — no constellation, no augmentation, no integrity bound.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="md:col-span-2">
            <div className="font-mono text-[10px] tracking-[0.25em] text-text-tertiary uppercase mb-3">Robustness</div>
            <p className="text-[15.5px] leading-[1.7] text-foreground/85">
              The elegance of the DDM principle — robust, drift-resistant, immune to signal strength variation — is why it has outlived every contender for nearly a century. The aircraft compares two amplitudes inside the same demodulator, on the same gain stage; whatever changes the gain changes both equally, and the difference holds.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} className="mt-24">
          <div className="border-l-2 border-onpath pl-8 max-w-[68ch]">
            <p className="text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.35] tracking-[-0.01em] text-foreground italic font-light">
              A century-old answer to one of aviation's hardest problems: how do you find a runway you cannot see?
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
