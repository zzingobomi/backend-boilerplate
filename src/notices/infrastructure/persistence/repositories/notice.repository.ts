import { Notice } from 'src/notices/domain/notice';
import {
  FilterNoticeDto,
  SortNoticeDto,
} from 'src/notices/dto/query-notice.dto';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeEntity } from '../entities/notice.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { NoticeMapper } from '../mappers/notice.mapper';

export abstract class NoticeRepository {
  abstract create(
    data: Omit<Notice, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Notice>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterNoticeDto | null;
    sortOptions?: SortNoticeDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Notice[]>;

  abstract findOne(
    fields: EntityCondition<Notice>,
  ): Promise<NullableType<Notice>>;

  abstract update(
    id: Notice['id'],
    payload: DeepPartial<Notice>,
  ): Promise<Notice | null>;

  abstract softDelete(id: Notice['id']): Promise<void>;
}

@Injectable()
export class NoticesRepositoryImpl implements NoticeRepository {
  constructor(
    @InjectRepository(NoticeEntity)
    private readonly noticesRepository: Repository<NoticeEntity>,
  ) {}

  async create(data: Notice): Promise<Notice> {
    const persistenceModel = NoticeMapper.toPersistence(data);
    const newEntity = await this.noticesRepository.save(
      this.noticesRepository.create(persistenceModel),
    );
    return NoticeMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterNoticeDto | null;
    sortOptions?: SortNoticeDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Notice[]> {
    // TODO: 좀더 공통적이고 리팩토링할 수 없을까?
    const where: FindOptionsWhere<NoticeEntity> = {};
    if (filterOptions?.title) {
      where.title = Like(`%${filterOptions.title}%`);
    }
    if (filterOptions?.content) {
      where.content = Like(`%${filterOptions.content}%`);
    }

    const entities = await this.noticesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((notice) => NoticeMapper.toDomain(notice));
  }

  async findOne(
    fields: EntityCondition<Notice>,
  ): Promise<NullableType<Notice>> {
    const entity = await this.noticesRepository.findOne({
      where: fields as FindOptionsWhere<NoticeEntity>,
    });

    return entity ? NoticeMapper.toDomain(entity) : null;
  }

  async update(id: Notice['id'], payload: Partial<Notice>): Promise<Notice> {
    const entity = await this.noticesRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Notice not found');
    }

    const updatedEntity = await this.noticesRepository.save(
      this.noticesRepository.create(
        NoticeMapper.toPersistence({
          ...NoticeMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return NoticeMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Notice['id']): Promise<void> {
    await this.noticesRepository.softDelete(id);
  }
}
