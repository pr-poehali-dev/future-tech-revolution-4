import {
  Hero,
  About,
  TechStack,
  Projects,
  Testimonials,
  Contact,
  Footer,
  Navbar,
} from "@/components/landing"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default Index
