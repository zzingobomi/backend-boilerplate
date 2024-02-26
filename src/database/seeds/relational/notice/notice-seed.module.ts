import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeEntity } from 'src/notices/infrastructure/persistence/entities/notice.entity';
import { NoticeSeedService } from './notice-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeEntity])],
  providers: [NoticeSeedService],
  exports: [NoticeSeedService],
})
export class NoticeSeedModule {}
