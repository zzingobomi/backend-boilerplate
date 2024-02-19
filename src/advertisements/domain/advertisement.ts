import { IsNumber } from 'class-validator';

export class Advertisement {
  @IsNumber()
  id: number;

  name?: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
