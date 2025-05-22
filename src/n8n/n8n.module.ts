import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { getConfigModuleOptions } from '../configs/env-config/config.module';
import { N8nService } from './n8n.service';
import { N8nController } from './n8n.controller';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(getConfigModuleOptions()),
  ],
  controllers: [N8nController],
  providers: [N8nService],
  exports: [N8nService],
})
export class N8nModule {}