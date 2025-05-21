import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfigModuleOptions } from './configs/env-config/config.module';



import { AezaApiModule } from './aeza-api/aeza-api.module';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleOptions()),
    AezaApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
