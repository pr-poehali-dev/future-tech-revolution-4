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
  Projects,
  FAQ,
  Testimonials,
  Contact,
  Footer,
  Navbar,
  TelegramFloat,
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
    </div>
  )
}

export default Index