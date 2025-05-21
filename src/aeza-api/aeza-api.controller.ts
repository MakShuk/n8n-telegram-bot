// src/aeza-api/aeza-api.controller.ts

import { Controller, Get } from '@nestjs/common';
import { AezaApiService } from './aeza-api.service';

@Controller('aeza-api')
export class AezaApiController {
  constructor(private readonly aezaApiService: AezaApiService) { }  

  @Get('account')
  async getAccount() {
    return this.aezaApiService.getAccount();
  }
}