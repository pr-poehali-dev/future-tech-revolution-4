import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const items = [
  { icon: "ShieldCheck", text: "Работаем легально" },
  { icon: "Clock", text: "Ответ за 15 минут" },
  { icon: "BadgeCheck", text: "Своя команда" },
  { icon: "TrendingUp", text: "До 100% доходимость" },
  { icon: "Sparkles", text: "Бесплатный расчёт" },
  { icon: "MessageCircle", text: "Консультация по тексту" },
  { icon: "BarChart3", text: "Отчёт по каждой рассылке" },
  { icon: "Users", text: "500+ клиентов" },
]

export default function TrustBar() {
  return (
    <section className="py-8 border-y border-border bg-muted/30 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="flex animate-marquee w-max">
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mx-6 text-sm font-medium text-muted-foreground whitespace-nowrap"
            >
              <Icon name={item.icon as "ShieldCheck"} size={18} className="text-primary" />
              <span>{item.text}</span>
              <span className="ml-6 w-1 h-1 rounded-full bg-primary/40" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
