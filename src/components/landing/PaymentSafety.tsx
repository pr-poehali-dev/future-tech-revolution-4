import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

const items = [
  {
    icon: "Smartphone",
    title: "Оплата через СБП",
    desc: "Быстрый и безопасный перевод по номеру телефона. Без комиссий - мгновенное зачисление.",
  },
  {
    icon: "BadgeCheck",
    title: "Официально на ИП / Самозанятого",
    desc: "Работаю легально. Выдаю чек по 422-ФЗ - для бухгалтерии и отчётности.",
  },
  {
    icon: "FileText",
    title: "Договор и закрывающие документы",
    desc: "Для юр. лиц - заключаем договор, выставляем счёт, предоставляем акт.",
  },
  {
    icon: "Headphones",
    title: "Поддержка после оплаты",
    desc: "На связи в Telegram - отвечаю быстро, помогаю с настройкой и решаю вопросы по ходу работы.",
  },
]

export default function PaymentSafety() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="payment" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Безопасная оплата</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Платите <span className="gradient-text">безопасно</span> и удобно
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-2">
            Работаю официально - никаких серых схем. Все способы оплаты прозрачны и защищены.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              variants={fadeIn}
            >
              <Card className="h-full card-lift hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={item.icon as "Sparkles"} size={22} className="text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={fadeIn}
          className="mt-10 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
            <div className="bg-primary/20 p-4 rounded-2xl shrink-0">
              <Icon name="ShieldCheck" size={28} className="text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-bold mb-1">Работаем официально</h4>
              <p className="text-sm text-muted-foreground">
                ИП с 2017 года. Договор, счёт, закрывающие документы - всё по запросу. Никаких рисков для вашей бухгалтерии.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}