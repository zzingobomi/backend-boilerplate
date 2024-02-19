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
} from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { Advertisement } from './domain/advertisement';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { QueryAdvertisementDto } from './dto/query-advertisement.dto';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Advertisements')
@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createProfileDto: CreateAdvertisementDto,
  ): Promise<Advertisement> {
    return this.advertisementsService.create(createProfileDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryAdvertisementDto,
  ): Promise<InfinityPaginationResultType<Advertisement>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.advertisementsService.findManyWithPagination({
        //filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(
    @Param('id') id: Advertisement['id'],
  ): Promise<NullableType<Advertisement>> {
    return this.advertisementsService.findOne({ id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Advertisement['id'],
    @Body() updateAdvertisementDto: UpdateAdvertisementDto,
  ): Promise<Advertisement | null> {
    return this.advertisementsService.update(id, updateAdvertisementDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: Advertisement['id']): Promise<void> {
    return this.advertisementsService.softDelete(id);
  }
}
