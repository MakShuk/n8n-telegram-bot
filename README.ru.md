<p align="right">
  <a href="README.md"><img src="https://img.shields.io/badge/English-blue?style=for-the-badge&logo=github" alt="English"></a>
</p>

# n8n-Telegram-Bot

NestJS-сервис для интеграции [n8n](https://n8n.io/) с Telegram-ботами.  
Статус: В активной разработке.

![Лицензия](https://img.shields.io/badge/license-MIT-blue)
![Сборка](https://img.shields.io/badge/build-passing-brightgreen)
![Node](https://img.shields.io/badge/node-%3E=18.0.0-blue)
![n8n](https://img.shields.io/badge/n8n-integration-yellow)

## Оглавление
- [Описание](#описание)
- [Требования](#требования)
- [Установка](#установка)
- [Использование](#использование)
- [Лицензия](#лицензия)

## Описание

Этот проект связывает автоматизации [n8n](https://n8n.io/) с Telegram через кастомный сервис на NestJS.  
Позволяет запускать n8n-процессы из Telegram и получать уведомления или результаты прямо в чат.

**Возможности:**
- Интеграция с Telegram-ботом
- Триггеры и уведомления n8n
- Поддержка Docker для быстрой развертки
- Конфигурирование через переменные окружения

## Требования

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker (опционально, для контейнеризации)
- n8n (облако или self-hosted)
- Токен Telegram-бота

## Установка

```bash
git clone https://github.com/your-org/n8n-telegram-bot.git
cd n8n-telegram-bot
npm install
```

## Использование

1. Настройте переменные окружения в `envs/.example` (скопируйте в `.env` и заполните).
2. Запустите сервис:
   ```bash
   npm run start
   ```
   Или через Docker:
   ```bash
   docker-compose up --build
   ```
3. Взаимодействуйте с Telegram-ботом и подключайте его к n8n-процессам.

## Лицензия

Проект распространяется под лицензией [MIT](LICENSE).

---

**FAQ, дорожная карта, благодарности и changelog можно добавить по необходимости.**