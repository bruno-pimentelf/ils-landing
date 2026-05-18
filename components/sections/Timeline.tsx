"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { FadeIn } from "@/components/motion"

const milestones = [
  {
    year: "1929",
    title: "First blind landing",
    body: "Jimmy Doolittle lands at Mitchel Field, NY using only instruments — the proof of concept.",
  },
  {
    year: "1938",
    title: "First ILS demonstration",
    body: "United Airlines demonstrates a working ILS on a scheduled passenger flight.",
  },
  {
    year: "1949",
    title: "ICAO adopts ILS as global standard",
    body: "Becomes one of the longest-lived aviation standards still in use.",
  },
  {
    year: "1965",
    title: "CAT II certified",
    body: "London Heathrow becomes the first airport to support CAT II precision approaches.",
  },
  {
    year: "1994",
    title: "CAT IIIc — zero-visibility autoland",
    body: "Aircraft can now land safely with RVR = 0 m and DH = 0 ft.",
  },
]

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.5"],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="history" className="relative py-32 md:py-44 border-t border-border/50">
      <div className="section-frame">
        <FadeIn className="mb-20 max-w-[58ch]">
          <p className="eyebrow">Section 03 · Historical timeline</p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            Sixty-five years of refinement, all on the same underlying idea.
          </h2>
        </FadeIn>

        <div ref={ref} className="relative pl-10 md:pl-16">
          {/* Background line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />
          {/* Animated progress line */}
          <motion.div
            className="absolute left-4 md:left-6 top-0 w-px bg-loc origin-top"
            style={{ height: lineHeight }}
          />

          <ol className="space-y-16">
            {milestones.map((m, i) => (
              <Milestone key={m.year} {...m} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Milestone({
  year,
  title,
  body,
  index,
}: {
  year: string
  title: string
  body: string
  index: number
}) {
  const itemRef = useRef<HTMLLIElement>(null)
  const inView = useInView(itemRef, { once: true, amount: 0.6, margin: "-100px" })

  return (
    <li ref={itemRef} className="relative">
      {/* Node circle — sits on the line */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="absolute -left-[28px] md:-left-[42px] top-2 z-10 flex h-3 w-3 items-center justify-center"
      >
        <div className="h-3 w-3 rounded-full bg-loc" />
        <motion.div
          animate={inView ? { scale: [1, 2, 1], opacity: [0.6, 0, 0.6] } : {}}
          transition={{ duration: 2.5, repeat: index === 0 ? Infinity : 0, ease: "easeOut" }}
          className="absolute h-3 w-3 rounded-full bg-loc"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="font-mono text-[12px] tracking-[0.15em] text-loc tabular-nums">{year}</div>
        <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.01em] text-foreground">{title}</h3>
        <p className="mt-3 max-w-[64ch] text-[16px] leading-[1.65] text-muted-foreground">{body}</p>
      </motion.div>
    </li>
  )
}
