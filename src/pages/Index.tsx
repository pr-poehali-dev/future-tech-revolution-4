import {
  Hero,
  About,
  TechStack,
  HowWeWork,
  Guarantees,
  Calculator,
  Comparison,
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
        <About />
        <TechStack />
        <HowWeWork />
        <Calculator />
        <Comparison />
        <Guarantees />
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
