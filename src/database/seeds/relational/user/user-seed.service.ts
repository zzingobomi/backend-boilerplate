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
    const countOscar = await this.repository.count({
      where: {
        userName: 'Oscar',
      },
    });

    if (!countOscar) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('oscar', salt);

      await this.repository.save(
        this.repository.create({
          userName: 'Oscar',
          email: 'oscar@maxst.com',
          password,
          roles: [
            {
              id: RoleEnum.admin,
              name: 'Admin',
            },
          ],
        }),
      );
    }

    const countNick = await this.repository.count({
      where: {
        userName: 'Nick',
      },
    });

    if (!countNick) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('nick', salt);

      await this.repository.save(
        this.repository.create({
          userName: 'Nick',
          email: 'nick@maxst.com',
          password,
          roles: [
            {
              id: RoleEnum.advertisement,
              name: 'Advertisement',
            },
          ],
        }),
      );
    }

    const countLuna = await this.repository.count({
      where: {
        userName: 'Luna',
      },
    });

    if (!countLuna) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('luna', salt);

      await this.repository.save(
        this.repository.create({
          userName: 'Luna',
          email: 'luna@maxst.com',
          password,
          roles: [
            {
              id: RoleEnum.log,
              name: 'Log',
            },
          ],
        }),
      );
    }

    const countLee = await this.repository.count({
      where: {
        userName: 'Lee',
      },
    });

    if (!countLee) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('lee', salt);

      await this.repository.save(
        this.repository.create({
          userName: 'Lee',
          email: 'lee@maxst.com',
          password,
          roles: [
            {
              id: RoleEnum.log,
              name: 'Log',
            },
            {
              id: RoleEnum.notice,
              name: 'Notice',
            },
          ],
        }),
      );
    }
  }
}
