import { useState, useRef, useCallback, lazy, Suspense } from "react"
import {
  Hero,
  TrustBar,
  Navbar,
  OfferTimer,
} from "@/components/landing"
import CookieBanner from "@/components/landing/CookieBanner"

// Above the fold — загружаются сразу
import About from "@/components/landing/About"
import TechStack from "@/components/landing/TechStack"

// Below the fold — lazy загрузка
const HowWeWork    = lazy(() => import("@/components/landing/HowWeWork"))
const MessageExamples = lazy(() => import("@/components/landing/MessageExamples"))
const Calculator   = lazy(() => import("@/components/landing/Calculator"))
const Comparison   = lazy(() => import("@/components/landing/Comparison"))
const Guarantees   = lazy(() => import("@/components/landing/Guarantees"))
const PaymentSafety = lazy(() => import("@/components/landing/PaymentSafety"))
const VideoDemo    = lazy(() => import("@/components/landing/VideoDemo"))
const Projects     = lazy(() => import("@/components/landing/Projects"))
const FAQ          = lazy(() => import("@/components/landing/FAQ"))
const Testimonials = lazy(() => import("@/components/landing/Testimonials"))
const ChatReviews  = lazy(() => import("@/components/landing/ChatReviews"))
const Contact      = lazy(() => import("@/components/landing/Contact"))
const Footer       = lazy(() => import("@/components/landing/Footer"))
const TelegramFloat = lazy(() => import("@/components/landing/TelegramFloat"))
const CtaBar       = lazy(() => import("@/components/landing/CtaBar"))
const ExitPopup    = lazy(() => import("@/components/landing/ExitPopup"))

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
        <Suspense fallback={null}>
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
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <TelegramFloat />
        <CtaBar />
        <ExitPopup />
      </Suspense>
      <CookieBanner />
    </div>
  )
}

export default Index
