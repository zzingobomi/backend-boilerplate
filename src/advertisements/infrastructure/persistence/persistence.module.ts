import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementEntity } from './entities/advertisement.entity';
import {
  AdvertisementRepository,
  AdvertisementsRelationalRepository,
} from './repositories/advertisement.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertisementEntity])],
  providers: [
    {
      provide: AdvertisementRepository,
      useClass: AdvertisementsRelationalRepository,
    },
  ],
  exports: [AdvertisementRepository],
})
export class RelationalAdvertisementPersistenceModule {}
