import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Политика конфиденциальности - RichSMM"
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Rich<span className="text-foreground">SMM</span>
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">На главную</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Политика конфиденциальности</h1>
        <p className="text-muted-foreground text-sm mb-8">Последнее обновление: май 2025 г.</p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Оператор персональных данных</h2>
            <p>
              Оператором персональных данных является{" "}
              <span className="text-foreground font-medium">ИП Добровецкий Павел Александрович</span>,
              ИНН 772159370235.
            </p>
            <p className="mt-2">
              Контактный email:{" "}
              <a href="mailto:info@richsmm.site" className="text-primary hover:underline">info@richsmm.site</a>
              <br />
              Telegram:{" "}
              <a href="https://t.me/richsmm1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@richsmm1</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Какие данные мы собираем</h2>
            <p>При использовании сайта richsmm.site мы можем собирать следующие данные:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Имя и контактный номер телефона или email (при заполнении формы заявки)</li>
              <li>Данные об устройстве и браузере (User-Agent, IP-адрес)</li>
              <li>Данные о поведении на сайте через Яндекс.Метрику (просмотры страниц, переходы)</li>
              <li>Файлы cookie для корректной работы сайта</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Цели обработки данных</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Обработка и ответ на входящие заявки и вопросы</li>
              <li>Улучшение качества работы сайта и сервиса</li>
              <li>Аналитика посещаемости (Яндекс.Метрика)</li>
              <li>Соблюдение требований законодательства РФ</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Правовое основание</h2>
            <p>
              Обработка персональных данных осуществляется на основании Федерального закона
              от 27.07.2006 N 152-ФЗ «О персональных данных» и согласия субъекта персональных данных,
              выраженного при заполнении формы обратной связи или принятии настоящей политики.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Файлы cookie</h2>
            <p>
              Сайт использует файлы cookie - небольшие текстовые файлы, сохраняемые в браузере пользователя.
              Cookie используются для:
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Корректной работы сайта (технические cookie)</li>
              <li>Сбора аналитических данных через Яндекс.Метрику</li>
              <li>Запоминания пользовательских настроек (тема оформления)</li>
            </ul>
            <p className="mt-2">
              Вы можете отключить cookie в настройках браузера. Это может повлиять на работу
              отдельных функций сайта.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Передача данных третьим лицам</h2>
            <p>
              Мы не продаём и не передаём персональные данные третьим лицам, за исключением:
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>
                <span className="text-foreground">Яндекс.Метрика</span> - анонимизированные данные
                о поведении пользователей на сайте (ООО «Яндекс», Россия)
              </li>
              <li>
                Случаев, предусмотренных законодательством РФ (по запросу уполномоченных органов)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Хранение данных</h2>
            <p>
              Данные из форм обратной связи хранятся не дольше, чем это необходимо для достижения
              целей их обработки, или до момента отзыва согласия пользователем. Аналитические данные
              хранятся в соответствии с политикой Яндекс.Метрики.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Права пользователя</h2>
            <p>В соответствии с ФЗ-152 вы вправе:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Получить информацию об обработке ваших персональных данных</li>
              <li>Потребовать уточнения, блокирования или уничтожения данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия оператора в Роскомнадзоре</li>
            </ul>
            <p className="mt-2">
              Для реализации прав обратитесь на:{" "}
              <a href="mailto:info@richsmm.site" className="text-primary hover:underline">info@richsmm.site</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Изменения политики</h2>
            <p>
              Мы оставляем за собой право обновлять данную политику. Актуальная версия всегда
              доступна по адресу{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline">richsmm.site/privacy-policy</Link>.
              Продолжение использования сайта после изменений означает согласие с новой редакцией.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Контакты</h2>
            <p>По вопросам обработки персональных данных:</p>
            <p className="mt-2">
              ИП Добровецкий Павел Александрович<br />
              ИНН 772159370235<br />
              Email:{" "}
              <a href="mailto:info@richsmm.site" className="text-primary hover:underline">info@richsmm.site</a><br />
              Telegram:{" "}
              <a href="https://t.me/richsmm1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@richsmm1</a>
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link to="/">Вернуться на главную</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:info@richsmm.site">Задать вопрос</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
