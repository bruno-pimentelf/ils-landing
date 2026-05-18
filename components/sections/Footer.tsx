"use client"

import { FadeIn } from "@/components/motion"

const references = [
  { label: "ICAO Annex 10 — Aeronautical Telecommunications", href: "https://www.icao.int/safety/airnavigation/Pages/aeronautical-telecommunications-icao-annex-10.aspx" },
  { label: "FAA Instrument Flying Handbook (FAA-H-8083-15B)", href: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/instrument_flying_handbook" },
  { label: "Eurocontrol — Skybrary, ILS overview", href: "https://skybrary.aero/articles/instrument-landing-system-ils" },
]

export function Footer() {
  return (
    <footer className="relative pt-28 pb-16 border-t border-border/50">
      <div className="section-frame">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12">
          <FadeIn>
            <p className="eyebrow">Section 12 · Sources</p>
            <h3 className="mt-5 text-[24px] font-semibold tracking-[-0.01em] text-foreground max-w-[40ch]">
              A long-form explainer about a hundred-year-old idea.
            </h3>
            <p className="mt-4 max-w-[58ch] text-[14px] leading-relaxed text-muted-foreground">
              Every fact, equation, and number in this page is drawn from public-source aviation technical literature. Where a detail is approximate it is described as such. Built with Claude Code in a single sitting; no telemetry, no third-party trackers, no client-side analytics.
            </p>

            <div className="mt-10 inline-flex items-center gap-3 rounded-md border border-danger/30 bg-danger/5 px-4 py-2.5 font-mono text-[11px] tracking-[0.15em] text-danger uppercase">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
              Not for operational navigation use
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="eyebrow">References</p>
            <ul className="mt-5 space-y-3.5">
              {references.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-2 text-[14px] leading-relaxed text-foreground/85 hover:text-loc transition-colors"
                  >
                    <span className="text-text-tertiary group-hover:text-loc transition-colors">→</span>
                    <span className="underline-offset-4 group-hover:underline">{r.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="hairline mt-20 mb-8" />
          <div className="flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">
            <span>Built with Claude Code · No tracking · Static site</span>
            <span>ILS · MMXXVI · Edition 001</span>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}
