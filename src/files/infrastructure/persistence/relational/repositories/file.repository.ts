import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FileRepository } from '../../file.repository';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FileMapper } from '../mappers/file.mapper';
import { FileType } from '../../../../domain/file';

@Injectable()
export class FileRelationalRepository implements FileRepository {
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
