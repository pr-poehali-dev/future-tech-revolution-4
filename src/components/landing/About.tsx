import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const advantages = [
    {
      icon: "Users",
      title: "Собственная команда",
      desc: "У нас есть своя команда опытных разработчиков и маркетологов. Никаких фрилансеров — только проверенные профессионалы.",
    },
    {
      icon: "TrendingUp",
      title: "Результат, а не обещания",
      desc: "Каждый проект мы ведём от идеи до запуска. Вы получаете работающий инструмент, который приносит клиентов и прибыль.",
    },
    {
      icon: "GraduationCap",
      title: "Обучение и экспертиза",
      desc: "Помимо услуг, мы проводим обучающие курсы в интернете — делимся знаниями и делаем digital доступным для каждого.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <h3 className="text-2xl font-bold mb-4">8+ лет в digital — ваш бизнес растёт быстрее</h3>
            <p className="text-muted-foreground mb-6">
              RichSMM — это digital-агентство с экспертизой в массовых коммуникациях и разработке. Мы помогаем бизнесу
              выстраивать прямой контакт с клиентами через SMS, WhatsApp, Viber и Telegram, а также создаём
              автоматизированные Python-приложения под любые задачи.
            </p>
            <p className="text-muted-foreground mb-6">
              За 8 лет работы мы реализовали более 50 проектов — от малого бизнеса до крупных компаний. Наш подход
              прост: разбираемся в вашей задаче, предлагаем оптимальное решение и доводим дело до результата.
            </p>
            <p className="text-muted-foreground">
              Мы также проводим обучения в интернете, где делимся практическими знаниями по digital-маркетингу
              и автоматизации — потому что верим в то, что знания меняют бизнес.
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
