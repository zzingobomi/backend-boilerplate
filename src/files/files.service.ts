import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FileRepository } from './infrastructure/persistence/file.repository';
import { FileType } from './domain/file';
import { DeepPartial } from 'src/utils/types/deep-partial.type';

@Injectable()
export class FilesService {
  constructor(private readonly fileRepository: FileRepository) {}

  findOne(fields: EntityCondition<FileType>): Promise<NullableType<FileType>> {
    return this.fileRepository.findOne(fields);
  }

  update(
    id: FileType['id'],
    payload: DeepPartial<FileType>,
  ): Promise<FileType | null> {
    return this.fileRepository.update(id, payload);
  }
}
