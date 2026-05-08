import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(to / (duration / 16))
    const timer = setInterval(() => {
      start = Math.min(start + step, to)
      setCount(start)
      if (start >= to) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const stats = [
    { value: "6 лет", label: "в digital", icon: "Megaphone" },
    { value: "5 лет", label: "в продажах", icon: "TrendingUp" },
    { value: "3 года", label: "в IT", icon: "Code2" },
  ]

  const bigStats = [
    { to: 500, suffix: "+", label: "клиентов" },
    { to: 50, suffix: "+", label: "проектов" },
    { to: 8, suffix: "+", label: "лет опыта" },
    { to: 100, suffix: "%", label: "доходимость" },
  ]

  const advantages = [
    {
      icon: "Users",
      title: "Собственная команда",
      desc: "Своя команда опытных разработчиков и маркетологов. Никаких фрилансеров — только проверенные профессионалы.",
    },
    {
      icon: "TrendingUp",
      title: "Результат, а не обещания",
      desc: "Каждый проект ведём от идеи до запуска. Вы получаете работающий инструмент, который приносит клиентов и прибыль.",
    },
    {
      icon: "ShieldCheck",
      title: "Гарантия результата",
      desc: "Прозрачные отчёты по каждому проекту. Бесплатно помогаю с текстом и УТП — чтобы рассылка реально сработала.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            О нас
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Кто такой RichSMM</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {/* Анимированные цифры */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {bigStats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-5 text-center"
            >
              <p className="text-4xl font-bold text-primary mb-1">
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-2xl border-2 border-primary/20 shrink-0 overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/660a37a1-4c8b-4667-b077-daacd102c4a3/bucket/8ebfb795-12bd-4069-b1a9-adea9f9f64e8.jpg"
                  alt="RichSMM"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">RichSMM</h3>
                <p className="text-muted-foreground text-sm">Digital-эксперт · Разработчик · Предприниматель</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {stats.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                      <Icon name={s.icon as "Code2"} size={11} />
                      {s.value} {s.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-5">
              RichSMM — digital-агентство с экспертизой в массовых коммуникациях и разработке. Помогаю бизнесу
              выстраивать прямой контакт с клиентами через SMS, WhatsApp, Viber и Telegram, а также создаю
              автоматизированные Python-приложения под любые задачи.
            </p>
            <p className="text-muted-foreground mb-5">
              За время работы реализовал более 50 проектов — от малого бизнеса до крупных компаний. Опыт
              в продажах помогает понимать бизнес-задачи, а IT-экспертиза — решать их технически.
            </p>
            <p className="text-muted-foreground">
              Работаю прозрачно и честно: фиксированные цены, отчёт по каждой рассылке, бесплатная консультация
              по тексту и стратегии. Ваш бизнес — мой результат.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {advantages.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                variants={fadeIn}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Icon name={item.icon as "Users"} size={24} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}