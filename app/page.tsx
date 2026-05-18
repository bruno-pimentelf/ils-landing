import { Nav } from "@/components/sections/Nav"
import { Hero } from "@/components/sections/Hero"
import { WhatIs } from "@/components/sections/WhatIs"
import { Timeline } from "@/components/sections/Timeline"
import { Components } from "@/components/sections/Components"
import { TopDownSection } from "@/components/sections/TopDownSection"
import { SideProfileSection } from "@/components/sections/SideProfileSection"
import { AircraftSection } from "@/components/sections/AircraftSection"
import { Math as MathSection } from "@/components/sections/Math"
import { Categories } from "@/components/sections/Categories"
import { FalsePathSection } from "@/components/sections/FalsePathSection"
import { CaseStudy } from "@/components/sections/CaseStudy"
import { BackCourse } from "@/components/sections/BackCourse"
import { WhyEndures } from "@/components/sections/WhyEndures"
import { Footer } from "@/components/sections/Footer"

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top" className="relative">
        <Hero />
        <WhatIs />
        <Timeline />
        <Components />
        <TopDownSection />
        <SideProfileSection />
        <AircraftSection />
        <MathSection />
        <Categories />
        <FalsePathSection />
        <CaseStudy />
        <BackCourse />
        <WhyEndures />
        <Footer />
      </main>
    </>
  )
}
