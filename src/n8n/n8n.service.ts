import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { TriggerWorkflowDto, GetWorkflowsQuery } from './n8n.types';

@Injectable()
export class N8nService {
  private readonly logger = new Logger(N8nService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async triggerWorkflow(payload: TriggerWorkflowDto['payload']): Promise<any> {
    const url = `${this.configService.get('N8N_BASE_URL')}/webhook/${this.configService.get('WORKFLOW_ID')}`;
    const headers = { 'X-N8N-API-KEY': this.configService.get('N8N_API_KEY') };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, payload, { headers, timeout: 15000 }),
      );
      this.logger.log(`Workflow triggered: ${response.status}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getWorkflows(query: GetWorkflowsQuery): Promise<any> {
    const url = `${this.configService.get('N8N_BASE_URL')}/workflows`;
    const headers = { 'X-N8N-API-KEY': this.configService.get('N8N_API_KEY') };
    const params: any = {};

    console.log(url);

    if (query.active !== undefined) params.active = query.active;
    if (query.tags) params.tags = query.tags;
    if (query.name) params.name = query.name;
    if (query.projectId) params.projectId = query.projectId;
    if (query.excludePinnedData !== undefined) params.excludePinnedData = query.excludePinnedData;
    if (query.limit !== undefined) params.limit = query.limit;
    if (query.cursor) params.cursor = query.cursor;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers, params, timeout: 15000 }),
      );
      this.logger.log(`Workflows retrieved: ${response.status}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): void {
    if (error.response) {
      this.logger.error(
        `n8n API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
      );
    } else if (error.request) {
      this.logger.error('No response from n8n API');
    } else {
      this.logger.error(`Error: ${error.message}`);
    }
    throw error;
  }
}
