"use client"

import { FadeIn } from "@/components/motion"
import { DDMVisual } from "@/components/diagrams/DDMVisual"
import { DescentCalculator } from "@/components/interactive/DescentCalculator"
import { CDIVisualizer } from "@/components/interactive/CDIVisualizer"
import { BlockMath, InlineMath } from "react-katex"

const stages = [
  {
    n: "01",
    title: "Transmitted composite signal",
    math: `e(t) = A \\cdot \\Big[ 1 + m_{90} \\cos(2\\pi \\cdot 90 \\cdot t) + m_{150} \\cos(2\\pi \\cdot 150 \\cdot t) \\Big] \\cdot \\cos(2\\pi f_c t)`,
    legend: [
      ["A", "amplitude"],
      ["m_{90}, m_{150}", "modulation depths (0 to 1)"],
      ["f_c", "carrier frequency (108–112 MHz LOC, 329–335 MHz GS)"],
    ],
  },
  {
    n: "02",
    title: "After AM demodulation",
    math: `v(t) = K \\cdot \\Big[ 1 + m_{90} \\cos(2\\pi \\cdot 90 \\cdot t) + m_{150} \\cos(2\\pi \\cdot 150 \\cdot t) \\Big]`,
    note: "Band-pass filters at 90 Hz and 150 Hz separate the two tones; their amplitudes are then K·m₉₀ and K·m₁₅₀.",
  },
  {
    n: "03",
    title: "The DDM equation — the heart of ILS",
    math: `\\boxed{\\;\\text{DDM} = m_{150} - m_{90}\\;}`,
    bullets: [
      ["On path / on centerline", "DDM = 0", "var(--color-onpath)"],
      ["Above path or right of centerline", "DDM < 0", "var(--color-gs)"],
      ["Below path or left of centerline", "DDM > 0", "var(--color-loc)"],
    ],
    note: "ICAO reference: each tone modulates the carrier at 20% depth on path (sum = 40%).",
  },
  {
    n: "04",
    title: "Needle deflection",
    math: `\\text{Needle deflection} = G \\cdot \\text{DDM}`,
    note: "LOC full-scale at DDM = 0.155 (course width ≈ 5° total). GS full-scale at DDM = 0.175 (path width ≈ 1.4° total). Standard CDI uses 5 dots from center to full-scale.",
  },
  {
    n: "05",
    title: "Localizer course width",
    math: `\\text{Course width (deg)} = 2 \\arctan\\!\\left( \\frac{107.5}{\\text{runway length (m)}} \\right)`,
    note: "The course is normalized to 700 ft (~215 m) wide at the threshold regardless of runway length — uniform precision in distance.",
  },
  {
    n: "06",
    title: "Descent rate for a 3° glide path",
    math: `\\text{V/S (fpm)} = \\text{GS (kt)} \\cdot \\tan(3°) \\cdot 101.27 \\approx \\text{GS} \\cdot 5`,
    rule: [
      ["120 kt", "~600 fpm"],
      ["140 kt", "~700 fpm"],
      ["160 kt", "~800 fpm"],
    ],
  },
]

export function Math() {
  return (
    <section id="math" className="relative py-32 md:py-44 border-t border-border/50">
      <div className="section-frame">
        <FadeIn className="mb-12 max-w-[60ch]">
          <p className="eyebrow">Section 08 · The mathematics</p>
          <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-foreground">
            Six equations, one principle: keep <InlineMathSafe expr="m_{150} - m_{90}" /> at zero.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-lg border border-border bg-card p-3 md:p-6">
            <DDMVisual />
          </div>
        </FadeIn>

        <div className="mt-20 space-y-20">
          {stages.map((s) => (
            <FadeIn key={s.n}>
              <div className="grid grid-cols-1 md:grid-cols-[88px_1fr] gap-x-10 gap-y-6">
                <div className="font-mono text-[11px] tracking-[0.25em] text-text-tertiary tabular-nums pt-1">
                  STAGE {s.n}
                </div>
                <div>
                  <h3 className="text-[22px] font-semibold tracking-[-0.01em] text-foreground mb-6">{s.title}</h3>
                  <div className="rounded-md border border-border bg-bg-subtle/60 p-7 overflow-x-auto">
                    <BlockMath math={s.math} />
                  </div>
                  {s.legend && (
                    <ul className="mt-6 space-y-2 font-mono text-[13px]">
                      {s.legend.map(([sym, def]) => (
                        <li key={sym} className="flex items-baseline gap-4">
                          <span className="text-loc tabular-nums min-w-[80px]">
                            <InlineMathSafe expr={sym} />
                          </span>
                          <span className="text-muted-foreground">{def}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.bullets && (
                    <ul className="mt-6 space-y-2.5 font-mono text-[13px]">
                      {s.bullets.map(([k, v, color]) => (
                        <li key={k} className="flex items-baseline gap-4 flex-wrap">
                          <span style={{ color }} className="inline-flex items-center gap-2">
                            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                            {k}
                          </span>
                          <span className="text-foreground tabular-nums">→ {v}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.rule && (
                    <div className="mt-6 grid grid-cols-3 gap-px bg-border rounded-md overflow-hidden border border-border max-w-[440px]">
                      {s.rule.map(([k, v]) => (
                        <div key={k} className="bg-card p-4">
                          <div className="font-mono text-[12px] tabular-nums text-loc">{k}</div>
                          <div className="mt-1 font-mono text-[12px] tabular-nums text-foreground">{v}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {s.note && (
                    <p className="mt-6 text-[14px] leading-[1.7] text-muted-foreground max-w-[64ch]">{s.note}</p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Deep insight */}
        <FadeIn className="mt-24">
          <div className="border-l-2 border-loc pl-7 max-w-[68ch]">
            <p className="eyebrow text-loc">The deep insight</p>
            <p className="mt-4 text-[18px] leading-[1.65] text-foreground/90">
              The aircraft is essentially a <span className="font-medium text-foreground">null detector</span>. It doesn't know its position, altitude, runway location, or even airport identity. It only knows whether <InlineMathSafe expr="m_{150} - m_{90}" /> is positive, negative, or zero — and steers to keep it at zero. The runway geometry, descent angle, and obstacle clearance are encoded in the physical placement and phasing of the ground antennas.
            </p>
          </div>
        </FadeIn>

        {/* Interactive blocks */}
        <FadeIn className="mt-24">
          <p className="eyebrow">Interactive · Descent rate</p>
          <h3 className="mt-3 mb-6 text-[22px] font-semibold tracking-[-0.01em] text-foreground max-w-[56ch]">
            Drag ground speed and watch the vertical speed required to hold a 3° path.
          </h3>
          <DescentCalculator />
        </FadeIn>

        <FadeIn className="mt-20">
          <p className="eyebrow">Interactive · CDI deviation</p>
          <h3 className="mt-3 mb-6 text-[22px] font-semibold tracking-[-0.01em] text-foreground max-w-[56ch]">
            Move the aircraft off the corridor and see what the pilot sees.
          </h3>
          <CDIVisualizer />
        </FadeIn>
      </div>
    </section>
  )
}

function InlineMathSafe({ expr }: { expr: string }) {
  return <InlineMath math={expr} />
}
