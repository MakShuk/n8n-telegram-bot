import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { Markup } from 'telegraf';
import { N8nService } from '../n8n/n8n.service';
import { Workflow } from 'n8n/n8n.types';

@Injectable()
export class BotCommandsService {
  constructor(private readonly n8nService: N8nService) {}

  start = async (ctx: Context) => {
    const workflows: Workflow[] = await this.n8nService.getWorkflows();
    // Оставляем только те workflows, у которых есть хотя бы один node с webhookId
    const filtered = workflows.filter(
      wf => Array.isArray(wf.nodes) && wf.nodes.some(node => node.webhookId),
    );
    const keyboard = Markup.inlineKeyboard(
      filtered.map(wf => [
        Markup.button.callback(wf.name, `workflow_${wf.nodes?.[0]?.webhookId ?? ''}`),
      ]),
    );

    return ctx.reply(`Выберите workflow с webhook:`, keyboard);
  };

  executeWorkflow = async (ctx: Context) => {
    let id: string | undefined = undefined;
    const cq = ctx.callbackQuery as any;
    if (cq && typeof cq.data === 'string') {
      const match = /^workflow_([0-9a-fA-F\-]{36})$/.exec(cq.data);
      id = match?.[1];
      if (id) {
        await this.n8nService.executeWebhookNode(id);
        return;
      }
    }
    return ctx.reply(`Workflow с webhookId: ${id} не найден`);
  };

  disable = async (ctx: Context) => {
    return ctx.reply(`⚠️ Функция недоступна для этого бота.`);
  };

  notResetContext = async (ctx: Context) => {
    return ctx.reply(
      `Ручной сброс состояния не требуется, бот автоматически сбрасывает состояние после завершения диалога.`,
    );
  };
}
