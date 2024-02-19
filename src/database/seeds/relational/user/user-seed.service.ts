import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEnum } from 'src/roles/roles.enum';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.admin,
        },
      },
    });

    if (!countAdmin) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('1234567890', salt);

      await this.repository.save(
        this.repository.create({
          userName: 'Oscar',
          email: 'zzingo5@gmail.com',
          password,
          role: {
            id: RoleEnum.admin,
            name: 'Admin',
          },
        }),
      );
    }
  }
}
