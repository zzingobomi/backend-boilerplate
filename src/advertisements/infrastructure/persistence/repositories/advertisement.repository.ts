import { Advertisement } from 'src/advertisements/domain/advertisement';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { SortAdvertisementDto } from 'src/advertisements/dto/query-advertisement.dto';
import { Injectable } from '@nestjs/common';
import { AdvertisementEntity } from '../entities/advertisement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';

export abstract class AdvertisementRepository {
  abstract create(
    data: Omit<Advertisement, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Advertisement>;

  abstract findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortAdvertisementDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Advertisement[]>;

  abstract findOne(
    fields: EntityCondition<Advertisement>,
  ): Promise<NullableType<Advertisement>>;

  abstract update(
    id: Advertisement['id'],
    payload: DeepPartial<Advertisement>,
  ): Promise<Advertisement | null>;

  abstract softDelete(id: Advertisement['id']): Promise<void>;
}

@Injectable()
export class AdvertisementsRelationalRepository
  implements AdvertisementRepository
{
  constructor(
    @InjectRepository(AdvertisementEntity)
    private readonly advertisementsRepository: Repository<AdvertisementEntity>,
  ) {}

  async create(data: Advertisement): Promise<Advertisement> {
    const persistenceModel = AdvertisementMapper.toPersistence(data);
    const newEntity = await this.advertisementsRepository.save(
      this.advertisementsRepository.create(persistenceModel),
    );
    return AdvertisementMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortAdvertisementDto[] | null | undefined;
    paginationOptions: IPaginationOptions;
  }): Promise<Advertisement[]> {
    const entities = await this.advertisementsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      //relations: { attachmentFiles: true },
      //where: where,   // TODO where 조건 넣기
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((user) => AdvertisementMapper.toDomain(user));
  }

  async findOne(
    fields: EntityCondition<Advertisement>,
  ): Promise<NullableType<Advertisement>> {
    const entity = await this.advertisementsRepository.findOne({
      relations: { attachmentFiles: true },
      where: fields as FindOptionsWhere<AdvertisementEntity>,
    });

    return entity ? AdvertisementMapper.toDomain(entity) : null;
  }

  async update(
    id: number,
    payload: Partial<Advertisement>,
  ): Promise<Advertisement | null> {
    const entity = await this.advertisementsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('User not found');
    }

    const updatedEntity = await this.advertisementsRepository.save(
      this.advertisementsRepository.create(
        AdvertisementMapper.toPersistence({
          ...AdvertisementMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AdvertisementMapper.toDomain(updatedEntity);
  }

  async softDelete(id: number): Promise<void> {
    await this.advertisementsRepository.softDelete(id);
  }
}
