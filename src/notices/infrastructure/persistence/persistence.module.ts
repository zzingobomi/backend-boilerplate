import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeEntity } from './entities/notice.entity';
import {
  NoticeRepository,
  NoticesRelationalRepository,
} from './repositories/notice.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeEntity])],
  providers: [
    {
      provide: NoticeRepository,
      useClass: NoticesRelationalRepository,
    },
  ],
  exports: [NoticeRepository],
})
export class RelationalNoticePersistenceModule {}
