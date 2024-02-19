import { Injectable } from '@nestjs/common';
import { AdvertisementRepository } from './infrastructure/persistence/repositories/advertisement.repository';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { Advertisement } from './domain/advertisement';
import { SortAdvertisementDto } from './dto/query-advertisement.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';

@Injectable()
export class AdvertisementsService {
  constructor(
    private readonly advertisementsRepository: AdvertisementRepository,
  ) {}

  async create(
    createAdvertisementDto: CreateAdvertisementDto,
  ): Promise<Advertisement> {
    const clonedPayload = {
      ...createAdvertisementDto,
    };

    return this.advertisementsRepository.create(clonedPayload);
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
