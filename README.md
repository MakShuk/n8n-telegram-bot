<p align="right">
  <a href="README.ru.md"><img src="https://img.shields.io/badge/Русский-red?style=for-the-badge&logo=github" alt="Русский"></a>
</p>

# n8n-Telegram-Bot

A NestJS-based service for integrating [n8n](https://n8n.io/) workflows with Telegram bots.  
Status: In active development.

![License](https://img.shields.io/badge/license-MIT-blue)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Node](https://img.shields.io/badge/node-%3E=18.0.0-blue)
![n8n](https://img.shields.io/badge/n8n-integration-yellow)

## Table of Contents
- [Description](#description)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Description

This project connects [n8n](https://n8n.io/) automation workflows with Telegram via a custom NestJS bot service.  
It allows you to trigger n8n workflows from Telegram and receive notifications or results directly in chat.

**Features:**
- Telegram bot integration
- n8n workflow triggers and notifications
- Docker support for easy deployment
- Environment-based configuration

![Example interface](screenshot.png)

## Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker (optional, for containerized deployment)
- n8n instance (self-hosted or cloud)
- Telegram Bot Token

## Installation

```bash
git clone https://github.com/your-org/n8n-telegram-bot.git
cd n8n-telegram-bot
npm install
```

## Usage

1. Configure environment variables in `envs/.example` (copy to `.env` and fill in your values).
2. Start the service:
   ```bash
   npm run start
   ```
   Or with Docker:
   ```bash
   docker-compose up --build
   ```
3. Interact with your Telegram bot and connect it to n8n workflows.

## License

This project is licensed under the [MIT](LICENSE) license.

---

**Tips for contributing, FAQ, roadmap, and changelog can be added as needed.**