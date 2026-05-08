import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getEndOfWeek(): Date {
  const now = new Date()
  // Sunday = day 0, so daysUntilSunday gets distance to next Sunday 23:59:59
  const day = now.getDay() // 0 = Sun, 1 = Mon … 6 = Sat
  const daysUntilSunday = day === 0 ? 0 : 7 - day
  const end = new Date(now)
  end.setDate(now.getDate() + daysUntilSunday)
  end.setHours(23, 59, 59, 0)
  return end
}

function calcTimeLeft(end: Date): TimeLeft {
  const diff = Math.max(0, end.getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

const endOfWeek = getEndOfWeek()

export default function OfferTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(endOfWeek))
  const [expired, setExpired] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const next = calcTimeLeft(endOfWeek)
      setTimeLeft(next)
      if (
        next.days === 0 &&
        next.hours === 0 &&
        next.minutes === 0 &&
        next.seconds === 0
      ) {
        setExpired(true)
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (expired || dismissed) return null

  const blocks = [
    { value: pad(timeLeft.days), label: "ДН" },
    { value: pad(timeLeft.hours), label: "ЧАС" },
    { value: pad(timeLeft.minutes), label: "МИН" },
    { value: pad(timeLeft.seconds), label: "СЕК" },
  ]

  const scrollToContact = () => {
    const el = document.getElementById("contact")
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 24,
        behavior: "smooth",
      })
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, hsl(240 10% 5%) 0%, hsl(263 60% 12%) 40%, hsl(263 50% 10%) 70%, hsl(240 10% 5%) 100%)",
        }}
      >
        {/* decorative glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/3 top-0 w-64 h-full bg-primary/10 blur-3xl" />
          <div className="absolute right-1/4 top-0 w-48 h-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Title */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Icon name="Percent" size={16} className="text-primary" />
              </div>
              <p className="text-sm md:text-base font-semibold text-white leading-tight">
                <span className="text-primary">Скидка 10%</span> на SEO-продвижение и консультацию —
                только до конца недели
              </p>
            </div>

            {/* Timer blocks + CTA */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Countdown */}
              <div className="flex items-center gap-1.5">
                {blocks.map((block, i) => (
                  <div key={block.label} className="flex items-center gap-1.5">
                    <div className="flex flex-col items-center">
                      <motion.span
                        key={block.value}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-lg md:text-xl font-bold text-white tabular-nums leading-none"
                      >
                        {block.value}
                      </motion.span>
                      <span className="text-[10px] font-medium text-primary/80 tracking-wider leading-none mt-0.5">
                        {block.label}
                      </span>
                    </div>
                    {i < blocks.length - 1 && (
                      <span className="text-primary/60 font-bold text-base leading-none mb-2">:</span>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                size="sm"
                onClick={scrollToContact}
                className="text-xs md:text-sm font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow whitespace-nowrap"
              >
                Успеть со скидкой
              </Button>

              {/* Dismiss */}
              <button
                onClick={() => setDismissed(true)}
                aria-label="Закрыть"
                className="p-1 text-white/40 hover:text-white/80 transition-colors shrink-0"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
