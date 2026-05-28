import { useState, ChangeEvent, FormEvent } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import Icon from "@/components/ui/icon"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("https://functions.poehali.dev/8cc027c3-c324-4daa-80e9-8420d9b1fc75", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Я получил ваше сообщение и свяжусь в течение 15 минут.",
        })
        setFormData({ name: "", phone: "", service: "", message: "" })
      } else {
        throw new Error(data.error || "Ошибка")
      }
    } catch {
      toast({
        title: "Не удалось отправить",
        description: "Проверьте соединение и попробуйте ещё раз. Или напишите напрямую: @richsmm1",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: "Phone",
      title: "Телефон / WhatsApp",
      value: "+7 (901) 345-60-08",
      link: "https://wa.me/79013456008",
    },
    {
      icon: "Send",
      title: "Telegram",
      value: "@richsmm1",
      link: "https://t.me/richsmm1",
    },

  ]

  return (
    <section id="contact" className="py-20 bg-muted/30">
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
            Контакты
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Обсудим ваш проект</h2>
          <p className="text-muted-foreground max-w-md mx-auto mt-2">
            Оставьте заявку - ответим в течение 15 минут и бесплатно рассчитаем стоимость
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
            className="lg:col-span-2"
          >
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Александр"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон / Telegram</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+7 (999) 000-00-00"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Какая услуга интересует?</Label>
                    <Input
                      id="service"
                      name="service"
                      placeholder="SMS-рассылки, Telegram-бот, Python-приложение..."
                      value={formData.service}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Расскажите о задаче</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Опишите вашу задачу: что нужно сделать, примерные сроки, бюджет..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Отправляем..." : "Отправить заявку - бесплатно"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={fadeIn}
          >
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Icon name={info.icon as "Phone"} size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold mb-0.5">{info.title}</h4>
                        {info.link ? (
                          <a href={info.link} className="text-foreground hover:text-primary transition-colors text-base font-medium">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground text-base font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-5">
                  <h4 className="font-bold text-base mb-3 text-primary">Почему RichSMM?</h4>
                  <ul className="space-y-2.5">
                    {[
                      "8+ лет в digital",
                      "Своя команда разработчиков",
                      "50+ реализованных проектов",
                      "Ответ за 15 минут",
                      "Бесплатная помощь со стратегией",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-base font-medium text-foreground">
                        <Icon name="Check" size={15} className="text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}