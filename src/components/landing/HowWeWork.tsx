import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const steps = [
  {
    icon: "MessageCircle",
    title: "Заявка",
    desc: "Пишете в Telegram или заполняете форму. Отвечаю за 15 минут в рабочее время.",
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    icon: "Target",
    title: "Обсуждение",
    desc: "Разбираемся в задаче: кто ваша аудитория, что предлагаете. Бесплатно помогаю с текстом и УТП.",
    color: "from-violet-500/20 to-violet-600/5",
  },
  {
    icon: "Zap",
    title: "Запуск",
    desc: "Готовим базу, настраиваем рассылку и запускаем. Всё быстро - без долгих согласований.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: "BarChart3",
    title: "Результат",
    desc: "Получаете подробный отчёт: сколько доставлено, сколько переходов, какая конверсия.",
    color: "from-green-500/20 to-green-600/5",
  },
]

export default function HowWeWork() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="how-we-work" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Процесс</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Как мы работаем</h2>
          <p className="text-muted-foreground max-w-md mx-auto mt-2">
            От заявки до результата - быстро и прозрачно
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line on desktop */}
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 hidden lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              variants={fadeIn}
              className="flex flex-col items-center text-center relative"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} border border-border flex items-center justify-center mb-5 relative z-10`}>
                <Icon name={step.icon as "Zap"} size={28} className="text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}