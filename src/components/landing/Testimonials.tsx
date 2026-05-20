import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, StarHalf } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Testimonials() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const testimonials = [
    {
      id: 1,
      name: "Андрей Климов",
      position: "Владелец сети кафе «Вкусно здесь»",
      content:
        "Заказали SMS-рассылку на 80 000 клиентов. За день акции выручка выросла в 2 раза! Команда RichSMM всё сделала быстро и профессионально - от текста до аналитики. Теперь работаем постоянно.",
      rating: 5,
    },
    {
      id: 2,
      name: "Екатерина Волкова",
      position: "Директор онлайн-школы «ProEnglish»",
      content:
        "Попросили сделать воронку продаж через WhatsApp. Результат превзошёл ожидания - конверсия выросла почти в 3 раза за месяц. Очень доволен командой: всё чётко, без воды, с реальными цифрами.",
      rating: 5,
    },
    {
      id: 3,
      name: "Максим Орлов",
      position: "Основатель стартапа LogiFlow",
      content:
        "Разрабатывали Telegram-бота для нашего сервиса доставки. Ребята с первого раза поняли задачу, предложили крутые доработки. Бот работает без сбоев уже 8 месяцев. Рекомендую!",
      rating: 5,
    },
    {
      id: 4,
      name: "Ольга Светлова",
      position: "Маркетолог, «Альфа Финанс»",
      content:
        "Viber-рассылки от RichSMM дали CTR 8%, чего мы не могли добиться через email годами. Прозрачная аналитика, брендированные сообщения - всё на высшем уровне.",
      rating: 4.5,
    },
    {
      id: 5,
      name: "Дмитрий Захаров",
      position: "CEO, агентство недвижимости «Простор»",
      content:
        "Заказали CRM-систему на Python с интеграцией рассылок. Теперь менеджеры тратят в 3 раза меньше времени на рутину. Качество разработки отличное, поддержка всегда на связи.",
      rating: 5,
    },
  ]

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-5 w-5 fill-primary text-primary" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-5 w-5 fill-primary text-primary" />)
    }

    return <div className="flex">{stars}</div>
  }

  return (
    <section id="testimonials" className="py-20">
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
            Отзывы
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Что говорят клиенты</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeIn}
        >
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <Card className="h-full border-border hover:border-primary/40 transition-colors">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4">{renderStars(testimonial.rating)}</div>
                      <p className="text-muted-foreground flex-grow mb-6 text-sm leading-relaxed">"{testimonial.content}"</p>
                      <div className="mt-auto border-t border-border pt-4">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static translate-y-0 mr-2" />
              <CarouselNext className="relative static translate-y-0" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}