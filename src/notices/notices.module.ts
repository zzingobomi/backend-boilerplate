import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { NoticePersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
  imports: [NoticePersistenceModule],
  controllers: [NoticesController],
  providers: [NoticesService],
  exports: [NoticesService, NoticePersistenceModule],
})
export class NoticesModule {}
