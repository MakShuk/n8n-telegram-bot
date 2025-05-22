import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TriggerWorkflowDto {
  @ApiProperty({ description: 'Данные для запуска workflow', type: Object })
  payload!: Record<string, any>;
}

export class GetWorkflowsQuery {
  @ApiPropertyOptional({ type: Boolean, description: 'Фильтр по активности' })
  active?: boolean;

  @ApiPropertyOptional({ type: String, description: 'Теги' })
  tags?: string;

  @ApiPropertyOptional({ type: String, description: 'Имя workflow' })
  name?: string;

  @ApiPropertyOptional({ type: String, description: 'ID проекта' })
  projectId?: string;

  @ApiPropertyOptional({ type: Boolean, description: 'Исключить pinned data' })
  excludePinnedData?: boolean;

  @ApiPropertyOptional({ type: Number, description: 'Лимит' })
  limit?: number;

  @ApiPropertyOptional({ type: String, description: 'Курсор' })
  cursor?: string;
}