// src/aeza-api/aeza-api.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AezaApiService } from './aeza-api.service';
import { AezaApiController } from './aeza-api.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AezaApiController],
  providers: [AezaApiService],
  exports: [AezaApiService],
})
export class AezaApiModule {}