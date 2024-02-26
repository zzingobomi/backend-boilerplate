import { Module } from '@nestjs/common';
import {
  SessionRepository,
  SessionRepositoryImpl,
} from './repositories/session.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity])],
  providers: [
    {
      provide: SessionRepository,
      useClass: SessionRepositoryImpl,
    },
  ],
  exports: [SessionRepository],
})
export class SessionPersistenceModule {}
