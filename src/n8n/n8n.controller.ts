import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { N8nService } from './n8n.service';


@ApiTags('n8n')
@Controller('n8n')
export class N8nController {
  constructor(private readonly n8nService: N8nService) {}

  @Get('workflows')
  async getWorkflows() {
    return await this.n8nService.getWorkflows();
  }

  @Get('webhook/:id')
  async executeWebhook(@Param('id') id: string) {
    return await this.n8nService.executeWebhookNode(id);
  }
}