import { Global, Module } from '@nestjs/common';
import { GamelogService } from './gamelog.service';
import {
  CONNECTION_POOL,
  ConfigurableDatabaseModule,
  DATABASE_OPTIONS,
} from './gamelog.module-definition';
import { Pool } from 'pg';
import { GameLogConfig } from './config/gamelog-config.type';

@Global()
@Module({
  exports: [GamelogService],
  providers: [
    GamelogService,
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      useFactory: (gamelogConfig: GameLogConfig) => {
        return new Pool({
          host: gamelogConfig.host,
          port: gamelogConfig.port,
          user: gamelogConfig.user,
          password: gamelogConfig.password,
          database: gamelogConfig.database,
        });
      },
    },
  ],
})
export class GamelogModule extends ConfigurableDatabaseModule {}
