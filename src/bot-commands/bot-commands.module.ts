import { Module } from '@nestjs/common';
import { BotCommandsService } from './bot-commands.service';
import { N8nModule } from '../n8n/n8n.module';

@Module({
  imports: [N8nModule],
  providers: [BotCommandsService],
  exports: [BotCommandsService],
})
export class BotCommandsModule {}