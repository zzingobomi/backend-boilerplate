import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Notice } from '../domain/notice';
import { Transform, Type, plainToInstance } from 'class-transformer';

export class FilterNoticeDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @Type(() => String)
  title?: string | null;

  // TODO: 추후에 mysql text 필드는 like 검색에 매우 느려진다고 알고있다.
  // 실무에서는 어떤식으로 처리하는지 사례 확인해볼것!
  @ApiProperty({ type: String })
  @IsOptional()
  @Type(() => String)
  content?: string | null;
}

export class SortNoticeDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Notice;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryNoticeDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterNoticeDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterNoticeDto)
  filters?: FilterNoticeDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    // Ex) {{host}}/v1/notices?page=2&limit=10&sort=[{"orderBy":"id","order":"desc"}]
    // 만약 형식을 지키지 않는다면 에러가 나고 만다.. 체크해서 프론트에 알려줘야 할듯?
    // IsArray 는 배열이 아닌걸 잡는걸 가능하나 만약 JSON 파싱이 안될때는 500 에러가 난다..
    // TODO: exception 처리 꼭 해줄것
    return value
      ? plainToInstance(SortNoticeDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortNoticeDto)
  sort?: SortNoticeDto[] | null;
}
