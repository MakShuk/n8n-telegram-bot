import { TelegrafModule } from './telegraf/telegraf.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfigModuleOptions } from './configs/env-config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleOptions()),
    TelegrafModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
