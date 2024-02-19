import { Exclude, Expose } from 'class-transformer';
import { FileType } from 'src/files/domain/file';
import { Role } from 'src/roles/domain/role';

export class User {
  id: number | string;

  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;
  userName: string | null;
  photo?: FileType | null;
  role?: Role | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
