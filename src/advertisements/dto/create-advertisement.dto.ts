import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAdvertisementDto {
  @ApiProperty({ example: 'Sample' })
  @IsNotEmpty()
  name: string | null;
}
