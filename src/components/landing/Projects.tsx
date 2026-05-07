import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Github, ChevronDown } from "lucide-react"

interface Project {
  id: number
  title: string
  shortDescription: string
  description: string
  image: string
  tags: string[]
  features: string[]
  demoLink: string
  githubLink: string
  fullDescription: string
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce платформа",
      shortDescription: "Полнофункциональная платформа интернет-магазина с управлением товарами.",
      description:
        "Полнофункциональная платформа интернет-магазина с управлением товарами, корзиной и обработкой платежей.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["C++", "Qt", "SQLite", "CMake"],
      features: [
        "Система управления складом",
        "Отслеживание остатков в реальном времени",
        "Безопасная обработка платежей",
        "Панель управления заказами",
        "Аналитика клиентов",
      ],
      demoLink: "#",
      githubLink: "#",
      fullDescription:
        "Эта e-commerce платформа предоставляет бизнесу комплексное решение для онлайн-продаж. Построена на C++ и Qt для высокой производительности и кроссплатформенности. Включает адаптивный дизайн, каталог товаров с фильтрацией и поиском, функционал корзины, интеграцию безопасной оплаты, авторизацию пользователей и админ-панель для управления товарами, заказами и клиентами.",
    },
    {
      id: 2,
      title: "Система управления задачами",
      shortDescription: "Приложение для командной работы с обновлениями в реальном времени.",
      description: "Приложение для командной работы с обновлениями в реальном времени и рабочими пространствами.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Java", "Spring Boot", "React", "PostgreSQL"],
      features: [
        "Совместная работа в реальном времени",
        "Зависимости между задачами",
        "Распределение ресурсов",
        "Отслеживание прогресса",
        "Управление командой",
      ],
      demoLink: "#",
      githubLink: "#",
      fullDescription:
        "Система управления задачами помогает командам эффективно организовывать и отслеживать работу. Построена на Java Spring Boot для бэкенда и React для фронтенда. Включает создание и назначение задач, сроки и напоминания, отслеживание прогресса, вложения файлов, комментарии и обсуждения, рабочие пространства команд и обновления в реальном времени.",
    },
    {
      id: 3,
      title: "Монитор системных ресурсов",
      shortDescription: "Комплексный инструмент мониторинга с аналитикой в реальном времени.",
      description: "Комплексный инструмент мониторинга с аналитикой и отслеживанием производительности.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["C++", "Python", "Qt", "Linux"],
      features: [
        "Мониторинг CPU/памяти",
        "Управление процессами",
        "Сетевая аналитика",
        "Отслеживание использования диска",
        "Оповещения о производительности",
      ],
      demoLink: "#",
      githubLink: "#",
      fullDescription:
        "Монитор системных ресурсов обеспечивает анализ производительности системы в реальном времени. Построен преимущественно на C++ с Python для анализа данных. Приложение отслеживает загрузку CPU, потребление памяти, сетевой трафик и дисковые операции, предоставляя детальную аналитику и оповещения для системных администраторов.",
    },
    {
      id: 4,
      title: "Проект компилятора",
      shortDescription: "Компилятор собственного языка программирования с оптимизацией.",
      description: "Компилятор собственного языка программирования с продвинутыми оптимизациями.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["C", "LLVM", "Assembly", "Python"],
      features: ["Лексический анализ", "Синтаксический разбор", "Оптимизация кода", "Обработка ошибок", "Генерация ассемблера"],
      demoLink: "#",
      githubLink: "#",
      fullDescription:
        "Проект компилятора реализует собственный язык программирования с современными возможностями и оптимизациями. Построен на C и LLVM, включает комплексную обработку ошибок и возможности оптимизации кода. Компилятор выполняет лексический анализ, синтаксический разбор, семантический анализ и генерирует оптимизированный ассемблерный код.",
    },
    {
      id: 5,
      title: "Распределенная база данных",
      shortDescription: "Распределенная СУБД с высокой доступностью.",
      description: "Распределенная СУБД с высокой доступностью и отказоустойчивостью.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["C++", "Rust", "gRPC", "Redis"],
      features: ["Репликация данных", "Шардирование", "Отказоустойчивость", "Балансировка нагрузки", "Управление транзакциями"],
      demoLink: "#",
      githubLink: "#",
      fullDescription:
        "Распределенная система баз данных обеспечивает высокую доступность и отказоустойчивость для масштабных приложений. Построена на C++ и Rust для производительности, реализует продвинутые функции: репликацию данных, шардирование и автоматический failover. Система включает инструменты мониторинга и управления.",
    },
    {
      id: 6,
      title: "Фреймворк нейросетей",
      shortDescription: "Фреймворк глубокого обучения с оптимизацией производительности.",
      description: "Фреймворк глубокого обучения с CUDA-ускорением и функциями оптимизации.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["C++", "CUDA", "Python", "CMake"],
      features: [
        "CUDA-ускорение",
        "Автоматическое дифференцирование",
        "Оптимизация моделей",
        "Пайплайны обучения",
        "Профилирование производительности",
      ],
      demoLink: "#",
      githubLink: "#",
      fullDescription:
        "Фреймворк нейросетей обеспечивает высокопроизводительные возможности глубокого обучения. Построен преимущественно на C++ с CUDA-ускорением. Предлагает инструменты для построения и обучения нейросетей, включая автоматическое дифференцирование, оптимизацию моделей и профилирование производительности.",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30">
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
            Портфолио
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Избранные проекты</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
            >
              <Card
                className={`group h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  expandedProject === project.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20 p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">{project.shortDescription}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 border-t"
                      >
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-semibold">Ключевые функции:</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              {project.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex gap-4 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(project.githubLink, "_blank")
                              }}
                            >
                              <Github className="h-4 w-4 mr-2" />
                              Код
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(project.demoLink, "_blank")
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Демо
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedProject(project)
                              }}
                            >
                              Подробнее
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-4 text-center">
                    <ChevronDown
                      className={`w-6 h-6 mx-auto transition-transform duration-300 ${
                        expandedProject === project.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>
                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                  {selectedProject.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full rounded-md object-cover aspect-video"
              />
              <p className="text-muted-foreground">{selectedProject.fullDescription}</p>
              <div className="space-y-4">
                <h4 className="font-semibold">Ключевые функции:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <Button variant="outline" asChild>
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Смотреть код
                  </a>
                </Button>
                <Button asChild>
                  <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Демо
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}
