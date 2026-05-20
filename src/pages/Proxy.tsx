import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Icon from "@/components/ui/icon"

const features = [
  {
    icon: "Smartphone",
    title: "Мобильный IP",
    desc: "Настоящие мобильные IP-адреса операторов связи — не дата-центры. Максимальный траст от платформ.",
  },
  {
    icon: "RefreshCw",
    title: "Смена IP по запросу",
    desc: "Меняйте IP в любой момент через ссылку или API. Новый адрес — новая сессия без переподключения.",
  },
  {
    icon: "ShieldCheck",
    title: "Без логов",
    desc: "Мы не храним историю запросов. Полная анонимность трафика и ваших действий в сети.",
  },
  {
    icon: "Zap",
    title: "Высокая скорость",
    desc: "Выделенный канал 4G/LTE до 150 Мбит/с. Рассылки, парсинг и работа без задержек.",
  },
  {
    icon: "MessageCircle",
    title: "Подходит для рассылок",
    desc: "Оптимизированы под WhatsApp, Telegram, VK. Минимальный бан-рейт, стабильная доставка сообщений.",
  },
  {
    icon: "Headphones",
    title: "Поддержка 24/7",
    desc: "Живой менеджер в Telegram. Подключим, настроим, поможем с любым вопросом в любое время суток.",
  },
]

const plans = [
  {
    name: "Старт",
    count: "1 прокси",
    price: "990",
    badge: null,
    highlight: false,
    features: ["1 IP-адрес", "Смена IP каждые 5 мин", "Протоколы HTTP/SOCKS5", "Доступ через API", "Email-поддержка"],
  },
  {
    name: "Бизнес",
    count: "5 прокси",
    price: "3 900",
    badge: "Популярный",
    highlight: true,
    features: [
      "5 IP-адресов",
      "Смена IP каждые 2 мин",
      "Протоколы HTTP/SOCKS5",
      "Доступ через API",
      "Приоритетная поддержка",
    ],
  },
  {
    name: "Про",
    count: "20 прокси",
    price: "12 000",
    badge: null,
    highlight: false,
    features: [
      "20 IP-адресов",
      "Мгновенная смена IP",
      "Выделенный канал",
      "Персональный менеджер",
      "SLA 99.9% uptime",
    ],
  },
]

