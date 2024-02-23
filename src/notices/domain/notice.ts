import { IsNumber } from 'class-validator';

export class Notice {
  @IsNumber()
  id: number;

  title: string;
  content: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
