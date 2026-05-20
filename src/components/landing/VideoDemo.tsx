import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const video = {
  title: "Рассылка в личные сообщения - реальная демонстрация",
  desc: "Запускаем рассылку прямо на камеру: выбираем базу, пишем текст, смотрим как сообщения уходят получателям за несколько минут.",
  embedUrl: "https://vk.com/video_ext.php?oid=-238483575&id=456239017&hd=2&autoplay=1",
  vkUrl: "https://vk.com/video-238483575_456239017",
}

export default function VideoDemo() {
  const [playing, setPlaying] = useState(false)

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
            Никаких обещаний - только реальный процесс. Запустим рассылку прямо на камеру.
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
            {playing ? (
              <iframe
                src={video.embedUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group bg-gradient-to-br from-gray-900 to-gray-800 hover:from-primary/20 hover:to-gray-900 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-primary/90 group-hover:bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform duration-200">
                  <Icon name="Play" size={36} className="text-white ml-1" />
                </div>
                <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                  Нажмите для просмотра
                </span>
              </button>
            )}
          </div>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg shrink-0 mt-0.5">
                <Icon name="PlayCircle" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-1">{video.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{video.desc}</p>
              </div>
              <a
                href={video.vkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mt-0.5"
              >
                <Icon name="ExternalLink" size={12} />
                ВКонтакте
              </a>
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