const faqs = [
  {
    q: "Что такое мобильные прокси?",
    a: "Мобильные прокси — это IP-адреса реальных смартфонов, подключённых к мобильным операторам (МТС, Билайн, Мегафон). В отличие от серверных IP, мобильные адреса вызывают максимальный уровень доверия у социальных сетей и мессенджеров, так как их используют миллионы обычных пользователей.",
  },
  {
    q: "Подходят ли прокси для WhatsApp рассылок?",
    a: "Да, наши мобильные прокси специально оптимизированы для работы с WhatsApp, Telegram и VK. Мобильный IP не вызывает подозрений у алгоритмов платформ, что существенно снижает вероятность блокировки аккаунта при рассылках.",
  },
  {
    q: "Как быстро получу доступ к прокси?",
    a: "Доступ предоставляется автоматически в течение 15 минут после подтверждения оплаты. На почту придут данные для подключения: хост, порт, логин и пароль, а также инструкция по настройке.",
  },
  {
    q: "Есть ли тестовый период?",
    a: "Да! Мы предоставляем тестовый доступ на 24 часа за 99₽. За это время вы сможете проверить скорость, стабильность и совместимость прокси с вашим инструментом. Если не понравится — вернём деньги.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Proxy() {
  useEffect(() => {
    document.title = "Купить мобильные прокси для рассылок — RichSMM"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "Мобильные 4G/LTE прокси для рассылок WhatsApp, Telegram, VK и парсинга. Смена IP по запросу, ротация, API. От 990₽/месяц. Купить напрямую у RichSMM.")
  }, [])

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
          <Link to="/" className="text-xl font-bold">
            <span className="text-primary">Rich</span>
            <span className="text-foreground">SMM</span>
          </Link>
          <a
            href="https://t.me/richsmm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name="Send" size={15} />
            Telegram
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative pt-20 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-primary" />
                </span>
                Мобильные 4G/LTE прокси — купить напрямую
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Мобильные прокси для рассылок —{" "}
                <span className="gradient-text">купить напрямую</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Качественные мобильные прокси для рассылок в{" "}
                <span className="text-foreground font-semibold">WhatsApp</span>,{" "}
                <span className="text-foreground font-semibold">Telegram</span> и{" "}
                <span className="text-foreground font-semibold">VK</span>. Настоящие операторские IP,
                смена адреса по запросу, без банов и логов.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://t.me/richsmm" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow w-full sm:w-auto">
                    <Icon name="Send" size={16} />
                    Получить прокси
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <Icon name="ChevronDown" size={16} />
                  Смотреть тарифы
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
                {[
                  { icon: "CheckCircle2", text: "Доступ за 15 минут" },
                  { icon: "CheckCircle2", text: "Тест 24 ч за 99₽" },
                  { icon: "CheckCircle2", text: "HTTP и SOCKS5" },
                ].map((item) => (
                  <span key={item.text} className="flex items-center gap-1.5">
                    <Icon name={item.icon} size={15} className="text-primary" />
                    {item.text}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Separator />

        {/* ── Features ── */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <Badge variant="outline" className="mb-4">Возможности</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Почему наши прокси работают
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Каждый прокси — это реальный смартфон с сим-картой, а не сервер в датацентре
              </p>
              <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="h-full border-border hover:border-primary/40 transition-colors card-lift">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon name={feature.icon} size={22} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Pricing ── */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <Badge variant="outline" className="mb-4">Тарифы</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Купить прокси — выберите тариф
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Прозрачные цены без скрытых платежей. Продление — по той же стоимости.
              </p>
              <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={plan.highlight ? "md:-mt-4 md:mb-4" : ""}
                >
                  <Card
                    className={`h-full flex flex-col relative overflow-hidden transition-all ${
                      plan.highlight
                        ? "border-primary shadow-2xl shadow-primary/20"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    {plan.highlight && (
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                    )}
                    <CardContent className="p-6 flex flex-col gap-4 flex-1">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-muted-foreground">{plan.count}</span>
                          {plan.badge && (
                            <Badge className="text-xs">{plan.badge}</Badge>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-primary">{plan.price}₽</span>
                        <span className="text-muted-foreground text-sm">/мес</span>
                      </div>

                      <Separator />

                      <ul className="space-y-3 flex-1">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-sm">
                            <Icon name="Check" size={16} className="text-primary mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href="https://t.me/richsmm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-2"
                      >
                        <Button
                          className="w-full"
                          variant={plan.highlight ? "default" : "outline"}
                          size="lg"
                        >
                          Купить {plan.name}
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Нужно больше прокси или особые условия?{" "}
              <a
                href="https://t.me/richsmm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Напишите нам — сделаем индивидуальное предложение
              </a>
            </p>
          </div>
        </section>

        <Separator />

        {/* ── FAQ ── */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <Badge variant="outline" className="mb-4">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Частые вопросы о прокси
              </h2>
              <p className="text-muted-foreground">Отвечаем честно и по делу</p>
              <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-3"
            >
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`border rounded-xl overflow-hidden transition-colors ${
                    openFaq === i ? "border-primary/50" : "border-border"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left font-medium hover:bg-muted/40 transition-colors gap-4"
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0">
                      <Icon
                        name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                        size={18}
                        className="text-muted-foreground"
                      />
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border/50">
                      <div className="pt-4">{faq.a}</div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <Separator />

        {/* ── CTA ── */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Icon name="Rocket" size={28} className="text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Готов начать? Напиши нам в Telegram
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Отвечаем за 15 минут. Подберём тариф, подключим и настроим прокси под ваши задачи.
              </p>
              <a
                href="https://t.me/richsmm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow text-base px-10">
                  <Icon name="Send" size={18} />
                  Написать в Telegram
                </Button>
              </a>
              <p className="text-xs text-muted-foreground mt-4">
                Без звонков и долгих согласований — только результат
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-muted border-t border-border py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>&copy; 2025 RichSMM. Все права защищены.</span>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-primary transition-colors">
              На главную
            </Link>
            <a
              href="https://t.me/richsmm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Telegram
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}