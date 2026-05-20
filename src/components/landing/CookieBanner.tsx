import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted")
    if (!accepted) {
      setTimeout(() => setVisible(true), 1500)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_accepted", "1")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[100] bg-card border border-border rounded-xl shadow-2xl p-4">
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        Мы используем файлы cookie для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
        <a href="/privacy-policy" className="text-primary hover:underline">политикой конфиденциальности</a>{" "}
        и обработкой персональных данных (ФЗ-152).
      </p>
      <div className="flex gap-2">
        <Button size="sm" onClick={accept} className="flex-1">Принять</Button>
        <Button size="sm" variant="outline" onClick={accept} className="flex-1">Только необходимые</Button>
      </div>
    </div>
  )
}
