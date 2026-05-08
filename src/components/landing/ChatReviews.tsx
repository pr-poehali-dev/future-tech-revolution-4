import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const clients = [
  {
    id: 1,
    name: "Семён",
    avatar: "С",
    avatarColor: "bg-violet-600",
    tag: "Постоянный клиент",
    referral: true,
    since: "1 год+",
    screenshot: "https://cdn.poehali.dev/projects/660a37a1-4c8b-4667-b077-daacd102c4a3/bucket/870cdc70-315a-41db-b7e0-f0def4514b04.jpg",
    summary: "Работаем вместе больше года. Семён привёл уже нескольких коллег — всем нравится результат по обучению и стоимости.",
  },
  {
    id: 2,
    name: "kolldun",
    avatar: "K",
    avatarColor: "bg-emerald-600",
    tag: "Постоянный клиент",
    referral: true,
    since: "1 год+",
    screenshot: "https://cdn.poehali.dev/projects/660a37a1-4c8b-4667-b077-daacd102c4a3/bucket/f28a3366-de48-46f9-b44d-df2f66ca9a24.jpg",
    summary: "Регулярные рассылки от 1000 сообщений. Рекомендует сервис знакомым — уже пришли двое друзей.",
  },
  {
    id: 3,
    name: "Адиль",
    avatar: "АД",
    avatarColor: "bg-blue-600",
    tag: "Постоянный клиент",
    referral: false,
    since: "Давний клиент",
    screenshot: "https://cdn.poehali.dev/projects/660a37a1-4c8b-4667-b077-daacd102c4a3/bucket/f260f4f6-d681-4c8a-93a4-3e46054f7f6e.jpg",
    summary: "Кредитный брокер. Рассылки по чатам ВК — точечно по тематике. Доволен форматом и ценой.",
  },
  {
    id: 4,
    name: "BACKYARD",
    avatar: "B",
    avatarColor: "bg-orange-600",
    tag: "Постоянный клиент",
    referral: true,
    since: "1 год+",
    screenshot: "https://cdn.poehali.dev/projects/660a37a1-4c8b-4667-b077-daacd102c4a3/bucket/86fef271-b084-4e0a-b287-ea661d52e5e9.jpg",
    summary: "Продвижение партнёрской программы. Работаем в связке уже давно, советует нас коллегам по нише.",
  },
  {
    id: 5,
    name: "Artem",
    avatar: "A",
    avatarColor: "bg-rose-600",
    tag: "Постоянный клиент",
    referral: false,
    since: "1 год+",
    screenshot: "https://cdn.poehali.dev/projects/660a37a1-4c8b-4667-b077-daacd102c4a3/bucket/06e1a596-6c3f-41d7-95fe-4a9f1d412ea7.jpg",
    summary: "WhatsApp-рассылки по РФ от 6р/сообщение. Минимальный старт от 1000 — тестирует качество базы.",
  },
]

export default function ChatReviews() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="chat-reviews" className="py-20 bg-muted/30">
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
            Реальные переписки
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Постоянные клиенты, которые приводят друзей
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Скриншоты реальных диалогов — никаких фейков. Люди возвращаются сами и рекомендуют нас знакомым.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              variants={fadeIn}
              className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors shadow-sm"
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 border-b border-border">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${client.avatarColor}`}>
                  {client.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm truncate">{client.name}</span>
                    {client.referral && (
                      <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full whitespace-nowrap">
                        <Icon name="UserPlus" size={10} />
                        Привёл друзей
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Clock" size={10} />
                    <span>{client.since}</span>
                    <span className="mx-1">·</span>
                    <span className="text-emerald-500 font-medium">{client.tag}</span>
                  </div>
                </div>
              </div>

              {/* Screenshot */}
              <div className="relative overflow-hidden bg-black">
                <img
                  src={client.screenshot}
                  alt={`Переписка с ${client.name}`}
                  className="w-full object-cover object-top max-h-80"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Summary */}
              <div className="px-4 py-4 flex items-start gap-2">
                <Icon name="MessageCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">{client.summary}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          variants={fadeIn}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
            <Icon name="Repeat2" size={18} className="text-primary" />
            <span className="text-sm font-medium">
              Более <span className="text-primary font-bold">70% клиентов</span> возвращаются повторно и советуют нас друзьям
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
