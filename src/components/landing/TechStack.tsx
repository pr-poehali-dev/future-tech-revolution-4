import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

interface Service {
  icon: string
  title: string
  description: string
  price: string
  priceNote: string
  features: string[]
  tag: string
}

export default function TechStack() {
  const [selectedService, setSelectedService] = useState<number | null>(null)

  const services: Service[] = [
    {
      icon: "Send",
      title: "Telegram-рассылки",
      description: "Личные сообщения и инвайтинг в Telegram",
      price: "5 ₽",
      priceNote: "за сообщение / инвайт",
      tag: "Популярно",
      features: [
        "Рассылка в личные сообщения — 5 ₽/шт",
        "Инвайтинг в группы/каналы — 5 ₽/чел",
        "Чекинг номеров — 0,15 ₽/номер",
        "100% доходимость сообщений",
        "Сообщения остаются даже после бана",
        "Точное попадание в целевую аудиторию",
      ],
    },
    {
      icon: "MessageCircle",
      title: "WhatsApp-рассылки",
      description: "Охват аудитории в самом популярном мессенджере",
      price: "5 ₽",
      priceNote: "за сообщение",
      tag: "Высокий охват",
      features: [
        "Рассылка в личные сообщения — 5 ₽/шт",
        "Чекинг номеров — бесплатно",
        "Текст, фото, видео, документы",
        "Высокий процент прочтения (95%+)",
        "Двусторонняя связь с клиентами",
        "Статистика и отчёт по рассылке",
      ],
    },
    {
      icon: "Radio",
      title: "Viber-рассылки",
      description: "Продвижение через сообщения Viber",
      price: "3,5 ₽",
      priceNote: "за сообщение",
      tag: "Выгодно",
      features: [
        "Рассылка в личные сообщения — 3,5 ₽/шт",
        "Чекинг номеров — 0,04 ₽/номер",
        "Текст, фото, кнопки CTA",
        "Высокое доверие аудитории",
        "Детальная аналитика",
        "Отчёт по каждой рассылке",
      ],
    },
    {
      icon: "MessageSquare",
      title: "IMO-рассылки",
      description: "Рассылки через мессенджер IMO",
      price: "2,5 ₽",
      priceNote: "за сообщение",
      tag: "Дёшево",
      features: [
        "Рассылка в личные сообщения — 2,5 ₽/шт",
        "Чекинг номеров — бесплатно",
        "Широкая аудитория СНГ",
        "Быстрая доставка",
        "Текст и медиафайлы",
        "Отчёт по доставке",
      ],
    },
    {
      icon: "MessageSquare",
      title: "SMS-рассылки",
      description: "Классические SMS — доходят на любой телефон без интернета",
      price: "4 ₽",
      priceNote: "за сообщение",
      tag: "Без интернета",
      features: [
        "DEF-канал (цифровой номер) — 4 ₽/шт",
        "Доставка без интернета на любой номер",
        "Доставка на все операторы РФ и СНГ",
        "Персонализация сообщений",
        "Отчёты о доставке в реальном времени",
        "Плановые отправки по расписанию",
      ],
    },
    {
      icon: "Target",
      title: "Лидогенерация для бизнеса",
      description: "Платите только за реальных целевых клиентов — никаких рисков",
      price: "от 50 ₽",
      priceNote: "за лида (пакетная система)",
      tag: "Только за результат",
      features: [
        "Фиксированная цена за каждого лида",
        "Пакетная система — выгоднее с объёмом",
        "Только целевые контакты вашей ниши",
        "Без слива бюджета на нецелевую аудиторию",
        "Прозрачная отчётность по каждому лиду",
        "Подходит для любой ниши и города",
      ],
    },
    {
      icon: "Workflow",
      title: "Автоворонки и автоматизация",
      description: "Настройка автоворонок и интеграций любого уровня сложности",
      price: "индивидуально",
      priceNote: "обсуждается под задачу",
      tag: "Под ключ",
      features: [
        "Автоворонки продаж в мессенджерах",
        "Интеграция с CRM (Bitrix24, AmoCRM и др.)",
        "Цепочки писем, напоминаний, прогревов",
        "Сегментация и автоматические сценарии",
        "Связка с сайтом, формами, платёжными системами",
        "Сопровождение и оптимизация воронок",
      ],
    },
    {
      icon: "Code2",
      title: "Разработка на Python",
      description: "Сайты, десктоп-приложения, боты, парсеры — любая сложность",
      price: "по запросу",
      priceNote: "уточняйте у менеджера",
      tag: "Любая сложность",
      features: [
        "Веб-сайты и веб-приложения",
        "Десктоп-приложения для Windows/Mac/Linux",
        "Боты для Telegram, WhatsApp, Viber",
        "Парсинг данных и API-интеграции",
        "CRM и аналитические системы",
        "Техподдержка и развитие проекта",
      ],
    },
    {
      icon: "BrainCircuit",
      title: "Стратегическая консультация",
      description: "Персональный маркетинговый разбор и план продвижения для вашего бизнеса или проекта",
      price: "от 10 000 ₽",
      priceNote: "обсуждается индивидуально",
      tag: "Премиум",
      features: [
        "Аудит текущего маркетинга и каналов",
        "Анализ целевой аудитории и конкурентов",
        "Персональный план продвижения на 3–6 месяцев",
        "Подбор каналов: рассылки, трафик, контент",
        "Расчёт бюджета и ROI под вашу нишу",
        "Сопровождение и ответы на вопросы 30 дней",
      ],
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="tech-stack" className="py-20">
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
            Услуги и цены
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Что мы <span className="gradient-text">делаем</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-2">Нажмите на карточку, чтобы увидеть подробности</p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              variants={fadeIn}
            >
              <Card
                className={`h-full cursor-pointer card-lift hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40 ${
                  selectedService === index ? "ring-2 ring-primary border-primary/40" : ""
                }`}
                onClick={() => setSelectedService(selectedService === index ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Icon name={service.icon as "MessageSquare"} size={24} className="text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">{service.tag}</Badge>
                  </div>

                  <h3 className="text-lg font-bold mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <span className="text-sm text-muted-foreground">{service.priceNote}</span>
                  </div>

                  <AnimatePresence>
                    {selectedService === index && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 border-t border-border pt-4"
                      >
                        {service.features.map((feature, fi) => (
                          <motion.li
                            key={fi}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: fi * 0.07 }}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <Icon name="Check" size={14} className="text-primary shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  {selectedService !== index && (
                    <p className="text-xs text-primary mt-2">Нажмите, чтобы узнать подробнее →</p>
                  )}
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
          className="mt-12 text-center text-muted-foreground"
        >
          <p className="max-w-2xl mx-auto mb-3">
            Нужно что-то нестандартное? Разработаем индивидуальное решение под любую задачу.
          </p>
          <p className="text-sm text-primary font-medium">
            ⚠️ Цены могут меняться — актуальную стоимость уточняйте в{" "}
            <a href="https://t.me/richsmm1" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary/80">
              Telegram @richsmm1
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}