import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "katex/dist/katex.min.css"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Instrument Landing System — how two radio beams make zero-visibility landings possible",
  description:
    "A long-form explainer of the ILS — the localizer, glide slope, and marker beacons that have guided aircraft to runways since 1938. Mathematics, geometry, and history.",
  metadataBase: new URL("https://ils.local"),
  openGraph: {
    title: "Instrument Landing System",
    description:
      "How two radio beams, an antenna array, and a subtraction make zero-visibility landings possible.",
    type: "article",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-loc/30 selection:text-foreground">
        {children}
      </body>
    </html>
  )
}
