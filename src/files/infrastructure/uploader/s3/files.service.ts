import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileType } from 'src/files/domain/file';
import { FileRepository } from '../../persistence/repositories/file.repository';

@Injectable()
export class FilesS3Service {
  constructor(private readonly fileRepository: FileRepository) {}

  async create(file: Express.MulterS3.File): Promise<{ file: FileType }> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return {
      file: await this.fileRepository.create({
        path: file.key,
      }),
    };
  }
}
