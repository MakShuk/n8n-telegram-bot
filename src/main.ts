import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Получаем порт из аргументов командной строки, переменных окружения или по умолчанию
  function resolvePort(): number {
    const argvPort = process.argv
      .slice(2)
      .map(arg => {
        if (arg.startsWith('--port=')) return arg.split('=')[1];
        if (arg === '--port') return null;
        return null;
      })
      .filter(Boolean)[0];

    const nextArgPortIndex = process.argv.indexOf('--port');
    let nextArgPort: string | undefined;
    if (nextArgPortIndex !== -1 && process.argv[nextArgPortIndex + 1]) {
      nextArgPort = process.argv[nextArgPortIndex + 1];
    }

    const portStr = argvPort || nextArgPort || process.env.PORT;
    const port = portStr ? parseInt(portStr, 10) : 5890;
    return isNaN(port) ? 5890 : port;
  }

  let port = resolvePort();
  let serverStarted = false;

  while (!serverStarted) {
    try {
      const app = await NestFactory.create<NestExpressApplication>(AppModule);

      app.set('query parser', 'extended');

      // Настройка Swagger
      const config = new DocumentBuilder()
        .setTitle('Trade Hub API')
        .setDescription('API документация Trade Hub')
        .setVersion('1.0')
        .build();

      app.enableCors({
        origin: [
          /^http:\/\/localhost:(3[0-9]{3}|[4-5][0-9]{3}|6000)$/, // Разрешает порты с 3000 до 6000 на localhost
          /^http:\/\/192\.168\.0\.\d+:(3[0-9]{3}|[4-5][0-9]{3}|6000)$/, // Разрешает любой IP в диапазоне 192.168.0.0-255 с портами 3000-6000
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
      });

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);
      
      Logger.debug(`📝 Swagger документация доступна по адресу: http://localhost:${port}/api`);
      Logger.log(`🚀 Проект запущен на порту: ${port}`);

      await app.init();
      await app.listen(port);
      serverStarted = true;
    } catch (error: unknown) {
      Logger.error(
        `❌ Error starting server on port ${port}: ${(error as Error).message}`,
        (error as Error).stack,
      );
      port++;
      if (port > 65535) {
        Logger.error(`❌ Could not start server after multiple port retries.`);
        break;
      }
    }
  }
}

bootstrap();
