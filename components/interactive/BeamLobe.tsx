"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

/**
 * Beam-lobe interactive. Pure HTML + CSS + Framer Motion.
 *
 * Single source of truth: ANTENNA + PATH_END. Lobes (clip-path triangles)
 * and the aircraft all derive from pointOnPath(t) so they line up exactly.
 */

const ANTENNA = { left: 8, top: 78 } // % from top-left of the diagram
const PATH_END = { left: 95, top: 30 } // % — far upper-right end of the visible path
const GROUND_Y = 88 // % — runway/ground level
const UPPER_LIMIT_Y = 6 // % — top edge of 90 Hz lobe at the far end
const AIRCRAFT_T = 0.5 // aircraft sits at this fraction along the visible path

function pointOnPath(t: number) {
  return {
    left: ANTENNA.left + t * (PATH_END.left - ANTENNA.left),
    top: ANTENNA.top + t * (PATH_END.top - ANTENNA.top),
  }
}

export function BeamLobe() {
  // -100 (far below path) to +100 (far above path)
  const [pos, setPos] = useState(0)

  // Gaussian lobe amplitudes — peaks at +50 (90 Hz, above) and -50 (150 Hz, below)
  const amp = (offset: number) => Math.exp(-Math.pow((pos - offset) / 70, 2))
  const a150 = amp(-50)
  const a90 = amp(50)
  const ddm = a150 - a90
  const ddmDisplay = ddm.toFixed(3)
  const onPath = Math.abs(ddm) < 0.04

  // Aircraft position: anchored on the path at AIRCRAFT_T, then offset vertically
  // by `pos`. pos = +100 → 20% UP from the path; pos = -100 → 12% DOWN.
  const onPathPoint = pointOnPath(AIRCRAFT_T)
  const verticalOffsetPct = pos > 0 ? -pos * 0.20 : -pos * 0.12
  const acLeft = onPathPoint.left
  const acTop = onPathPoint.top + verticalOffsetPct

  // Clip-paths anchored to ANTENNA + PATH_END
  const upperLobeClip = `polygon(${ANTENNA.left}% ${ANTENNA.top}%, ${PATH_END.left}% ${PATH_END.top}%, ${PATH_END.left}% ${UPPER_LIMIT_Y}%)`
  const lowerLobeClip = `polygon(${ANTENNA.left}% ${ANTENNA.top}%, ${PATH_END.left}% ${PATH_END.top}%, ${PATH_END.left}% ${GROUND_Y}%)`

  // Path-line geometry (rotated div anchored at antenna, extending right)
  const dxPct = PATH_END.left - ANTENNA.left
  const dyPct = PATH_END.top - ANTENNA.top
  // Container aspect: 1.625:1 (matches aspect-[13/8]). Convert pct → pixel ratio.
  const ASPECT = 13 / 8
  const dxRel = dxPct * ASPECT
  const dyRel = dyPct
  const pathAngle = Math.atan2(dyRel, dxRel) * (180 / Math.PI)
  const pathLenPct = Math.sqrt(dxPct * dxPct + (dyPct / ASPECT) * (dyPct / ASPECT))

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
        {/* Diagram column */}
        <div className="relative aspect-[13/8] bg-[linear-gradient(to_bottom,#0a0e14_0%,#0e131b_100%)] overflow-hidden">
          {/* 90 Hz upper lobe */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: upperLobeClip,
              background:
                "radial-gradient(circle at 8% 78%, rgba(59,139,212,0.35) 0%, rgba(59,139,212,0.14) 50%, rgba(59,139,212,0) 100%)",
            }}
          />
          {/* 150 Hz lower lobe */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: lowerLobeClip,
              background:
                "radial-gradient(circle at 8% 78%, rgba(239,159,39,0.30) 0%, rgba(239,159,39,0.12) 50%, rgba(239,159,39,0) 100%)",
            }}
          />

          {/* Ground line */}
          <div
            className="absolute left-0 right-0 h-px bg-border"
            style={{ top: `${GROUND_Y}%` }}
          />

          {/* Glide path — dashed line, rotated div with right end at PATH_END */}
          <div
            className="absolute origin-left h-px"
            style={{
              left: `${ANTENNA.left}%`,
              top: `${ANTENNA.top}%`,
              width: `${pathLenPct}%`,
              transform: `rotate(${pathAngle}deg)`,
              transformOrigin: "left center",
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(93,202,165,0.85) 0 5px, transparent 5px 9px)",
              boxShadow: "0 0 6px rgba(93,202,165,0.45)",
            }}
          />

          {/* GS antenna — anchored exactly at ANTENNA point */}
          <div
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${ANTENNA.left}%`, top: `${ANTENNA.top}%` }}
          >
            <div className="relative h-12 w-px bg-gs mx-auto">
              <span className="absolute left-1/2 -translate-x-1/2 top-1 h-1 w-6 bg-gs rounded-sm" />
              <span className="absolute left-1/2 -translate-x-1/2 top-4 h-1 w-6 bg-gs rounded-sm" />
              <span className="absolute left-1/2 -translate-x-1/2 top-7 h-1 w-6 bg-gs rounded-sm" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-1 h-2 w-2 rounded-full bg-gs" />
            </div>
          </div>

          {/* Lobe labels */}
          <span
            className="absolute font-mono text-[10px] tracking-[0.12em] text-gs font-semibold pointer-events-none"
            style={{ left: `${PATH_END.left - 12}%`, top: `${UPPER_LIMIT_Y + 4}%` }}
          >
            90 Hz
          </span>
          <span
            className="absolute font-mono text-[10px] tracking-[0.12em] text-loc font-semibold pointer-events-none"
            style={{ left: `${PATH_END.left - 12}%`, top: `${GROUND_Y - 8}%` }}
          >
            150 Hz
          </span>

          {/* Aircraft — sits ON the path when pos=0 */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
            style={{ left: `${acLeft}%`, top: `${acTop}%` }}
          >
            <div className="relative flex items-center justify-center">
              <span
                className={`absolute h-8 w-8 rounded-full -z-0 ${
                  onPath ? "bg-onpath/15" : "bg-foreground/10"
                }`}
              />
              <span
                className={`relative text-[22px] leading-none ${
                  onPath ? "text-onpath" : "text-foreground"
                }`}
                aria-hidden
              >
                ✈
              </span>
            </div>
          </div>
        </div>

        {/* Right column — controls + readout */}
        <div className="p-7 flex flex-col gap-6 bg-bg-subtle/40 border-t md:border-t-0 md:border-l border-border">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3">
              Received signal strength
            </p>
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
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">
              Aircraft vertical position
            </p>
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

          <div className="pt-5 border-t border-border">
            <div className="flex items-baseline justify-between mb-2">
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                DDM
              </p>
              <span
                className={`font-mono text-[11px] tracking-[0.15em] uppercase ${
                  onPath ? "text-onpath" : "text-muted-foreground"
                }`}
              >
                {onPath ? "● ON PATH" : "○"}
              </span>
            </div>
            <div
              className={`font-mono text-3xl tabular-nums ${
                onPath ? "text-onpath" : "text-foreground"
              }`}
            >
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
