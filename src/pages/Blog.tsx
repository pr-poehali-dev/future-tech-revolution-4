import { Link, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

const articles = [
  {
    slug: "rassylka-telegram-kak-zapustit",
    title: "Как запустить рассылку в Telegram: пошаговая инструкция 2025",
    description: "Разбираем, как сделать массовую рассылку в Telegram с нуля — какие инструменты использовать, сколько это стоит и как избежать блокировок.",
    date: "2025-04-10",
    readTime: "7 мин",
    category: "Telegram",
    content: `
## Что такое рассылка в Telegram

Рассылка в Telegram — это отправка сообщений сразу тысячам пользователей в личные сообщения. Это один из самых эффективных способов привлечь клиентов: сообщение попадает прямо в мессенджер человека, а не теряется в ленте баннеров.

## Виды рассылок в Telegram

**1. Рассылка в личные сообщения (ЛС)**
Сообщение отправляется напрямую пользователю. Доходимость — до 100%, потому что сообщение остаётся в чате даже если аккаунт-отправитель уходит в бан.

**2. Инвайтинг в группы**
Пользователей добавляют в ваш Telegram-канал или группу. Эффективно для набора аудитории.

**3. Рассылка по участникам групп**
Вы парсите аудиторию конкурентов и пишете им напрямую.

## Сколько стоит рассылка в Telegram

Рассылка в личные сообщения Telegram стоит от **5 ₽ за сообщение** (у RichSMM). Минимальный бюджет — от 500 ₽. Это в разы дешевле Яндекс.Директа и Таргета ВК.

## Как избежать блокировок

- Используйте качественные аккаунты с историей
- Не делайте рассылку слишком быстро — симулируйте живого человека
- Персонализируйте сообщения
- Работайте с профессионалами, у которых есть опыт

## Итог

Рассылка в Telegram — это мощный инструмент для малого бизнеса, физических лиц и владельцев каналов. Если хотите запустить рассылку без риска блокировок — обращайтесь к RichSMM: 8+ лет опыта, 500+ клиентов, бесплатный расчёт за 15 минут.
    `.trim(),
  },
  {
    slug: "rassylka-whatsapp-biznes",
    title: "Рассылка WhatsApp для бизнеса: как привлечь клиентов в 2025 году",
    description: "Как использовать WhatsApp-рассылку для продвижения бизнеса, физ. лиц и услуг. Стоимость, доходимость и реальные кейсы.",
    date: "2025-04-15",
    readTime: "6 мин",
    category: "WhatsApp",
    content: `
## WhatsApp — самый популярный мессенджер в России

Аудитория WhatsApp в России — более 80 миллионов человек. Большинство из них проверяют мессенджер каждый день. Рассылка в WhatsApp позволяет дотянуться до этой аудитории напрямую.

## Кому подходит рассылка WhatsApp

- Малому и среднему бизнесу (магазины, услуги, рестораны)
- Физическим лицам (мастера, репетиторы, консультанты)
- Telegram-каналам и сообществам для роста аудитории
- Всем, кто хочет быструю отдачу без больших бюджетов

## Стоимость WhatsApp-рассылки

У RichSMM рассылка WhatsApp стоит **5 ₽ за сообщение**. Чекинг номеров (проверка, есть ли WhatsApp на номере) — бесплатно. Минимальный заказ — от 500 ₽.

## Как работает рассылка

1. Вы предоставляете базу номеров (или мы её парсим под вашу аудиторию)
2. Пишем текст вместе — бесплатно помогаем с копирайтингом
3. Запускаем рассылку с живых аккаунтов
4. Отчёт о доставке после завершения

## Плюсы WhatsApp-рассылки

- Сообщения читают в 5–10 раз чаще, чем email
- Доходимость до 100%
- Можно отправлять фото, видео, голосовые
- Результат виден в первые часы

## Начните с 500 ₽

Напишите в Telegram @richsmm1 — рассчитаем стоимость бесплатно и за 15 минут.
    `.trim(),
  },
  {
    slug: "chto-takoe-lidogeneratsiya",
    title: "Что такое лидогенерация и как получать клиентов от 50 ₽",
    description: "Простыми словами о лидогенерации: что это такое, как работает и почему рассылки дешевле и эффективнее Яндекс.Директа.",
    date: "2025-04-20",
    readTime: "5 мин",
    category: "Лидогенерация",
    content: `
## Что такое лид и лидогенерация

**Лид** — это потенциальный клиент, который проявил интерес к вашему продукту или услуге. Оставил заявку, написал в мессенджер, позвонил.

**Лидогенерация** — процесс привлечения таких клиентов. Это может быть реклама, рассылка, холодные звонки или другие методы.

## Почему рассылки — лучший способ лидогенерации для малого бизнеса

| | Рассылки RichSMM | Яндекс.Директ | Таргет ВК |
|---|---|---|---|
| Минимальный бюджет | от 500 ₽ | от 10 000 ₽ | от 5 000 ₽ |
| Цена за контакт | от 2,5 ₽ | от 30–300 ₽ | от 15–100 ₽ |
| Нужен специалист | Нет | Да | Да |
| Результат | В первые часы | 2–4 недели | 1–2 недели |

## Сколько стоит лид у RichSMM

От **50 ₽ за лида**. Это реальная цифра — при отклике 1–3% с базы в 5000 номеров вы получаете 50–150 обращений за 7 500–25 000 ₽.

## Кому подходит

Лидогенерация через рассылки работает для:
- Услуг (ремонт, юридические услуги, медицина)
- Товаров (интернет-магазины, оптовики)
- B2B (предложения для бизнеса)
- Физических лиц и специалистов

## Заказать лидогенерацию

Напишите @richsmm1 в Telegram — бесплатно рассчитаем стоимость и подберём канал под вашу аудиторию.
    `.trim(),
  },
  {
    slug: "rassylka-viber-imo",
    title: "Рассылка Viber и IMO: самые дешёвые рассылки от 2,5 ₽",
    description: "Рассылки Viber и IMO — альтернатива SMS и WhatsApp. Дешевле, массовее, эффективнее. Подробный разбор с ценами.",
    date: "2025-04-25",
    readTime: "5 мин",
    category: "Viber & IMO",
    content: `
## Почему Viber и IMO — это выгодно

Viber и IMO — мессенджеры с многомиллионной аудиторией, которые часто упускают в маркетинге. Именно поэтому конкуренция здесь ниже, а стоимость контакта — минимальная.

## Цены на рассылки Viber и IMO

- **IMO** — от **2,5 ₽** за сообщение (самая дешёвая рассылка на рынке)
- **Viber** — от **3,5 ₽** за сообщение

Это в 10–100 раз дешевле контекстной рекламы.

## Кому подходит

Рассылки Viber и IMO популярны среди:
- Бизнесов, работающих с регионами (Viber популярен в СНГ)
- Тех, кто хочет максимально дёшево охватить большую базу
- Мультиканальных кампаний (Telegram + WhatsApp + Viber)

## Как запустить рассылку Viber/IMO

1. Согласуем базу и текст
2. Запускаем с нескольких аккаунтов параллельно
3. Получаете отчёт и первые отклики в тот же день

## Мультиканальная стратегия

Лучший результат — комбинировать каналы. Например:
- **Первое касание** — IMO (дёшево, широкий охват)
- **Повтор** — WhatsApp или Telegram (выше вовлечённость)

Такая стратегия даёт максимальный отклик при минимальном бюджете.

Узнайте стоимость под вашу базу — @richsmm1 в Telegram.
    `.trim(),
  },
  {
    slug: "avtvoronka-chto-eto",
    title: "Автоворонка продаж: что это и как она работает",
    description: "Объясняем простыми словами, что такое автоворонка, зачем она нужна и как настроить автоматические продажи через мессенджеры.",
    date: "2025-05-01",
    readTime: "6 мин",
    category: "Автоворонки",
    content: `
## Что такое автоворонка

**Автоворонка** (или автоматическая воронка продаж) — это система, которая автоматически ведёт потенциального клиента от первого контакта до покупки без вашего участия.

Например:
1. Человек видит ваше сообщение в Telegram
2. Переходит по ссылке → получает автоответ с предложением
3. Если не отвечает — через сутки приходит напоминание
4. После ответа — бот задаёт уточняющие вопросы и записывает на консультацию

Всё это происходит **автоматически**, пока вы занимаетесь другими делами.

## Зачем нужна автоворонка

- Экономит время на однотипных диалогах
- Не упускает клиентов, которые не ответили сразу
- Работает 24/7 без выходных
- Можно масштабировать без найма менеджеров

## Как мы делаем автоворонки

RichSMM разрабатывает автоворонки на базе:
- Telegram-ботов
- WhatsApp Business API
- Python-скриптов для сложной логики
- Интеграции с CRM (Bitrix24, AmoCRM)

## Стоимость автоворонки

Стоимость зависит от сложности. Простая автоворонка (приветствие + 2–3 шага) — от нескольких тысяч рублей. Комплексная система с CRM-интеграцией — обсуждается индивидуально.

Напишите @richsmm1 в Telegram — бесплатно проконсультируем и рассчитаем стоимость.
    `.trim(),
  },
  {
    slug: "sms-rassylka-tseny",
    title: "SMS-рассылка для бизнеса: цены, правила и когда это работает",
    description: "Когда стоит выбирать SMS-рассылку, а когда лучше Telegram или WhatsApp. Цены, плюсы и минусы, реальные кейсы.",
    date: "2025-05-05",
    readTime: "5 мин",
    category: "SMS",
    content: `
## SMS в 2025 году — всё ещё работает?

Да, работает — но для конкретных задач. SMS открывают в течение первых 3 минут в 90% случаев. Это выше, чем у email, и сравнимо с мессенджерами.

## Когда выбирать SMS

- **Аудитория старшего возраста** — они не всегда используют мессенджеры
- **Срочные уведомления** — акции с ограниченным временем
- **Подтверждения и напоминания** — записи, доставки
- **Нет базы в мессенджерах** — только номера телефонов

## Стоимость SMS-рассылки

У RichSMM SMS-рассылка стоит **от 4 ₽ за сообщение**. Это честная цена без скрытых комиссий.

## SMS vs Мессенджеры

| | SMS | Telegram/WhatsApp |
|---|---|---|
| Цена | от 4 ₽ | от 2,5–5 ₽ |
| Доходимость | 100% | до 100% |
| Мультимедиа | Только текст | Фото, видео, кнопки |
| Открываемость | Очень высокая | Высокая |

## Рекомендация

Для большинства бизнесов лучше начать с Telegram или WhatsApp — дешевле и больше возможностей. SMS подключайте как дополнительный канал или для аудитории 50+.

Узнайте, какой канал лучше для вашей задачи — @richsmm1 в Telegram.
    `.trim(),
  },
]

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <Link to={`/blog/${article.slug}`}>
      <Card className="h-full card-lift hover:border-primary/40 cursor-pointer">
        <CardContent className="p-6">
          <Badge variant="outline" className="mb-3 text-xs">{article.category}</Badge>
          <h2 className="font-bold text-lg mb-2 leading-snug hover:text-primary transition-colors">{article.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{article.description}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="Calendar" size={12} />
              {new Date(article.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Clock" size={12} />
              {article.readTime}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function ArticlePage({ slug }: { slug: string }) {
  const article = articles.find(a => a.slug === slug)
  if (!article) return <NotFoundPage />

  const lines = article.content.split("\n")

  const renderContent = () => {
    return lines.map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-8 mb-3">{line.slice(3)}</h2>
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold mb-2">{line.slice(2, -2)}</p>
      if (line.startsWith("- ")) return <li key={i} className="ml-5 list-disc text-muted-foreground">{line.slice(2)}</li>
      if (line.startsWith("|")) return null
      if (line.trim() === "") return <div key={i} className="h-2" />
      return <p key={i} className="text-muted-foreground leading-relaxed mb-2">{line}</p>
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary text-sm hover:underline mb-8">
          <Icon name="ArrowLeft" size={14} />
          Все статьи
        </Link>
        <Badge variant="outline" className="mb-4">{article.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{article.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-6 border-b border-border">
          <span className="flex items-center gap-1.5">
            <Icon name="Calendar" size={14} />
            {new Date(article.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="Clock" size={14} />
            {article.readTime}
          </span>
        </div>
        <div className="prose-like">{renderContent()}</div>
        <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-2xl text-center">
          <h3 className="font-bold text-xl mb-2">Хотите запустить рассылку?</h3>
          <p className="text-muted-foreground mb-4">Бесплатный расчёт за 15 минут. Работаем официально на ИП, принимаем СБП.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <a href="https://t.me/richsmm1" target="_blank" rel="noopener noreferrer">
                <Icon name="Send" size={16} className="mr-2" />
                Написать в Telegram
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/#contact">Оставить заявку</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Статья не найдена</p>
        <Button asChild><Link to="/blog">Все статьи</Link></Button>
      </div>
    </div>
  )
}

export default function Blog() {
  const { slug } = useParams<{ slug?: string }>()

  if (slug) return <ArticlePage slug={slug} />

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Блог</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Статьи о рассылках и <span className="gradient-text">продвижении</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Полезные материалы о рассылках, лидогенерации и автоматизации маркетинга
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {articles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" asChild>
            <a href="https://t.me/richsmm1" target="_blank" rel="noopener noreferrer">
              <Icon name="Send" size={16} className="mr-2" />
              Обсудить задачу в Telegram
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
