"use client"

import { FadeIn, Stagger, StaggerItem } from "@/components/motion"

const stats = [
  { value: "4,000+", label: "runways equipped worldwide" },
  { value: "3°", label: "standard descent angle" },
  { value: "0 ft", label: "decision height (CAT IIIc)" },
]

export function WhatIs() {
  return (
    <section id="what-is" className="relative py-32 md:py-44">
      <div className="section-frame">
        <FadeIn>
          <p className="eyebrow">Section 02 · What is ILS</p>
          <h2 className="mt-6 max-w-[22ch] text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            A precision approach system that hands the pilot two numbers, continuously.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-10 max-w-[62ch] text-[18px] leading-[1.65] text-foreground/85">
            ILS is a precision ground-based approach system that gives a landing aircraft two pieces of information continuously: how far <span className="text-loc">left or right</span> of the runway centerline it is, and how far <span className="text-gs">above or below</span> the correct descent path it is. Both come from comparing the strength of two overlapping radio lobes — one modulated at 90 Hz, the other at 150 Hz.
          </p>
        </FadeIn>

        {/* Key stat row */}
        <Stagger className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {stats.map((s) => (
            <StaggerItem key={s.value}>
              <div className="bg-card p-10">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-tertiary mb-5">
                  Metric
                </div>
                <div className="text-5xl font-semibold tracking-[-0.02em] text-foreground tabular-nums">
                  {s.value}
                </div>
                <div className="mt-4 text-[14px] leading-relaxed text-muted-foreground max-w-[28ch]">
                  {s.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
