import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

export default function CtaBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 400) setVisible(true)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToContact = () => {
    const el = document.getElementById("contact")
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 20, behavior: "smooth" })
  }

  if (dismissed) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">Онлайн</span>
            </div>
            <button
              onClick={scrollToContact}
              className="flex-1 bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Icon name="Send" size={15} />
              Бесплатный расчёт за 15 мин
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-muted-foreground p-1 shrink-0"
              aria-label="Закрыть"
            >
              <Icon name="X" size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
