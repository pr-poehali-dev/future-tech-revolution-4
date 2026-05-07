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
      icon: "MessageSquare",
      title: "SMS-рассылки",
      description: "Мгновенная доставка сообщений на любой номер",
      price: "от 1,5 ₽",
      priceNote: "за сообщение",
      tag: "Популярно",
      features: [
        "Доставка на все операторы РФ и СНГ",
        "Персонализация имени получателя",
        "Отчёты о доставке в реальном времени",
        "Таргетинг по базе клиентов",
        "Плановые отправки по расписанию",
        "Антиспам и легальные маршруты",
      ],
    },
    {
      icon: "MessageCircle",
      title: "WhatsApp-рассылки",
      description: "Охват аудитории в самом популярном мессенджере",
      price: "от 3 ₽",
      priceNote: "за сообщение",
      tag: "Высокий охват",
      features: [
        "Текст, фото, видео, документы",
        "Персональные сообщения по базе",
        "Высокий процент прочтения (95%+)",
        "Двусторонняя связь с клиентами",
        "Интеграция с CRM",
        "Статистика открытий и кликов",
      ],
    },
    {
      icon: "Radio",
      title: "Viber-рассылки",
      description: "Продвижение через брендированные сообщения Viber",
      price: "от 2,5 ₽",
      priceNote: "за сообщение",
      tag: "С кнопками",
      features: [
        "Брендированные сообщения с логотипом",
        "Кнопки с призывом к действию",
        "Поддержка rich-media контента",
        "Официальный канал отправки",
        "Высокое доверие аудитории",
        "Детальная аналитика",
      ],
    },
    {
      icon: "Send",
      title: "Telegram-рассылки и боты",
      description: "Автоматизация и массовые коммуникации в Telegram",
      price: "от 5 000 ₽",
      priceNote: "за разработку бота",
      tag: "Автоматизация",
      features: [
        "Разработка Telegram-ботов под ключ",
        "Рассылки по подписчикам канала",
        "Воронки продаж в боте",
        "Автоответы и сценарии",
        "Интеграция с платёжными системами",
        "Поддержка и обновление",
      ],
    },
    {
      icon: "Code2",
      title: "Python-приложения",
      description: "Разработка любых решений на Python — от ботов до сложных систем",
      price: "от 15 000 ₽",
      priceNote: "за проект",
      tag: "Любая сложность",
      features: [
        "Парсинг и автоматизация данных",
        "Боты для любых платформ",
        "API-интеграции с сервисами",
        "Аналитические системы и дашборды",
        "Автоматизация бизнес-процессов",
        "Техническая поддержка после сдачи",
      ],
    },
    {
      icon: "Smartphone",
      title: "Мобильные и веб-приложения",
      description: "Создаём приложения под ваш бизнес с нуля",
      price: "от 30 000 ₽",
      priceNote: "за проект",
      tag: "Под ключ",
      features: [
        "Анализ задачи и прототипирование",
        "Адаптивный дизайн (mobile-first)",
        "Личный кабинет и авторизация",
        "CRM и база данных",
        "Интеграция с мессенджерами",
        "Сопровождение и развитие проекта",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Что мы делаем</h2>
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
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                  selectedService === index ? "ring-2 ring-primary" : ""
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
          <p className="max-w-2xl mx-auto">
            Нужно что-то нестандартное? Мы разрабатываем индивидуальные решения под любую задачу.
            Напишите — обсудим и рассчитаем стоимость бесплатно.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
