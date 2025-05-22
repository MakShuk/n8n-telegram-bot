import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { N8nService } from './n8n.service';
import { TriggerWorkflowDto, GetWorkflowsQuery } from './n8n.types';

@ApiTags('n8n')
@Controller('n8n')
export class N8nController {
  constructor(private readonly n8nService: N8nService) {}

  @Get()
  getStatus() {
    return { status: 'ok' };
  }

  @Post('trigger')
  @ApiBody({ type: TriggerWorkflowDto })
  async triggerWorkflow(@Body() dto: TriggerWorkflowDto) {
    return await this.n8nService.triggerWorkflow(dto.payload);
  }

  @Get('workflows')
  async getWorkflows(@Query() query: GetWorkflowsQuery) {
    return await this.n8nService.getWorkflows(query);
  }
}