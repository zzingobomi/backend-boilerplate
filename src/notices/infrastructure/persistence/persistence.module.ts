import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeEntity } from './entities/notice.entity';
import {
  NoticeRepository,
  NoticesRepositoryImpl,
} from './repositories/notice.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeEntity])],
  providers: [
    {
      provide: NoticeRepository,
      useClass: NoticesRepositoryImpl,
    },
  ],
  exports: [NoticeRepository],
})
export class NoticePersistenceModule {}
