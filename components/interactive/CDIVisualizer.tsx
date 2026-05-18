"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

/**
 * Course Deviation Indicator — the simple, classic 5-dot CDI.
 * Two sliders for lateral and vertical offset; the cross-needles deflect
 * accordingly, the DDM values update, and the mini top-down view shows the
 * aircraft's position relative to the ideal approach corridor.
 */
export function CDIVisualizer() {
  // -1 to 1 (full scale deflection)
  const [lat, setLat] = useState(0)
  const [vert, setVert] = useState(0)

  // DDM full-scale: LOC = 0.155, GS = 0.175
  const locDDM = (lat * 0.155).toFixed(3)
  const gsDDM = (vert * 0.175).toFixed(3)

  // Needle positions in CDI gauge (gauge is 140x140 centered at 70,70)
  // ±100% deflection = ±40 px
  const horizNeedleY = 70 + vert * 40
  const vertNeedleX = 70 + lat * 40

  const onPath = Math.abs(lat) < 0.05 && Math.abs(vert) < 0.05

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
        {/* Left: CDI gauge */}
        <div className="p-8 flex flex-col items-center justify-center bg-bg-subtle/40 border-b md:border-b-0 md:border-r border-border">
          <div className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-4">CDI / HSI</div>
          <svg viewBox="0 0 140 140" width="180" height="180">
            {/* Outer ring */}
            <circle cx="70" cy="70" r="64" fill="#0a0e14" stroke="#2a3441" strokeWidth="1.5" />
            <circle cx="70" cy="70" r="56" fill="none" stroke="#2a3441" strokeWidth="0.5" strokeDasharray="2 4" />

            {/* Scale dots — 5 left, 5 right, 5 up, 5 down */}
            {[-4, -3, -2, -1, 1, 2, 3, 4].map((i) => (
              <g key={`dot-${i}`}>
                <circle cx={70 + i * 10} cy="70" r="1.2" fill="#6b7785" />
                <circle cx="70" cy={70 + i * 10} r="1.2" fill="#6b7785" />
              </g>
            ))}
            {/* Center cross marker */}
            <line x1="62" y1="70" x2="78" y2="70" stroke="#9ba8b8" strokeWidth="0.6" />
            <line x1="70" y1="62" x2="70" y2="78" stroke="#9ba8b8" strokeWidth="0.6" />

            {/* Glide slope needle (horizontal — moves up/down) */}
            <line
              x1="22"
              y1={horizNeedleY}
              x2="118"
              y2={horizNeedleY}
              stroke={Math.abs(vert) < 0.05 ? "#5dcaa5" : "#3b8bd4"}
              strokeWidth="2.4"
              strokeLinecap="round"
              style={{ transition: "y1 0.15s, y2 0.15s, stroke 0.2s" }}
            />

            {/* Localizer needle (vertical — moves left/right) */}
            <line
              x1={vertNeedleX}
              y1="22"
              x2={vertNeedleX}
              y2="118"
              stroke={Math.abs(lat) < 0.05 ? "#5dcaa5" : "#ef9f27"}
              strokeWidth="2.4"
              strokeLinecap="round"
              style={{ transition: "x1 0.15s, x2 0.15s, stroke 0.2s" }}
            />

            {/* Aircraft symbol — fixed center */}
            <g>
              <path d="M 56 70 L 84 70" stroke="#e8ecf1" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M 70 64 L 70 76" stroke="#e8ecf1" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="70" cy="70" r="2.5" fill="#e8ecf1" />
            </g>

            {onPath && (
              <circle cx="70" cy="70" r="62" fill="none" stroke="#5dcaa5" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" values="62;68;62" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
          </svg>
          <div className="mt-4 font-mono text-[11px] tracking-[0.15em] uppercase">
            {onPath ? (
              <span className="text-onpath">● established</span>
            ) : (
              <span className="text-muted-foreground">○ off course</span>
            )}
          </div>
        </div>

        {/* Right: controls + readouts */}
        <div className="p-8 flex flex-col gap-7">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <p className="font-mono text-[10px] tracking-[0.2em] text-loc uppercase">Lateral offset</p>
              <span className="font-mono text-[11px] text-muted-foreground tabular-nums">DDM {locDDM}</span>
            </div>
            <Slider
              value={[lat * 100]}
              onValueChange={(v) => setLat(v[0] / 100)}
              min={-100}
              max={100}
              step={1}
              aria-label="Lateral offset from centerline"
            />
            <div className="flex justify-between text-[9px] font-mono text-muted-foreground/70 tabular-nums mt-2 uppercase">
              <span>left</span>
              <span>centerline</span>
              <span>right</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <p className="font-mono text-[10px] tracking-[0.2em] text-gs uppercase">Vertical offset</p>
              <span className="font-mono text-[11px] text-muted-foreground tabular-nums">DDM {gsDDM}</span>
            </div>
            <Slider
              value={[-vert * 100]}
              onValueChange={(v) => setVert(-v[0] / 100)}
              min={-100}
              max={100}
              step={1}
              aria-label="Vertical offset from glide path"
            />
            <div className="flex justify-between text-[9px] font-mono text-muted-foreground/70 tabular-nums mt-2 uppercase">
              <span>above</span>
              <span>on path</span>
              <span>below</span>
            </div>
          </div>

          {/* Mini corridor visualization */}
          <div className="pt-4 border-t border-border">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3">Approach corridor</p>
            <div className="relative h-24 rounded-md border border-border bg-bg-subtle/40 overflow-hidden">
              {/* Centerline */}
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 border-t border-dashed border-onpath/40" />
              {/* Aircraft icon — positioned by lat/vert */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150"
                style={{
                  transform: `translate(calc(-50% + ${lat * 80}px), calc(-50% + ${vert * 16}px))`,
                }}
              >
                <div className={`text-[18px] leading-none ${onPath ? "text-onpath" : "text-foreground"}`}>✈</div>
              </div>
              <span className="absolute left-3 bottom-2 font-mono text-[9px] tracking-[0.1em] text-muted-foreground/70 uppercase">
                Runway →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
