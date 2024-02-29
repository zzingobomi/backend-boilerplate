import { Global, Module } from '@nestjs/common';
import { GamelogService } from './gamelog.service';

@Module({
  exports: [GamelogService],
  providers: [GamelogService],
})
export class GamelogModule {}
