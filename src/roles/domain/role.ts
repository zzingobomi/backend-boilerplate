import { Allow, IsNumber } from 'class-validator';
import { User } from 'src/users/domain/user';
import { ManyToMany } from 'typeorm';

export class Role {
  @IsNumber()
  id: number;

  @Allow()
  name?: string;

  users?: User[] | null;
}
