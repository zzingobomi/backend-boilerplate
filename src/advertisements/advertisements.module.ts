import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { AdvertisementPersistenceModule } from './infrastructure/persistence/persistence.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [AdvertisementPersistenceModule, FilesModule],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
  exports: [AdvertisementsService, AdvertisementPersistenceModule],
})
export class AdvertisementsModule {}
