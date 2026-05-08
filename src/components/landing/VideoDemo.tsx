import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const video = {
  title: "Рассылка в личные сообщения — реальная демонстрация",
  desc: "Запускаем рассылку прямо на камеру: выбираем базу, пишем текст, смотрим как сообщения уходят получателям за несколько минут.",
  embedUrl: "https://vk.com/video_ext.php?oid=-238483575&id=456239017&hd=2&autoplay=0",
}

export default function VideoDemo() {
  return (
    <section id="video" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Видео-демонстрация</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Смотрите, как это <span className="gradient-text">работает</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Никаких обещаний — только реальный процесс. Запустим рассылку прямо на камеру.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-border bg-card shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all"
        >
          <div className="relative aspect-video bg-black">
            <iframe
              src={video.embedUrl}
              className="w-full h-full"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
          </div>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg shrink-0 mt-0.5">
                <Icon name="PlayCircle" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">{video.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{video.desc}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Хотите живую демонстрацию под вашу задачу?{" "}
            <a
              href="https://t.me/richsmm1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              Напишите в Telegram →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}