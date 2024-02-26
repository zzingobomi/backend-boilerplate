import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FileMapper } from '../mappers/file.mapper';
import { FileType } from 'src/files/domain/file';
import { DeepPartial } from 'src/utils/types/deep-partial.type';

export abstract class FileRepository {
  abstract create(data: Omit<FileType, 'id'>): Promise<FileType>;

  abstract findOne(
    fields: EntityCondition<FileType>,
  ): Promise<NullableType<FileType>>;

  abstract update(
    id: FileType['id'],
    payload: DeepPartial<FileType>,
  ): Promise<FileType | null>;
}

@Injectable()
export class FileRepositoryImpl implements FileRepository {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async create(data: FileType): Promise<FileType> {
    const persistenceModel = FileMapper.toPersistence(data);
    return this.fileRepository.save(
      this.fileRepository.create(persistenceModel),
    );
  }

  async findOne(
    fields: EntityCondition<FileType>,
  ): Promise<NullableType<FileType>> {
    const entity = await this.fileRepository.findOne({
      where: fields as FindOptionsWhere<FileEntity>,
    });

    return entity ? FileMapper.toDomain(entity) : null;
  }

  async update(
    id: FileType['id'],
    payload: Partial<FileType>,
  ): Promise<FileType> {
    const entity = await this.fileRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('File not found');
    }

    const updatedEntity = await this.fileRepository.save(
      this.fileRepository.create(
        FileMapper.toPersistence({
          ...FileMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return FileMapper.toDomain(updatedEntity);
  }
}
