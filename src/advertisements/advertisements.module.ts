import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { RelationalAdvertisementPersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
  imports: [RelationalAdvertisementPersistenceModule],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
  exports: [AdvertisementsService, RelationalAdvertisementPersistenceModule],
})
export class AdvertisementsModule {}
