import { useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Дойдёт ли рассылка до реальных людей?",
    a: "Да — доходимость очень высокая. Мы работаем только с качественной, верифицированной базой и отправляем сообщения поэтапно для максимальной доставляемости. Каждый получатель — живой человек из вашей целевой аудитории.",
  },
  {
    q: "Это не дорого? Я слышал, что реклама стоит больших денег.",
    a: "Рассылки обходятся в разы дешевле Яндекс.Директа и таргета ВКонтакте при сопоставимом или лучшем результате. Стоимость от 2,5 ₽ за сообщение, без дорогой настройки и специалистов. Минимальный заказ — 2 500 ₽.",
  },
  {
    q: "Как вы попадёте в мою целевую аудиторию?",
    a: "Мы собираем базу из тематических групп, чатов и открытых источников — именно там сидят ваши потенциальные клиенты. Фильтруем по активности, геолокации и нише. Рассылка бьёт точно в ЦА, а не «в никуда».",
  },
  {
    q: "Я не умею составлять текст для рассылки. Что делать?",
    a: "Ничего страшного — я лично помогу вам бесплатно составить текст и УТП (уникальное торговое предложение). Это входит в стоимость: просто расскажите о своём продукте, остальное беру на себя.",
  },
  {
    q: "Как я узнаю, что рассылка сработала?",
    a: "Вы получите подробный отчёт: сколько сообщений отправлено, доставлено, какова конверсия в ответы. Никакой воды — только цифры. Первые отклики обычно приходят в день запуска.",
  },
  {
    q: "Через сколько времени ждать первые заявки?",
    a: "Первые отклики приходят в день запуска рассылки — обычно в течение 2–6 часов после старта. Большинство заявок поступают в первые 24–48 часов.",
  },
  {
    q: "Это законно?",
    a: "Да. Мы работаем официально: ИП Добровецкий П.А., ИНН 772159370235. Рассылки в мессенджерах — стандартный инструмент продвижения, которым пользуются тысячи бизнесов по всей России. Принимаем оплату через СБП с чеком.",
  },
  {
    q: "Можно ли заказать рассылку без своей базы номеров?",
    a: "Да. Мы сами соберём целевую базу под вашу нишу из тематических Telegram-групп и открытых источников. Вам нужно только рассказать, кто ваш клиент — остальное сделаем мы.",
  },
  {
    q: "Чем ваши рассылки лучше Яндекс.Директа?",
    a: "Рассылки дешевле в 5–20 раз по цене лида, запускаются за 1 день (не 2–4 недели), дают результат в первые часы. Минимальный бюджет — 2 500 ₽ вместо 30 000+ в Директе. При этом открываемость сообщений — 40–80% против 3–5% у баннерной рекламы.",
  },
  {
    q: "Какой мессенджер выбрать для рассылки: Telegram или WhatsApp?",
    a: "Если ваша аудитория до 45 лет — Telegram эффективнее и дешевле (от 5 ₽/сообщение). Если аудитория 35–60+ или нужна максимальная доходимость — WhatsApp (открываемость 85–95%). Лучший вариант — комбинация обоих каналов.",
  },
  {
    q: "Какой минимальный заказ?",
    a: "Минимальный заказ — 500 сообщений, стоимость от 2 500 ₽. Этого достаточно для теста гипотезы и получения первых заявок. При объёме от 5 000 сообщений действует скидка.",
  },
]

export default function FAQ() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    const existing = document.getElementById("faq-schema")
    if (existing) existing.remove()

    const schema = document.createElement("script")
    schema.id = "faq-schema"
    schema.type = "application/ld+json"
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        },
      })),
    })
    document.head.appendChild(schema)

    return () => {
      const s = document.getElementById("faq-schema")
      if (s) s.remove()
    }
  }, [])

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            FAQ
          </Badge>
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold mb-4">Частые вопросы</h2>
          <p className="text-muted-foreground">Отвечаем честно — без воды</p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4" aria-hidden="true"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeIn}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
