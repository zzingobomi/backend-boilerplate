import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementEntity } from './entities/advertisement.entity';
import {
  AdvertisementRepository,
  AdvertisementsRepositoryImpl,
} from './repositories/advertisement.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertisementEntity])],
  providers: [
    {
      provide: AdvertisementRepository,
      useClass: AdvertisementsRepositoryImpl,
    },
  ],
  exports: [AdvertisementRepository],
})
export class AdvertisementPersistenceModule {}
