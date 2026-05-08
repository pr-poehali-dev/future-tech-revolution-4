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
} from "@/components/landing"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
        <Contact />
      </main>
      <Footer />
      <TelegramFloat />
      <CtaBar />
    </div>
  )
}

export default Index