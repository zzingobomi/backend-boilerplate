import { Advertisement } from 'src/advertisements/domain/advertisement';
import { AdvertisementEntity } from '../entities/advertisement.entity';

export class AdvertisementMapper {
  static toDomain(raw: AdvertisementEntity): Advertisement {
    const advertisement = new Advertisement();
    advertisement.id = raw.id;
    advertisement.name = raw.name;
    advertisement.createdAt = raw.createdAt;
    advertisement.updatedAt = raw.updatedAt;
    advertisement.deletedAt = raw.deletedAt;
    return advertisement;
  }

  static toPersistence(advertisement: Advertisement): AdvertisementEntity {
    const advertisementEntity = new AdvertisementEntity();
    if (advertisement.id && typeof advertisement.id === 'number') {
      advertisementEntity.id = advertisement.id;
    }
    advertisementEntity.name = advertisement.name;
    advertisementEntity.createdAt = advertisement.createdAt;
    advertisementEntity.updatedAt = advertisement.updatedAt;
    advertisementEntity.deletedAt = advertisement.deletedAt;
    return advertisementEntity;
  }
}
