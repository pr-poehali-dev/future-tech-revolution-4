import {
  Hero,
  About,
  TechStack,
  Projects,
  Guarantees,
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
