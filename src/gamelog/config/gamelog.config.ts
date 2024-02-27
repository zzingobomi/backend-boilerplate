import { registerAs } from '@nestjs/config';
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { GameLogConfig } from './gamelog-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  GAMELOG_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  GAMELOG_PORT: number;

  @IsString()
  GAMELOG_USER: string;

  @IsString()
  GAMELOG_PASSWORD: string;

  @IsString()
  GAMELOG_DATABASE: string;
}

export default registerAs<GameLogConfig>('gamelog', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    host: process.env.GAMELOG_HOST,
    port: process.env.GAMELOG_PORT
      ? parseInt(process.env.GAMELOG_PORT, 10)
      : 5432,
    user: process.env.GAMELOG_USER,
    password: process.env.GAMELOG_PASSWORD,
    database: process.env.GAMELOG_DATABASE,
  };
});
