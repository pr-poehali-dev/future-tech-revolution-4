import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

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
      icon: "GraduationCap",
      title: "Обучение и экспертиза",
      desc: "Провожу обучающие курсы в интернете — делюсь практическими знаниями и делаю digital доступным для каждого.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0 overflow-hidden">
                <Icon name="User" size={40} className="text-primary/40" />
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
              Провожу обучения в интернете по digital-маркетингу и автоматизации — делюсь тем, что реально работает.
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
