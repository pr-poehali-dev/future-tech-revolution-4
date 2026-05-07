import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

export default function TelegramFloat() {
  return (
    <motion.a
      href="https://t.me/richsmm1"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#229ED9] text-white px-4 py-3 rounded-full shadow-2xl shadow-[#229ED9]/40 cursor-pointer group"
    >
      <Icon name="Send" size={22} className="shrink-0" />
      <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Написать в Telegram
      </span>
    </motion.a>
  )
}
