import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';

export class AuthUpdateDto {
  @ApiProperty({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto;

  @ApiProperty({ example: 'Oscar' })
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  userName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  oldPassword?: string;
}
