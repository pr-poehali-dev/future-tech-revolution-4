import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const examples = [
  {
    platform: "Telegram",
    color: "bg-[#229ED9]",
    bubbleColor: "bg-white text-gray-900",
    image: "https://cdn.poehali.dev/projects/660a37a1-4c8b-4667-b077-daacd102c4a3/bucket/80376938-4867-49df-a8ac-5168f073c883.jpg",
    label: "Telegram — инвайт в группу",
    desc: "Пользователь получает сообщение с приглашением и кнопкой — одно нажатие и он в вашем сообществе",
  },
  {
    platform: "Telegram",
    color: "bg-[#229ED9]",
    bubbleColor: "bg-white text-gray-900",
    image: "https://cdn.poehali.dev/projects/660a37a1-4c8b-4667-b077-daacd102c4a3/bucket/d34480ea-b891-4ee1-b750-7987711d0d69.jpg",
    label: "Telegram — личное сообщение",
    desc: "Прямое сообщение в личку с оффером, ссылкой и кодовым словом — высокий отклик за счёт персонализации",
  },
  {
    platform: "SMS",
    color: "bg-[#6B7280]",
    bubbleColor: "bg-white text-gray-900",
    image: "https://cdn.poehali.dev/projects/660a37a1-4c8b-4667-b077-daacd102c4a3/bucket/1fab1281-be56-43db-86a7-827730bd5a39.jpg",
    label: "SMS — рассылка",
    desc: "SMS доходит до любого телефона без интернета — 100% доставляемость, открываемость выше 90%",
  },
]

export default function MessageExamples() {
  return (
    <section id="examples" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Примеры рассылок</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Вот что <span className="gradient-text">получит</span> ваш клиент
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Реальные скрины — не макеты. Именно так выглядят сообщения у получателей
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="flex flex-col"
            >
              {/* Phone mockup */}
              <div className="relative mx-auto w-[200px] mb-5">
                <div className="rounded-[28px] border-4 border-gray-800 bg-gray-800 shadow-2xl overflow-hidden">
                  {/* Status bar */}
                  <div className={`${ex.color} h-6 flex items-center justify-between px-3`}>
                    <span className="text-white text-[9px] font-bold">{ex.platform}</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    </div>
                  </div>
                  {/* Screenshot */}
                  <img
                    src={ex.image}
                    alt={ex.label}
                    className="w-full object-cover object-top"
                    style={{ maxHeight: "340px" }}
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="font-bold mb-1">{ex.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{ex.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-1 text-sm">Хотите такую же рассылку для своего бизнеса?</p>
          <a
            href="https://t.me/richsmm1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold hover:underline"
          >
            Написать в Telegram @richsmm1 →
          </a>
        </motion.div>
      </div>
    </section>
  )
}