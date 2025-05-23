import { Injectable, OnModuleInit } from '@nestjs/common';
import { TelegrafService } from './telegraf/telegraf.service';
import { BotCommandsService } from 'bot-commands/bot-commands.service';



@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly telegraf: TelegrafService,
    private readonly commands: BotCommandsService,
  ) {}

  onModuleInit() {
    this.telegraf.createCommand('start', this.commands.start)
  }
}
