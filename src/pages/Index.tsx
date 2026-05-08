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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <OfferTimer />
      <Navbar />
      <main>
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
    </div>
  )
}

export default Index