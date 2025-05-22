import { Module, Global } from '@nestjs/common';
import { TelegrafService } from './telegraf.service';


@Global()
@Module({
  providers: [TelegrafService],
  exports: [TelegrafService],
})
export class TelegrafModule {}