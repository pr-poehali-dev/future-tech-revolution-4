import { useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "А если аккаунт забанят — сообщения пропадут?",
    a: "Нет. Сообщения уже доставлены в чат получателя и остаются там навсегда, даже если аккаунт-отправитель уйдёт в бан. Человек видит ваше сообщение — и это главное.",
  },
  {
    q: "Дойдёт ли рассылка до реальных людей?",
    a: "Да — доходимость до 100%. Мы используем только качественные аккаунты с историей и живой активностью. Никаких мёртвых баз и серых схем.",
  },
  {
    q: "Как вы попадёте в мою целевую аудиторию?",
    a: "Мы собираем базу из тематических групп, чатов и геолокации — именно там сидят ваши потенциальные клиенты. Рассылка бьёт точно в ЦА, а не «в никуда».",
  },
  {
    q: "Это не дорого? Я слышал, что реклама стоит больших денег.",
    a: "Рассылки обходятся в разы дешевле Яндекс.Директа и таргета ВКонтакте — при сопоставимом или лучшем результате. Стоимость от 2,5₽ за сообщение, без дорогой настройки и специалистов.",
  },
  {
    q: "Я не умею составлять текст для рассылки. Что делать?",
    a: "Ничего страшного — я лично помогу вам бесплатно составить крео (текст) и УТП (уникальное торговое предложение). Это входит в работу: просто расскажите о своём продукте.",
  },
  {
    q: "Как я узнаю, что рассылка сработала?",
    a: "Вы получите подробный отчёт: сколько сообщений отправлено, доставлено, сколько было переходов. Никакой воды — только цифры.",
  },
  {
    q: "Это законно?",
    a: "Мы работаем легально и соблюдаем все требования. Рассылки через мессенджеры — стандартный инструмент продвижения, которым пользуются тысячи бизнесов по всей России.",
  },
]

export default function FAQ() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        },
      })),
    }
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.id = "faq-schema"
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => {
      document.getElementById("faq-schema")?.remove()
    }
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="faq" className="py-20">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Частые вопросы</h2>
          <p className="text-muted-foreground">Отвечаем честно — без воды</p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
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