import { ConfigurableModuleBuilder } from '@nestjs/common';
import { GameLogConfig } from './config/gamelog-config.type';

export const CONNECTION_POOL = 'CONNECTION_POOL';

export const {
  ConfigurableModuleClass: ConfigurableDatabaseModule,
  MODULE_OPTIONS_TOKEN: DATABASE_OPTIONS,
} = new ConfigurableModuleBuilder<GameLogConfig>()
  .setClassMethodName('forRoot')
  .build();
