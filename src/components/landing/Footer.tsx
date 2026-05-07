export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-lg font-bold text-primary">
              Rich<span className="text-foreground">SMM</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">Digital-агентство. Рассылки и разработка.</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm">&copy; {currentYear} RichSMM. Все права защищены.</p>
            <p className="text-xs text-muted-foreground mt-1">8+ лет в digital · 50+ проектов · Своя команда</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
