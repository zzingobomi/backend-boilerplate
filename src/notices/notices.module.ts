import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { RelationalNoticePersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
  imports: [RelationalNoticePersistenceModule],
  controllers: [NoticesController],
  providers: [NoticesService],
  exports: [NoticesService, RelationalNoticePersistenceModule],
})
export class NoticesModule {}
