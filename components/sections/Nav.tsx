"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const items = [
  { id: "what-is", label: "Overview", n: "02" },
  { id: "components", label: "Components", n: "04" },
  { id: "topdown", label: "Top-down", n: "05" },
  { id: "side-profile", label: "Side profile", n: "06" },
  { id: "aircraft", label: "Aircraft", n: "07" },
  { id: "math", label: "Math", n: "08" },
  { id: "categories", label: "Categories", n: "09" },
  { id: "false-path", label: "False path", n: "10" },
  { id: "case-study", label: "KSFO 28L", n: "11" },
  { id: "back-course", label: "Back-course", n: "12" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          // pick the one closest to top
          const top = visible.reduce((acc, e) =>
            e.boundingClientRect.top < acc.boundingClientRect.top ? e : acc
          )
          setActive(top.target.id)
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0.05 }
    )
    items.forEach((it) => {
      const el = document.getElementById(it.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5">
        <a
          href="#top"
          className="font-mono text-[11px] tracking-[0.25em] uppercase text-foreground hover:text-loc transition-colors"
        >
          ILS · explainer
        </a>

        <div className="hidden md:flex items-center gap-1">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`px-3 py-1.5 rounded-sm font-mono text-[10px] tracking-[0.15em] uppercase transition-colors relative ${
                active === it.id ? "text-loc" : "text-text-tertiary hover:text-foreground"
              }`}
            >
              {it.label}
              {active === it.id && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-6 bg-loc"
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                />
              )}
            </a>
          ))}
        </div>

        <a
          href="#math"
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary hover:text-loc transition-colors hidden md:inline-flex items-center gap-2"
        >
          <span>Read the math</span>
          <span>→</span>
        </a>
      </div>
    </motion.nav>
  )
}
