import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const guarantees = [
  {
    icon: "BarChart3",
    title: "Отчёт по каждой рассылке",
    desc: "Вы видите всё: сколько отправлено, доставлено, сколько переходов. Прозрачность на каждом этапе - никакой воды.",
  },
  {
    icon: "ShieldCheck",
    title: "До 100% доходимость",
    desc: "Только живые качественные аккаунты. Сообщения доходят до получателя и остаются в чате даже если аккаунт забанят.",
  },
  {
    icon: "Target",
    title: "Точное попадание в ЦА",
    desc: "Собираем базу из тематических групп и чатов вашей ниши. Ваше сообщение видят именно те, кому это интересно.",
  },
  {
    icon: "PenTool",
    title: "Бесплатно помогу с текстом",
    desc: "Я лично помогу составить продающий текст (крео) и УТП для вашей рассылки. Бесплатно - просто расскажите о продукте.",
  },
  {
    icon: "TrendingDown",
    title: "Дешевле любой другой рекламы",
    desc: "От 2,5₽ за сообщение. Это в разы дешевле Яндекс.Директа и ВК таргета - без дорогой настройки и специалистов.",
  },
  {
    icon: "MessageSquareHeart",
    title: "Сообщения не исчезают",
    desc: "Даже если аккаунт-отправитель уйдёт в бан - ваше сообщение уже в чате у клиента и никуда не денется.",
  },
]

export default function Guarantees() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="guarantees" className="py-20 bg-muted/30">
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
            Гарантии
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему нам доверяют</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-2">
            Мы не обещаем невозможного - мы даём конкретные результаты и работаем честно
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guarantees.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              variants={fadeIn}
            >
              <Card className="h-full hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-xl w-fit mb-4">
                    <Icon name={item.icon as "BarChart3"} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          variants={fadeIn}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4">
            <Icon name="Info" size={18} className="text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">
              Возврат средств не предусмотрен, так как расходники тратятся при отправке. 
              Зато я лично гарантирую помощь с текстом и стратегией - бесплатно.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}