import { Controller, Get, Post, Body } from '@nestjs/common';
import { N8nService } from './n8n.service';

@Controller('n8n')
export class N8nController {
  constructor(private readonly n8nService: N8nService) {}

  @Get()
  getStatus() {
    return { status: 'ok' };
  }

  @Post('trigger')
  async triggerWorkflow(@Body() payload: object) {
    return await this.n8nService.triggerWorkflow(payload);
  }
}