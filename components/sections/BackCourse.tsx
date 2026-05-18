"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FadeIn } from "@/components/motion"

/**
 * The back-course. Pure HTML + CSS + Framer Motion.
 */
export function BackCourse() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3, margin: "-50px" })

  return (
    <section id="back-course" className="relative py-32 md:py-44 border-t border-border/50">
      <div className="section-frame-wide">
        <FadeIn className="mb-14 max-w-[60ch]">
          <p className="eyebrow">Section · A surprising fact</p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            The localizer beam doesn't stop at the antenna. It continues backward.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <FadeIn delay={0.1}>
            <div ref={ref} className="relative w-full aspect-[16/7] rounded-lg border border-border bg-card overflow-hidden">
              {/* Front course fan — amber, extending LEFT */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="absolute left-0 top-1/2 -translate-y-1/2 origin-right"
                style={{
                  width: "45%",
                  height: "70%",
                  clipPath: "polygon(100% 50%, 0% 0%, 0% 100%)",
                  background:
                    "linear-gradient(to left, rgba(239,159,39,0) 0%, rgba(239,159,39,0.28) 60%, rgba(239,159,39,0) 100%)",
                }}
              />

              {/* Back course fan — blue, extending RIGHT */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 1.0, ease: [0.32, 0.72, 0, 1] }}
                className="absolute right-0 top-1/2 -translate-y-1/2 origin-left"
                style={{
                  width: "32%",
                  height: "55%",
                  clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
                  background:
                    "linear-gradient(to right, rgba(59,139,212,0) 0%, rgba(59,139,212,0.22) 60%, rgba(59,139,212,0) 100%)",
                }}
              />

              {/* Front centerline (amber dashed) */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 0.5, scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.7 }}
                className="absolute left-[3%] top-1/2 h-px origin-right"
                style={{
                  width: "45%",
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgba(239,159,39,0.6) 0 4px, transparent 4px 10px)",
                }}
              />

              {/* Back centerline (blue dashed) */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 0.45, scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 1.2 }}
                className="absolute right-[3%] top-1/2 h-px origin-left"
                style={{
                  width: "32%",
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgba(59,139,212,0.55) 0 4px, transparent 4px 10px)",
                }}
              />

              {/* Runway strip — centered */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.7 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-subtle border border-border flex items-center"
                style={{ width: "44%", height: "12%" }}
              >
                {/* Threshold stripes left */}
                <div className="flex flex-col gap-[2px] pl-1 h-full py-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="block h-[2.5px] w-3 bg-text-tertiary/60" />
                  ))}
                </div>
                {/* Runway designator left */}
                <span className="ml-2 font-mono text-[11px] font-semibold text-text-tertiary">28</span>
                {/* Centerline */}
                <div
                  className="flex-1 h-px mx-2"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to right, rgba(155,168,184,0.5) 0 10px, transparent 10px 16px)",
                  }}
                />
                {/* Runway designator right */}
                <span className="mr-2 font-mono text-[11px] font-semibold text-text-tertiary">10</span>
                {/* Threshold stripes right */}
                <div className="flex flex-col gap-[2px] pr-1 h-full py-1 ml-auto">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="block h-[2.5px] w-3 bg-text-tertiary/60" />
                  ))}
                </div>
              </motion.div>

              {/* Localizer antenna — at the rightward end of the runway */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute left-[71%] top-1/2 -translate-y-1/2 flex flex-col gap-[2px]"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="block h-1 w-2 bg-loc rounded-sm" />
                ))}
                <motion.span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full border border-loc"
                  animate={inView ? { scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] } : {}}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
                />
              </motion.div>

              {/* Front-course aircraft — flying right toward runway */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="absolute left-[12%] top-1/2 -translate-y-1/2 text-[22px] leading-none text-foreground"
                style={{ transform: "translateY(-50%) rotate(90deg)" }}
              >
                ✈
              </motion.div>

              {/* Back-course aircraft — flying left, away from runway */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="absolute right-[12%] top-1/2 -translate-y-1/2 text-[22px] leading-none text-gs"
                style={{ transform: "translateY(-50%) rotate(-90deg)" }}
              >
                ✈
              </motion.div>

              {/* Labels — front */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.9 }}
                className="absolute top-[10%] left-[6%]"
              >
                <div className="font-mono text-[10px] tracking-[0.15em] text-loc font-semibold">
                  FRONT COURSE
                </div>
                <div className="font-mono text-[9px] text-loc/70 mt-0.5">precision · with glide slope</div>
                <div className="font-mono text-[9px] text-text-tertiary mt-0.5">needle: fly TOWARD it</div>
              </motion.div>

              {/* Labels — back */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="absolute top-[10%] right-[6%] text-right"
              >
                <div className="font-mono text-[10px] tracking-[0.15em] text-gs font-semibold">
                  BACK COURSE
                </div>
                <div className="font-mono text-[9px] text-gs/70 mt-0.5">non-precision · no GS</div>
                <div className="font-mono text-[9px] text-text-tertiary mt-0.5">needle: fly AWAY from it</div>
              </motion.div>

              {/* LOC antenna label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="absolute left-[72%] bottom-[8%]"
              >
                <div className="font-mono text-[9px] tracking-[0.15em] text-loc">LOC ANTENNA</div>
              </motion.div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-loc mb-2">The front course</div>
                <p className="text-[15px] leading-[1.7] text-foreground/85">
                  Standard precision approach. Needle "fly toward" — drift right of course, the needle moves right, the pilot turns right to follow it. Glide slope present.
                </p>
              </div>

              <div className="hairline" />

              <div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-gs mb-2">The back course</div>
                <p className="text-[15px] leading-[1.7] text-foreground/85">
                  The same antenna pattern extends backward. With needle sensing <em className="not-italic text-foreground">reversed</em> — fly <em className="not-italic text-foreground">away</em> from the needle — and no glide slope (the GS antenna is unidirectional), it gets published as a non-precision approach for the opposite runway end.
                </p>
              </div>

              <div className="hairline" />

              <div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-onpath mb-2">Why bother</div>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">
                  Two usable approaches for the price of one antenna. Common at older or single-ILS airports — and the kind of detail experienced pilots will trip new pilots up with on a check-ride.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
