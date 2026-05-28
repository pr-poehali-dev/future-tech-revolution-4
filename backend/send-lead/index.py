"""
Отправка заявки с сайта в Telegram-бот. Chat ID владельца фиксирован через секрет TELEGRAM_CHAT_ID.
"""
import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    chat_id = os.environ["TELEGRAM_CHAT_ID"]

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "—")
    phone = body.get("phone", "—")
    service = body.get("service", "—")
    message = body.get("message", "—")

    text = (
        f"🔔 *Новая заявка с сайта RichSMM\\!*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон:* {phone}\n"
        f"💼 *Услуга:* {service}\n"
        f"💬 *Сообщение:* {message}"
    )

    send_url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "MarkdownV2"
    }).encode()

    req = urllib.request.Request(send_url, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "message_id": result.get("result", {}).get("message_id")}),
    }
