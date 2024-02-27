import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from './domain/notice';
import { QueryNoticeDto } from './dto/query-notice.dto';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { ResourceEnum } from 'src/app.resources';

@ApiBearerAuth()
@ApiTags('Notices')
@Controller({
  path: 'notices',
  version: '1',
})
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @UseGuards(RolesGuard, ACGuard)
  @UseRoles({
    resource: ResourceEnum.notice,
    action: 'create',
    possession: 'any',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice> {
    return this.noticesService.create(createNoticeDto);
  }

  @UseGuards(RolesGuard, ACGuard)
  @UseRoles({
    resource: ResourceEnum.notice,
    action: 'read',
    possession: 'any',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryNoticeDto,
  ): Promise<InfinityPaginationResultType<Notice>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.noticesService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @UseGuards(RolesGuard, ACGuard)
  @UseRoles({
    resource: ResourceEnum.notice,
    action: 'read',
    possession: 'any',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Notice['id']): Promise<NullableType<Notice>> {
    return this.noticesService.findOne({ id });
  }

  @UseGuards(RolesGuard, ACGuard)
  @UseRoles({
    resource: ResourceEnum.notice,
    action: 'update',
    possession: 'any',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Notice['id'],
    @Body() updateNoticeDto: UpdateNoticeDto,
  ): Promise<Notice | null> {
    return this.noticesService.update(id, updateNoticeDto);
  }

  @UseGuards(RolesGuard, ACGuard)
  @UseRoles({
    resource: ResourceEnum.notice,
    action: 'delete',
    possession: 'any',
  })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: Notice['id']): Promise<void> {
    return this.noticesService.softDelete(id);
  }
}
