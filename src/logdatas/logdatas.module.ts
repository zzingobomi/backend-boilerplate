import { Module } from '@nestjs/common';
import { LogdatasService } from './logdatas.service';
import { LogdatasController } from './logdatas.controller';
import { LogdatasRepository } from './logdatas.repository';

@Module({
  controllers: [LogdatasController],
  providers: [LogdatasService, LogdatasRepository],
})
export class LogdatasModule {}
