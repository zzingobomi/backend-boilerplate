import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';

export class CreateAdvertisementDto {
  @ApiProperty({ example: 'Sample' })
  @IsNotEmpty()
  name: string | null;

  @ApiProperty({ type: () => FileDto })
  @IsOptional()
  files?: FileDto[] | null;
}
