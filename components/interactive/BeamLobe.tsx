"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

/**
 * Beam lobe interactive. Slider for aircraft vertical position. Each lobe's
 * effective amplitude is computed from a smooth gaussian-like profile centered
 * on the path angle. DDM lights up bars and an ON PATH indicator.
 */
export function BeamLobe() {
  // -100 (far below path) to +100 (far above path)
  const [pos, pos_] = useState(0)
  const setPos = (n: number) => pos_(Math.max(-100, Math.min(100, n)))

  // Lobe amplitudes — gaussian centered at offset.
  // 150 Hz dominates below the path (negative side), 90 Hz above.
  const amp = (offset: number) => Math.exp(-Math.pow((pos - offset) / 70, 2))
  const a150 = amp(-50) // peak below the path
  const a90 = amp(50) // peak above the path

  const ddm = a150 - a90 // sign convention from brief
  const ddmDisplay = ddm.toFixed(3)
  const onPath = Math.abs(ddm) < 0.04

  // Aircraft Y in the SVG — round to avoid SSR/client floating-point mismatch
  const acY = Number((130 - pos * 0.9).toFixed(2))
  const acX = 280

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
        <div className="relative bg-[linear-gradient(to_bottom,#0a0e14_0%,#0e131b_100%)] p-6">
          <svg viewBox="0 0 520 260" className="w-full h-auto">
            <defs>
              <linearGradient id="bl-upper" x1="0" y1="1" x2="0.2" y2="0">
                <stop offset="0%" stopColor="#3b8bd4" stopOpacity="0" />
                <stop offset="60%" stopColor="#3b8bd4" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#3b8bd4" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="bl-lower" x1="0" y1="0" x2="0.2" y2="1">
                <stop offset="0%" stopColor="#ef9f27" stopOpacity="0" />
                <stop offset="60%" stopColor="#ef9f27" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#ef9f27" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Ground */}
            <line x1="0" y1="230" x2="520" y2="230" stroke="#2a3441" strokeWidth="0.8" />

            {/* GS antenna — capture-effect M-array (3 dipoles) */}
            <rect x="32" y="168" width="3" height="62" fill="#3b8bd4" opacity="0.85" />
            {[0, 1, 2].map((i) => (
              <rect key={i} x="24" y={176 + i * 18} width="20" height="2.5" fill="#3b8bd4" rx="0.5" />
            ))}
            <circle cx="33.5" cy="168" r="2" fill="#3b8bd4" />

            {/* Upper lobe (90 Hz) */}
            <path d="M 35 220 L 520 60 L 520 220 Z" fill="url(#bl-upper)" />
            {/* Lower lobe (150 Hz) — but constrained above ground */}
            <path d="M 35 220 L 520 220 L 520 230 Z" fill="url(#bl-lower)" />
            <path d="M 35 220 L 520 280 L 520 220 Z" fill="url(#bl-lower)" opacity="0.6" />

            {/* On-path line */}
            <line x1="35" y1="220" x2="520" y2="130" stroke="#5dcaa5" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.6" />

            {/* Aircraft icon */}
            <g transform={`translate(${acX}, ${acY})`} style={{ transition: "transform 0.2s ease-out" }}>
              <circle r="14" fill={onPath ? "#5dcaa5" : "#9ba8b8"} fillOpacity="0.12" />
              <path d="M -14 0 L 6 -2 L 6 -3 L 12 -3 L 12 3 L 6 3 L 6 2 L -14 0 Z" fill={onPath ? "#5dcaa5" : "#e8ecf1"} />
              <path d="M -4 -7 L 0 0 L -4 7 Z" fill={onPath ? "#5dcaa5" : "#e8ecf1"} />
            </g>

            {/* Lobe labels */}
            <text x="490" y="84" fontSize="9" fontFamily="var(--font-mono)" fill="#3b8bd4" textAnchor="end" letterSpacing="0.1em">90 Hz</text>
            <text x="490" y="208" fontSize="9" fontFamily="var(--font-mono)" fill="#ef9f27" textAnchor="end" letterSpacing="0.1em">150 Hz</text>
          </svg>
        </div>

        <div className="p-7 flex flex-col gap-6 bg-bg-subtle/40 border-t md:border-t-0 md:border-l border-border">
          {/* DDM signal bars */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3">Received signal strength</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-mono text-[10px] mb-1">
                  <span className="text-gs">90 Hz · m₉₀</span>
                  <span className="tabular-nums text-foreground">{a90.toFixed(2)}</span>
                </div>
                <div className="h-2 rounded-sm bg-bg-base overflow-hidden">
                  <div
                    className="h-full bg-gs rounded-sm"
                    style={{ width: `${a90 * 100}%`, transition: "width 0.15s" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-[10px] mb-1">
                  <span className="text-loc">150 Hz · m₁₅₀</span>
                  <span className="tabular-nums text-foreground">{a150.toFixed(2)}</span>
                </div>
                <div className="h-2 rounded-sm bg-bg-base overflow-hidden">
                  <div
                    className="h-full bg-loc rounded-sm"
                    style={{ width: `${a150 * 100}%`, transition: "width 0.15s" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">Aircraft vertical position</p>
            <Slider
              value={[pos]}
              onValueChange={(v) => setPos(v[0])}
              min={-100}
              max={100}
              step={1}
              aria-label="Aircraft vertical position relative to glide path"
            />
            <div className="flex justify-between text-[9px] font-mono text-muted-foreground/70 tabular-nums mt-2 uppercase">
              <span>far below</span>
              <span>on path</span>
              <span>far above</span>
            </div>
          </div>

          {/* DDM result */}
          <div className="pt-5 border-t border-border">
            <div className="flex items-baseline justify-between mb-2">
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">DDM</p>
              <span
                className={`font-mono text-[11px] tracking-[0.15em] uppercase ${
                  onPath ? "text-onpath" : "text-muted-foreground"
                }`}
              >
                {onPath ? "● ON PATH" : "○"}
              </span>
            </div>
            <div className={`font-mono text-3xl tabular-nums ${onPath ? "text-onpath" : "text-foreground"}`}>
              {ddm > 0 ? "+" : ""}
              {ddmDisplay}
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
              {ddm > 0.04
                ? "More 150 Hz received. The needle says fly up."
                : ddm < -0.04
                ? "More 90 Hz received. The needle says fly down."
                : "The two tones arrive in equal strength. The aircraft is on the glide path."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
