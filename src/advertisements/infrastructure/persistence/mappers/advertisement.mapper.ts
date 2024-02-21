import { Advertisement } from 'src/advertisements/domain/advertisement';
import { AdvertisementEntity } from '../entities/advertisement.entity';
import { FileMapper } from 'src/files/infrastructure/persistence/relational/mappers/file.mapper';

export class AdvertisementMapper {
  static toDomain(raw: AdvertisementEntity): Advertisement {
    const advertisement = new Advertisement();
    advertisement.id = raw.id;
    advertisement.name = raw.name;
    advertisement.createdAt = raw.createdAt;
    advertisement.updatedAt = raw.updatedAt;
    advertisement.deletedAt = raw.deletedAt;

    if (raw.attachmentFiles) {
      // TODO: 이게 꼭 필요한가..?
      advertisement.attachmentFiles = [];
      for (const file of raw.attachmentFiles) {
        advertisement.attachmentFiles?.push(FileMapper.toDomain(file));
      }
    }

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
