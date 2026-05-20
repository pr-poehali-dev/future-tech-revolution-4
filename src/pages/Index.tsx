import { useState, useRef, useCallback } from "react"
import {
  Hero,
  TrustBar,
  About,
  TechStack,
  HowWeWork,
  Guarantees,
  Calculator,
  Comparison,
  PaymentSafety,
  VideoDemo,
  MessageExamples,
  Projects,
  FAQ,
  Testimonials,
  Contact,
  Footer,
  Navbar,
  TelegramFloat,
  CtaBar,
  ExitPopup,
  ChatReviews,
  OfferTimer,
} from "@/components/landing"
import CookieBanner from "@/components/landing/CookieBanner"

const Index = () => {
  const [timerHeight, setTimerHeight] = useState(0)
  const timerRef = useRef<HTMLDivElement>(null)

  const handleTimerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const observer = new ResizeObserver(() => {
        setTimerHeight(node.offsetHeight)
      })
      observer.observe(node)
      setTimerHeight(node.offsetHeight)
    } else {
      setTimerHeight(0)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div ref={handleTimerRef} className="fixed top-0 w-full z-[60]">
        <OfferTimer />
      </div>
      <Navbar timerHeight={timerHeight} />
      <main style={{ paddingTop: timerHeight }}>
        <Hero />
        <TrustBar />
        <About />
        <TechStack />
        <HowWeWork />
        <MessageExamples />
        <Calculator />
        <Comparison />
        <Guarantees />
        <PaymentSafety />
        <VideoDemo />
        <Projects />
        <FAQ />
        <Testimonials />
        <ChatReviews />
        <Contact />
      </main>
      <Footer />
      <TelegramFloat />
      <CtaBar />
      <ExitPopup />
      <CookieBanner />
    </div>
  )
}

export default Index