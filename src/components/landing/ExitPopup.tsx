import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export default function ExitPopup() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Не показывать если уже был закрыт в этой сессии
    if (sessionStorage.getItem("popup_dismissed")) return

    const timer = setTimeout(() => {
      setShow(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setShow(false)
    setDismissed(true)
    sessionStorage.setItem("popup_dismissed", "1")
  }

  const handleCta = () => {
    handleDismiss()
    const el = document.getElementById("contact")
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 20, behavior: "smooth" })
  }

  if (dismissed) return null

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleDismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="fixed inset-x-4 bottom-6 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md z-50"
          >
            <div className="bg-card border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden">
              {/* Gradient top strip */}
              <div className="h-1 bg-gradient-to-r from-primary via-violet-500 to-primary" />

              <div className="p-6">
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="X" size={18} />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Icon name="Gift" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wide">Специально для вас</p>
                    <h3 className="text-lg font-bold leading-tight">Бесплатный расчёт рассылки</h3>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  Вы уже несколько минут изучаете сайт — значит, задача есть. Напишите прямо сейчас, и я бесплатно рассчитаю стоимость и подберу лучший канал под вашу аудиторию.
                </p>

                <ul className="space-y-2 mb-5">
                  {[
                    "Ответ за 15 минут",
                    "Расчёт бесплатно, без обязательств",
                    "Работаю официально на ИП, СБП",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium">
                      <Icon name="Check" size={14} className="text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-2">
                  <Button onClick={handleCta} className="w-full group" size="lg">
                    <Icon name="Send" size={16} className="mr-2" />
                    Получить расчёт бесплатно
                  </Button>
                  <a
                    href="https://t.me/richsmm1"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDismiss}
                    className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    Написать в Telegram @richsmm1 →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
