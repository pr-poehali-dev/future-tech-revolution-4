"""
Отправка заявки с сайта в Telegram-бот @Didgitaltbank_bot.
Получает chat_id из последних сообщений боту и отправляет уведомление.
"""
import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    token = os.environ["TELEGRAM_BOT_TOKEN"]

    # Получаем chat_id владельца через getUpdates
    updates_url = f"https://api.telegram.org/bot{token}/getUpdates"
    req = urllib.request.Request(updates_url)
    with urllib.request.urlopen(req) as resp:
        updates_data = json.loads(resp.read())

    chat_id = None
    if updates_data.get("result"):
        for update in reversed(updates_data["result"]):
            msg = update.get("message") or update.get("my_chat_member")
            if msg and msg.get("chat"):
                chat_id = msg["chat"]["id"]
                break

    if not chat_id:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "chat_id не найден. Напишите /start боту @Didgitaltbank_bot"}),
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "—")
    phone = body.get("phone", "—")
    service = body.get("service", "—")
    message = body.get("message", "—")

    text = (
        f"🔔 *Новая заявка с сайта RichSMM!*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон:* {phone}\n"
        f"💼 *Услуга:* {service}\n"
        f"💬 *Сообщение:* {message}"
    )

    send_url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown"
    }).encode()

    req = urllib.request.Request(send_url, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "message_id": result.get("result", {}).get("message_id")}),
    }
