"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"

/**
 * Descent rate calculator — ground speed in, vertical speed out. The aircraft
 * icon physically moves faster/slower as the user drags. Live update.
 *
 * Math: fpm = GS_knots · tan(3°) · 101.27 ≈ GS · 5.31
 */
export function DescentCalculator() {
  const [gs, setGs] = useState(120)
  // tan(3°) ≈ 0.05241
  const fpm = Math.round(gs * Math.tan((3 * Math.PI) / 180) * 101.27)
  // Aircraft icon vertical travel speed should scale with fpm. We animate
  // descent over a fixed horizontal distance — slower aircraft = longer
  // duration. Range: ~3s (very fast) to ~7s (slow)
  const duration = Math.max(2.6, 7 - gs / 40)

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px]">
        <div className="relative h-[260px] overflow-hidden bg-[linear-gradient(to_bottom,#0a0e14_0%,#0e131b_100%)]">
          {/* Faint glide path */}
          <svg viewBox="0 0 600 260" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="60" x2="600" y2="220" stroke="#5dcaa5" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 6" />
            <text x="540" y="244" fill="#6b7785" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">3° PATH</text>
            <text x="14" y="50" fill="#6b7785" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">↘ DESCENT</text>
          </svg>

          {/* Animated aircraft icon */}
          <motion.div
            key={gs}
            initial={{ x: 6, y: 28 }}
            animate={{ x: 540, y: 198 }}
            transition={{ duration, ease: "linear", repeat: Infinity, repeatType: "loop" }}
            className="absolute left-0 top-0"
            style={{ willChange: "transform" }}
          >
            <svg width="44" height="20" viewBox="-22 -10 44 20">
              <path d="M -20 0 L 0 -3 L 0 -5 L 12 -5 L 12 5 L 0 5 L 0 3 L -20 0 Z" fill="#e8ecf1" />
              <path d="M -8 -10 L 0 0 L -8 10 Z" fill="#e8ecf1" />
            </svg>
          </motion.div>

          {/* Speed/descent readout overlay */}
          <div className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.15em] text-text-secondary uppercase">
            <div className="flex items-baseline gap-3">
              <span>GS</span>
              <span className="text-foreground tabular-nums text-base font-medium">{gs}</span>
              <span className="text-[10px] text-muted-foreground">kt</span>
            </div>
            <div className="flex items-baseline gap-3 mt-1.5">
              <span>V/S</span>
              <span className="text-onpath tabular-nums text-base font-medium">{fpm.toLocaleString()}</span>
              <span className="text-[10px] text-muted-foreground">fpm</span>
            </div>
          </div>
        </div>

        <div className="p-7 border-t md:border-t-0 md:border-l border-border flex flex-col gap-6 bg-bg-subtle/40">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">Ground speed</p>
            <div className="font-mono text-3xl tabular-nums text-foreground">{gs}<span className="text-muted-foreground text-base ml-2">kt</span></div>
          </div>
          <Slider
            value={[gs]}
            onValueChange={(v) => setGs(v[0])}
            min={80}
            max={200}
            step={1}
            aria-label="Ground speed in knots"
          />
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground tabular-nums">
            <span>80</span>
            <span>140</span>
            <span>200</span>
          </div>
          <div className="pt-5 border-t border-border">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">Required vertical speed</p>
            <div className="font-mono text-3xl tabular-nums text-onpath">{fpm.toLocaleString()}<span className="text-muted-foreground text-base ml-2">fpm</span></div>
            <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
              For a 3° path, vertical speed ≈ ground speed × 5.31. The rule of thumb is half the groundspeed in knots, times ten.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
