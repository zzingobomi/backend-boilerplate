import { Injectable } from '@nestjs/common';
import { NoticeRepository } from './infrastructure/persistence/repositories/notice.repository';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from './domain/notice';
import { FilterNoticeDto, SortNoticeDto } from './dto/query-notice.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';

@Injectable()
export class NoticesService {
  constructor(private readonly noticesRepository: NoticeRepository) {}

  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    const clonedPayload = {
      ...createNoticeDto,
    };

    const notice = await this.noticesRepository.create(clonedPayload);
    return notice;
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterNoticeDto | null;
    sortOptions?: SortNoticeDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Notice[]> {
    return this.noticesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findOne(fields: EntityCondition<Notice>): Promise<NullableType<Notice>> {
    return this.noticesRepository.findOne(fields);
  }

  async update(
    id: Notice['id'],
    payload: DeepPartial<Notice>,
  ): Promise<Notice | null> {
    const clonedPayload = { ...payload };

    return this.noticesRepository.update(id, clonedPayload);
  }

  async softDelete(id: Notice['id']): Promise<void> {
    await this.noticesRepository.softDelete(id);
  }
}
