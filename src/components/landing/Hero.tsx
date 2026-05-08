import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

export default function Hero() {
  const [text, setText] = useState("")
  const words = ["Telegram", "WhatsApp", "Viber & IMO", "SMS", "автоворонки", "Python-боты"]
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    let i = 0
    setText("")
    const currentWord = words[wordIndex]
    const typingInterval = setInterval(() => {
      if (i < currentWord.length) {
        setText(currentWord.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length)
        }, 1800)
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [wordIndex])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  const [clientCount, setClientCount] = useState(0)

  useEffect(() => {
    const target = 523
    const duration = 1800
    const step = Math.ceil(target / (duration / 16))
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      setClientCount(current)
      if (current >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    { value: "8+", label: "Лет в Диджитал" },
    { value: "50+", label: "Реализованных проектов" },
    { value: `${clientCount}+`, label: "Довольных клиентов" },
  ]

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl animate-glow-pulse pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-primary" />
                </span>
                Digital-эксперт с командой
              </div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold">
                <Icon name="Sparkles" size={14} />
                Партнёр Т-Банк Кэшбек
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-[1.1]">
              Привлекаем клиентов через{" "}
              <span className="gradient-text">{text}</span>
              <span className="animate-blink text-primary">|</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              RichSMM — рассылки, лидогенерация и автоворонки для бизнеса, физ. лиц и Telegram-каналов. Разработка на Python любой сложности.{" "}
              <span className="text-foreground font-semibold">8+ лет опыта</span>, своя команда, 500+ клиентов.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow" onClick={() => scrollToSection("contact")}>
                Получить консультацию
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("video")}>
                <Icon name="PlayCircle" size={16} className="mr-2" />
                Смотреть видео
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">Сейчас онлайн</span> — отвечу за 15 минут
              </span>
            </div>

            <div className="flex items-center gap-3 mt-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-background bg-gradient-to-br from-primary/40 to-violet-500/40" />
                ))}
              </div>
              <span>
                <span className="text-foreground font-semibold">500+ клиентов</span> уже работают с нами
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
                  <img
                    src="https://cdn.poehali.dev/projects/660a37a1-4c8b-4667-b077-daacd102c4a3/bucket/8ebfb795-12bd-4069-b1a9-adea9f9f64e8.jpg"
                    alt="RichSMM"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                  8+ лет
                </div>
                <div className="absolute top-1 left-1 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full border border-border">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Онлайн
                </div>
              </div>
            </div>
            <div className="relative grid grid-cols-2 gap-4">
              {[
                { icon: "Send", label: "Telegram", color: "from-sky-500/20 to-sky-600/5" },
                { icon: "MessageCircle", label: "WhatsApp", color: "from-green-500/20 to-green-600/5" },
                { icon: "Radio", label: "Viber & IMO", color: "from-violet-500/20 to-violet-600/5" },
                { icon: "Target", label: "Лидогенерация", color: "from-pink-500/20 to-pink-600/5" },
                { icon: "Workflow", label: "Автоворонки", color: "from-yellow-500/20 to-yellow-600/5" },
                { icon: "Code2", label: "Python разработка", color: "from-primary/20 to-primary/5" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`bg-gradient-to-br ${item.color} border border-border rounded-2xl p-5 flex flex-col items-center gap-3 hover:scale-105 transition-transform`}
                >
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Icon name={item.icon as "MessageSquare"} size={24} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-center">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block">
        <button onClick={() => scrollToSection("about")} className="animate-bounce">
          <ArrowRight className="h-6 w-6 transform rotate-90" />
        </button>
      </div>
    </section>
  )
}