import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfigModuleOptions } from './configs/env-config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
