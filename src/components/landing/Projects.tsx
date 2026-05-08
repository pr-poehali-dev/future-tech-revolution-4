import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronDown } from "lucide-react"
import Icon from "@/components/ui/icon"

interface Project {
  id: number
  title: string
  shortDescription: string
  description: string
  tags: string[]
  features: string[]
  result: string
  fullDescription: string
  icon: string
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "SMS-кампания для ритейл-сети",
      shortDescription: "Массовая SMS-рассылка для сети магазинов с персонализацией и аналитикой",
      description: "Запустили серию рассылок для сети из 30 магазинов с сегментацией по базе 150 000 клиентов.",
      tags: ["SMS", "Персонализация", "Ритейл"],
      icon: "MessageSquare",
      features: [
        "База 150 000 контактов",
        "Сегментация по покупательской истории",
        "А/Б тестирование текстов",
        "Доставка 99,2%",
        "Отчёт в реальном времени",
      ],
      result: "+23% к продажам в день рассылки",
      fullDescription:
        "Сеть магазинов обратилась к нам для привлечения клиентов в период распродажи. Мы разработали стратегию сегментированной SMS-рассылки: разбили базу на 5 групп по покупательскому поведению, создали персональные тексты для каждой группы и провели A/B тест. Результат — 23% рост продаж в день рассылки и окупаемость кампании в 8x.",
    },
    {
      id: 2,
      title: "WhatsApp-воронка для онлайн-школы",
      shortDescription: "Автоматическая воронка продаж через WhatsApp для образовательного проекта",
      description: "Создали серию прогревающих сообщений для конвертации лидов в покупателей курсов.",
      tags: ["WhatsApp", "Воронка", "EdTech"],
      icon: "MessageCircle",
      features: [
        "12-шаговая воронка прогрева",
        "Автоответы на частые вопросы",
        "Интеграция с платёжной системой",
        "Напоминания о вебинарах",
        "Сегментация по интересам",
      ],
      result: "Конверсия в покупку выросла с 4% до 11%",
      fullDescription:
        "Онлайн-школа английского языка хотела автоматизировать продажи курсов через WhatsApp. Мы разработали 12-шаговую воронку: от первого касания до покупки. Включили прогревающие материалы, автоответы, напоминания о вебинарах и специальные предложения. Конверсия выросла с 4% до 11%, а стоимость привлечения клиента снизилась на 40%.",
    },
    {
      id: 3,
      title: "Telegram-бот для доставки еды",
      shortDescription: "Полноценный бот-магазин с приёмом заказов, оплатой и уведомлениями",
      description: "Разработали бота для ресторана, который принимает заказы и обрабатывает оплату 24/7.",
      tags: ["Telegram-бот", "Python", "Доставка"],
      icon: "Send",
      features: [
        "Каталог блюд с фото и ценами",
        "Корзина и оформление заказа",
        "Онлайн-оплата (СБП, карта)",
        "Статус заказа в реальном времени",
        "Уведомления курьеру и клиенту",
      ],
      result: "Обрабатывает 200+ заказов в день без менеджера",
      fullDescription:
        "Ресторан хотел принимать заказы через Telegram без дополнительного персонала. Мы создали полноценный бот-магазин: красивое меню с фотографиями, корзину, интеграцию с платёжными системами и систему уведомлений. Бот полностью заменил менеджера по приёму заказов — теперь обрабатывает 200+ заказов в день круглосуточно.",
    },
    {
      id: 4,
      title: "Python-парсер для мониторинга цен",
      shortDescription: "Система автоматического мониторинга цен конкурентов с уведомлениями",
      description: "Написали инструмент, который каждый час проверяет цены конкурентов и присылает отчёт.",
      tags: ["Python", "Парсинг", "Аналитика"],
      icon: "Code2",
      features: [
        "Мониторинг 15 сайтов конкурентов",
        "Обновление каждый час",
        "Уведомление при изменении цен",
        "Excel-отчёты по периодам",
        "Дашборд с графиками",
      ],
      result: "Сэкономил 40 часов ручной работы в месяц",
      fullDescription:
        "Интернет-магазин электроники тратил 40 часов в месяц на ручной мониторинг цен конкурентов. Мы разработали Python-систему, которая автоматически проверяет 15 сайтов каждый час, сравнивает цены с собственным прайсом и присылает уведомления при значительных изменениях. Добавили дашборд с историей цен и Excel-отчёты для руководства.",
    },
    {
      id: 5,
      title: "Viber-рассылка для банка",
      shortDescription: "Брендированные Viber-сообщения для информирования клиентов о продуктах",
      description: "Провели серию брендированных рассылок с кнопками CTA для финансовой организации.",
      tags: ["Viber", "Финансы", "Брендинг"],
      icon: "Radio",
      features: [
        "Брендированный отправитель",
        "Кнопки с переходом на сайт",
        "Rich-media контент",
        "Таргетинг по сегментам",
        "Аналитика кликов и конверсий",
      ],
      result: "CTR 8,4% — в 3 раза выше email",
      fullDescription:
        "Банк искал эффективный канал для информирования клиентов о новых продуктах. Мы предложили Viber как альтернативу email: брендированные сообщения с логотипом, кнопками перехода и rich-media. Провели 3 серии рассылок по сегментам клиентской базы. CTR составил 8,4% — это в 3 раза выше среднего показателя email-маркетинга.",
    },
    {
      id: 6,
      title: "Система автоворонки + Web App для Telegram",
      shortDescription: "Не просто бот для заявок — полноценная система продаж прямо внутри Telegram",
      description: "Собственный продукт: автоворонка + Web App мессенджер для бизнеса и владельцев Telegram-каналов.",
      tags: ["Собственный продукт", "Telegram", "Автоворонка"],
      icon: "Zap",
      features: [
        "Web App мессенджер — общение с клиентами внутри Telegram",
        "Автоворонка: прогрев, сегментация, цепочки сообщений",
        "Превращает подписчиков канала в покупателей",
        "Приём оплат и выдача доступа — автоматически",
        "Аналитика: кто читал, кто купил, кто отписался",
      ],
      result: "Конверсия подписчиков в покупателей — до 12%",
      fullDescription:
        "Собственный продукт для бизнеса и владельцев Telegram-каналов. Система объединяет автоворонку продаж и Web App мессенджер прямо внутри Telegram — без сторонних сервисов. Подписчик канала попадает в воронку, получает прогревающие сообщения, проходит квалификацию и конвертируется в клиента автоматически. Оплата, выдача доступа, напоминания — всё без участия менеджера. Подробнее: teletype.in/@richsmm1/GPq2ywkrrKY",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30">
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
            Кейсы
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши проекты</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
            >
              <Card
                className={`group h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                  expandedProject === project.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Icon name={project.icon as "MessageSquare"} size={24} className="text-primary" />
                    </div>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.shortDescription}</p>

                  <div className="bg-primary/10 rounded-lg px-3 py-2 mb-4">
                    <p className="text-sm font-semibold text-primary">📈 {project.result}</p>
                  </div>

                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border pt-4"
                      >
                        <ul className="space-y-1 mb-4">
                          {project.features.map((f, fi) => (
                            <li key={fi} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon name="Check" size={13} className="text-primary shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedProject(project)
                          }}
                        >
                          Подробнее о проекте
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {expandedProject !== project.id && (
                    <div className="flex items-center gap-1 text-xs text-primary mt-2">
                      <ChevronDown size={14} />
                      Подробнее
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Собственный проект: прокси-магазин */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          variants={fadeIn}
          className="mt-10 max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-violet-500/5 overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary/15 text-primary border-primary/20 text-xs font-semibold">Собственный проект</Badge>
            </div>
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-2xl shrink-0">
                <Icon name="Shield" size={36} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Прокси от 10 рублей</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Собственный Telegram-магазин прокси-серверов. IPv4, IPv6, резидентские и мобильные прокси для парсинга, анонимности, автоматизации и рассылок. Быстро, дёшево, без лишних вопросов.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "IPv4", desc: "Стабильные, быстрые" },
                    { label: "IPv6", desc: "Дёшево, пачками" },
                    { label: "Резидентские", desc: "Максимальный траст" },
                    { label: "Мобильные", desc: "4G/5G операторы" },
                  ].map((type) => (
                    <div key={type.label} className="bg-background/60 border border-border rounded-xl p-3 text-center">
                      <p className="font-bold text-sm">{type.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{type.desc}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="http://t.me/proxye_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  <Icon name="Send" size={16} />
                  Открыть магазин в Telegram
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          {selectedProject && (
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription>{selectedProject.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">{selectedProject.fullDescription}</p>
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="font-semibold text-primary">Результат: {selectedProject.result}</p>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  )
}