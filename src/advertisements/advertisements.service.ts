import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdvertisementRepository } from './infrastructure/persistence/repositories/advertisement.repository';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { Advertisement } from './domain/advertisement';
import { SortAdvertisementDto } from './dto/query-advertisement.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class AdvertisementsService {
  constructor(
    private readonly advertisementsRepository: AdvertisementRepository,
    private readonly filesService: FilesService,
  ) {}

  // TODO: need transaction? 트랜잭션이 필요하지 않을까?
  async create(
    createAdvertisementDto: CreateAdvertisementDto,
  ): Promise<Advertisement> {
    const clonedPayload = {
      ...createAdvertisementDto,
    };

    const advertisement =
      await this.advertisementsRepository.create(clonedPayload);

    if (clonedPayload.files && clonedPayload.files.length > 0) {
      for (const file of clonedPayload.files) {
        await this.filesService.update(file.id, {
          advertisement: advertisement,
        });
      }
    }

    return advertisement;
  }

  findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortAdvertisementDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Advertisement[]> {
    return this.advertisementsRepository.findManyWithPagination({
      sortOptions,
      paginationOptions,
    });
  }

  findOne(
    fields: EntityCondition<Advertisement>,
  ): Promise<NullableType<Advertisement>> {
    return this.advertisementsRepository.findOne(fields);
  }

  // TODO: Update 테스트 및 각 이미지 추가 삭제 가능하도록 작업할것
  async update(
    id: Advertisement['id'],
    payload: DeepPartial<Advertisement>,
  ): Promise<Advertisement | null> {
    const clonedPayload = { ...payload };

    return this.advertisementsRepository.update(id, clonedPayload);
  }

  async softDelete(id: Advertisement['id']): Promise<void> {
    await this.advertisementsRepository.softDelete(id);
  }
}
