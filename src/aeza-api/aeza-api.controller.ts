// src/aeza-api/aeza-api.controller.ts

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AezaApiService } from './aeza-api.service';

@ApiTags('Aeza API')
@Controller('aeza-api')
export class AezaApiController {
  constructor(private readonly aezaApiService: AezaApiService) { }

  @Get('account')
  @ApiOperation({ summary: 'Получить информацию об аккаунте' })
  @ApiResponse({ status: 200, description: 'Информация об аккаунте успешно получена.' })
  async getAccount() {
    return this.aezaApiService.getAccount();
  }
}