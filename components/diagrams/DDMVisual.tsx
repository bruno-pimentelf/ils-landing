"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/**
 * Visual derivation of DDM. Top: composite waveform with two-tone envelope.
 * Below: the separated 90 Hz and 150 Hz waveforms. The math collapses them
 * to a single subtraction.
 */
export function DDMVisual() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3, margin: "-30px" })

  // Build waveform paths analytically
  const sampleCount = 400
  const buildPath = (
    width: number,
    height: number,
    fn: (t: number) => number,
    yOffset: number
  ) => {
    let d = ""
    for (let i = 0; i <= sampleCount; i++) {
      const x = (i / sampleCount) * width
      const t = i / sampleCount
      const y = yOffset + (fn(t) * height) / 2
      d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `
    }
    return d
  }

  const width = 1080
  const composite = buildPath(
    width,
    36,
    (t) =>
      Math.cos(2 * Math.PI * 24 * t) *
      (1 + 0.2 * Math.cos(2 * Math.PI * 3 * t) + 0.2 * Math.cos(2 * Math.PI * 5 * t)) *
      0.6,
    72
  )
  const wave90 = buildPath(width, 32, (t) => Math.cos(2 * Math.PI * 3 * t) * 0.55, 196)
  const wave150 = buildPath(width, 32, (t) => Math.cos(2 * Math.PI * 5 * t) * 0.55, 296)

  return (
    <svg
      ref={ref}
      viewBox="0 0 1100 380"
      className="w-full h-auto"
      role="img"
      aria-labelledby="ddm-title ddm-desc"
    >
      <title id="ddm-title">DDM derivation — composite waveform to subtraction</title>
      <desc id="ddm-desc">
        The transmitted carrier carries two simultaneous tones, 90 Hz and 150
        Hz. After demodulation and filtering, the difference between the 150
        Hz and 90 Hz amplitudes — the DDM — drives the needle.
      </desc>

      {/* Composite waveform */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <text
          x={20}
          y={32}
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill="#9ba8b8"
          letterSpacing="0.1em"
        >
          1 · COMPOSITE TRANSMITTED SIGNAL
        </text>
        <line x1="20" y1="72" x2={20 + width} y2="72" stroke="#2a3441" strokeWidth="0.5" />
        <motion.path
          d={composite}
          fill="none"
          stroke="#c084fc"
          strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          transform="translate(20, 0)"
        />
      </motion.g>

      {/* 90 Hz */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <text
          x={20}
          y={156}
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill="#3b8bd4"
          letterSpacing="0.1em"
        >
          2 · 90 Hz TONE — amplitude m₉₀
        </text>
        <line x1="20" y1="196" x2={20 + width} y2="196" stroke="#2a3441" strokeWidth="0.5" />
        <motion.path
          d={wave90}
          fill="none"
          stroke="#3b8bd4"
          strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, delay: 0.9, ease: "easeOut" }}
          transform="translate(20, 0)"
        />
      </motion.g>

      {/* 150 Hz */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <text
          x={20}
          y={256}
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill="#ef9f27"
          letterSpacing="0.1em"
        >
          3 · 150 Hz TONE — amplitude m₁₅₀
        </text>
        <line x1="20" y1="296" x2={20 + width} y2="296" stroke="#2a3441" strokeWidth="0.5" />
        <motion.path
          d={wave150}
          fill="none"
          stroke="#ef9f27"
          strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, delay: 1.4, ease: "easeOut" }}
          transform="translate(20, 0)"
        />
      </motion.g>

      {/* Final result */}
      <motion.g
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <text
          x={20}
          y={356}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="#5dcaa5"
          letterSpacing="0.1em"
          fontWeight="600"
        >
          4 · DDM = m₁₅₀ − m₉₀ → drives the needle
        </text>
      </motion.g>
    </svg>
  )
}
