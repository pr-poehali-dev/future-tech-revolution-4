import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const channels = [
  { id: "telegram", label: "Telegram", price: 5, icon: "Send", color: "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400" },
  { id: "whatsapp", label: "WhatsApp", price: 5, icon: "MessageCircle", color: "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400" },
  { id: "viber", label: "Viber", price: 3.5, icon: "Radio", color: "bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400" },
  { id: "imo", label: "IMO", price: 2.5, icon: "MessageSquare", color: "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400" },
  { id: "sms", label: "SMS", price: 4, icon: "Smartphone", color: "bg-gray-500/10 border-gray-500/30 text-gray-600 dark:text-gray-400" },
]

export default function Calculator() {
  const [count, setCount] = useState(1000)
  const [selectedChannel, setSelectedChannel] = useState("telegram")

  const channel = channels.find((c) => c.id === selectedChannel)!
  const totalCost = Math.round(count * channel.price)
  const conversions = Math.round(count * 0.05)
  const costPerClient = conversions > 0 ? Math.round(totalCost / conversions) : 0

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const sendToTelegram = () => {
    const text = encodeURIComponent(
      `Привет! Хочу запустить рассылку.\n\n` +
      `📢 Канал: ${channel.label}\n` +
      `📨 Сообщений: ${count.toLocaleString("ru")}\n` +
      `💰 Бюджет: ~${totalCost.toLocaleString("ru")} ₽\n` +
      `👥 Ожидаемо откликов: ~${conversions.toLocaleString("ru")}\n\n` +
      `Рассчитайте точную стоимость, пожалуйста!`
    )
    window.open(`https://t.me/richsmm1?text=${text}`, "_blank")
  }

  return (
    <section id="calculator" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Калькулятор</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Рассчитайте стоимость рассылки</h2>
          <p className="text-muted-foreground max-w-md mx-auto mt-2">
            Средняя конверсия в целевое действие - <span className="text-primary font-semibold">5%</span> с нашими инструментами
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeIn}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardContent className="p-8 space-y-8">
              {/* Channel select */}
              <div>
                <p className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Выберите канал рассылки</p>
                <div className="flex flex-wrap gap-2">
                  {channels.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setSelectedChannel(ch.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                        selectedChannel === ch.id
                          ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <Icon name={ch.icon as "Send"} size={14} />
                      {ch.label} - {ch.price}₽
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Количество сообщений</p>
                  <span className="text-2xl font-bold text-primary">{count.toLocaleString("ru")}</span>
                </div>
                <Slider
                  min={100}
                  max={50000}
                  step={100}
                  value={[count]}
                  onValueChange={(v) => setCount(v[0])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>100</span>
                  <span>50 000</span>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <Icon name="Wallet" size={20} className="text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{totalCost.toLocaleString("ru")} ₽</p>
                  <p className="text-xs text-muted-foreground mt-1">Стоимость рассылки</p>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
                  <Icon name="Users" size={20} className="text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{conversions.toLocaleString("ru")}</p>
                  <p className="text-xs text-muted-foreground mt-1">Откликов (5%)</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <Icon name="TrendingDown" size={20} className="text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{costPerClient.toLocaleString("ru")} ₽</p>
                  <p className="text-xs text-muted-foreground mt-1">Цена клиента</p>
                </div>
              </div>

              {/* Summary line */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-3 flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${channel.color}`}>
                  <Icon name={channel.icon as "Send"} size={16} />
                </div>
                <p className="text-sm leading-snug">
                  <span className="font-semibold">{channel.label}-рассылка</span> на{" "}
                  <span className="font-semibold text-primary">{count.toLocaleString("ru")} человек</span> обойдётся{" "}
                  <span className="font-semibold">{totalCost.toLocaleString("ru")} ₽</span> - примерно{" "}
                  <span className="font-semibold text-primary">{costPerClient} ₽ за клиента</span>
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 group" size="lg" onClick={sendToTelegram}>
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить расчёт в Telegram
                </Button>
                <Button variant="outline" size="lg" className="flex-1" onClick={() => {
                  const el = document.getElementById("contact")
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset, behavior: "smooth" })
                }}>
                  Оставить заявку
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Точная стоимость зависит от базы и задачи - уточним бесплатно за 15 минут
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}