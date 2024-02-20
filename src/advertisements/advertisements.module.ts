import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { RelationalAdvertisementPersistenceModule } from './infrastructure/persistence/persistence.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [RelationalAdvertisementPersistenceModule, FilesModule],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
  exports: [AdvertisementsService, RelationalAdvertisementPersistenceModule],
})
export class AdvertisementsModule {}
