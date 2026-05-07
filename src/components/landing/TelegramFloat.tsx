import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const buttons = [
  {
    href: "https://t.me/richsmm1",
    label: "Telegram",
    bg: "bg-[#229ED9]",
    shadow: "shadow-[#229ED9]/40",
    icon: "Send",
    delay: 1.5,
  },
  {
    href: "https://wa.me/79651016022",
    label: "WhatsApp",
    bg: "bg-[#25D366]",
    shadow: "shadow-[#25D366]/40",
    icon: "MessageCircle",
    delay: 1.7,
  },
  {
    href: "https://max.ru/79651016022",
    label: "Max",
    bg: "bg-[#7B61FF]",
    shadow: "shadow-[#7B61FF]/40",
    icon: "MessageSquare",
    delay: 1.9,
  },
]

export default function TelegramFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {buttons.map((btn) => (
        <motion.a
          key={btn.label}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: btn.delay, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-3 ${btn.bg} text-white px-4 py-3 rounded-full shadow-2xl ${btn.shadow} cursor-pointer group`}
        >
          <Icon name={btn.icon as "Send"} size={20} className="shrink-0" />
          <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
            {btn.label}
          </span>
        </motion.a>
      ))}
    </div>
  )
}
