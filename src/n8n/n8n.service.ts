import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import type { IN8NResponse, Workflow, IN8NNode } from './n8n.types';

@Injectable()
export class N8nService {
  private readonly logger = new Logger(N8nService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async executeWebhookNode(webhookId: string): Promise<any> {
    const url = `${this.configService.get('N8N_BASE_URL')}/webhook/${webhookId}`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(url),
      );
      this.logger.log(`Webhook executed: ${response.status}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getWorkflows(): Promise<Workflow[]> {
    const url = `${this.configService.get('N8N_BASE_URL')}/api/v1/workflows`;
    const headers = { 'X-N8N-API-KEY': this.configService.get('N8N_API_KEY') };
    const params: any = {};

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers, params, timeout: 15000 }),
      );
      this.logger.log(`Workflows retrieved: ${response.status}`);

      const workflows = response.data.data;
      for (const workflow of workflows) {
        console.log(workflow.nodes);
      }

      return this.extractWorkflows(response.data);
    } catch (error) {
      this.handleError(error);
      return [];
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

  private extractWorkflows(data: IN8NResponse): Workflow[] {
    if (!data || !Array.isArray(data.data)) return [];
    return data.data.map(({ id, name, nodes }) => ({
      id,
      name,
      nodes: nodes
        ? nodes
            .filter(
              (node): node is IN8NNode =>
                node.type === 'n8n-nodes-base.webhook' && typeof node.webhookId === 'string',
            )
            .map(node => ({
              id: node.id,
              name: node.name,
              webhookId: node.webhookId,
            }))
        : undefined,
    }));
  }
}
