import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const rows = [
  {
    param: "Старт без подготовки",
    mailing: true,
    mailingNote: "Запуск в тот же день",
    direct: false,
    directNote: "Нужна настройка кампании",
  },
  {
    param: "Нужен эксперт по настройке",
    mailing: false,
    mailingNote: "Не нужен — всё делаем мы",
    direct: true,
    directNote: "Платите специалисту от 15 000₽",
  },
  {
    param: "Минимальный бюджет",
    mailing: true,
    mailingNote: "От 500 ₽",
    direct: false,
    directNote: "От 10 000–20 000 ₽",
  },
  {
    param: "Попадает в реальных людей",
    mailing: true,
    mailingNote: "Живые номера, без ботов",
    direct: false,
    directNote: "До 30% — боты и скликивание",
  },
  {
    param: "Прямой контакт с клиентом",
    mailing: true,
    mailingNote: "Личное сообщение в мессенджер",
    direct: false,
    directNote: "Баннер — можно не заметить",
  },
  {
    param: "Результат виден сразу",
    mailing: true,
    mailingNote: "Отклики в первые часы",
    direct: false,
    directNote: "Нужно 2–4 недели на оптимизацию",
  },
  {
    param: "Цена за контакт",
    mailing: true,
    mailingNote: "От 2,5 ₽ за сообщение",
    direct: false,
    directNote: "От 30–300 ₽ за клик",
  },
]

export default function Comparison() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const scrollToContact = () => {
    const el = document.getElementById("contact")
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset, behavior: "smooth" })
  }

  return (
    <section id="comparison" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Сравнение</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Рассылки vs Яндекс.Директ и Таргет ВК</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mt-2">
            Взял и запустил — без эксперта, без большого бюджета, сразу в цель
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-2 mb-3 text-sm font-bold text-center">
            <div />
            <div className="bg-primary text-primary-foreground rounded-xl py-3 px-2">
              Рассылки RichSMM
            </div>
            <div className="bg-muted rounded-xl py-3 px-2 text-muted-foreground">
              Директ / Таргет ВК
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-2">
            {rows.map((row, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                variants={fadeIn}
                className="grid grid-cols-3 gap-2 items-center"
              >
                <div className="text-sm text-muted-foreground font-medium pr-2">{row.param}</div>
                <div className={`rounded-xl p-3 text-center text-sm ${row.mailing ? "bg-primary/10 border border-primary/20" : "bg-muted/50"}`}>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Icon
                      name={row.mailing ? "Check" : "X"}
                      size={14}
                      className={row.mailing ? "text-primary" : "text-muted-foreground"}
                    />
                    <span className={row.mailing ? "text-primary font-semibold" : "text-muted-foreground"}>
                      {row.mailing ? "Да" : "Нет"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight">{row.mailingNote}</p>
                </div>
                <div className={`rounded-xl p-3 text-center text-sm ${!row.direct ? "bg-muted/50" : "bg-muted/30"}`}>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Icon
                      name={row.direct ? "Check" : "X"}
                      size={14}
                      className={row.direct ? "text-green-500" : "text-red-400"}
                    />
                    <span className="text-muted-foreground">{row.direct ? "Да" : "Нет"}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight">{row.directNote}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            variants={fadeIn}
            className="mt-8 text-center"
          >
            <Button size="lg" onClick={scrollToContact} className="group">
              Запустить рассылку сегодня
              <Icon name="ArrowRight" size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}