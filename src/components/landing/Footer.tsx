import { Link } from "react-router-dom"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-lg font-bold text-primary mb-1">
              Rich<span className="text-foreground">SMM</span>
            </p>
            <p className="text-sm text-muted-foreground">Digital-агентство. Рассылки и разработка.</p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">Услуги</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><a href="/#tech-stack" className="hover:text-primary transition-colors">Рассылки</a></li>
              <li><a href="/#tech-stack" className="hover:text-primary transition-colors">Лидогенерация</a></li>
              <li><a href="/#tech-stack" className="hover:text-primary transition-colors">Автоворонки</a></li>
              <li><a href="/#tech-stack" className="hover:text-primary transition-colors">Разработка на Python</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">Ресурсы</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><Link to="/blog" className="hover:text-primary transition-colors">Блог — статьи о рассылках</Link></li>
              <li><Link to="/blog/rassylka-telegram-kak-zapustit" className="hover:text-primary transition-colors">Рассылка в Telegram</Link></li>
              <li><Link to="/blog/chto-takoe-lidogeneratsiya" className="hover:text-primary transition-colors">Что такое лидогенерация</Link></li>
              <li><Link to="/blog/avtvoronka-chto-eto" className="hover:text-primary transition-colors">Автоворонки продаж</Link></li>
              <li><a href="https://t.me/richsmm1" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Telegram @richsmm1</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-muted-foreground text-sm">&copy; {currentYear} RichSMM. Все права защищены.</p>
          <p className="text-xs text-muted-foreground">8+ лет в digital · 50+ проектов · Своя команда</p>
        </div>
      </div>
    </footer>
  )
}