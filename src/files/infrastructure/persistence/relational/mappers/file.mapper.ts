import { AdvertisementMapper } from 'src/advertisements/infrastructure/persistence/mappers/advertisement.mapper';
import { FileType } from '../../../../domain/file';
import { FileEntity } from '../entities/file.entity';
import { AdvertisementEntity } from 'src/advertisements/infrastructure/persistence/entities/advertisement.entity';

export class FileMapper {
  static toDomain(raw: FileEntity): FileType {
    const file = new FileType();
    file.id = raw.id;
    file.path = raw.path;
    if (raw.advertisement) {
      file.advertisement = AdvertisementMapper.toDomain(raw.advertisement);
    }
    return file;
  }

  static toPersistence(file: FileType): FileEntity {
    const fileEntity = new FileEntity();
    fileEntity.id = file.id;
    fileEntity.path = file.path;

    let advertisement: AdvertisementEntity | undefined = undefined;

    if (file.advertisement) {
      advertisement = new AdvertisementEntity();
      advertisement.id = file.advertisement.id;
    }

    fileEntity.advertisement = advertisement;

    return fileEntity;
  }
}
