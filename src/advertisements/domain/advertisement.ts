import { IsNumber } from 'class-validator';
import { FileType } from 'src/files/domain/file';

export class Advertisement {
  @IsNumber()
  id: number;

  name?: string | null;

  attachmentFiles?: FileType[] | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
