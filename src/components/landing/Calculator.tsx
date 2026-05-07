import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const channels = [
  { id: "telegram", label: "Telegram", price: 5, icon: "Send" },
  { id: "whatsapp", label: "WhatsApp", price: 5, icon: "MessageCircle" },
  { id: "viber", label: "Viber", price: 3.5, icon: "Radio" },
  { id: "imo", label: "IMO", price: 2.5, icon: "MessageSquare" },
  { id: "sms", label: "SMS", price: 4, icon: "MessageSquare" },
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

  const scrollToContact = () => {
    const el = document.getElementById("contact")
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset, behavior: "smooth" })
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
            Средняя конверсия в целевое действие — <span className="text-primary font-semibold">5%</span> с нашими инструментами
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
                <p className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Канал рассылки</p>
                <div className="flex flex-wrap gap-2">
                  {channels.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setSelectedChannel(ch.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                        selectedChannel === ch.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <Icon name={ch.icon as "Send"} size={14} />
                      {ch.label} — {ch.price}₽
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
                  <p className="text-xs text-muted-foreground mt-1">Целевых действий (5%)</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <Icon name="TrendingDown" size={20} className="text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{costPerClient.toLocaleString("ru")} ₽</p>
                  <p className="text-xs text-muted-foreground mt-1">Цена клиента</p>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={scrollToContact}>
                Запустить рассылку на {count.toLocaleString("ru")} сообщений
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
