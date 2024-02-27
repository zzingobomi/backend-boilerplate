import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/roles/infrastructure/persistence/entities/role.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        id: RoleEnum.admin,
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.admin,
          name: 'Admin',
        }),
      );
    }

    const countUser = await this.repository.count({
      where: {
        id: RoleEnum.user,
      },
    });

    if (!countUser) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.user,
          name: 'User',
        }),
      );
    }

    const countAdvertisement = await this.repository.count({
      where: {
        id: RoleEnum.advertisement,
      },
    });

    if (!countAdvertisement) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.advertisement,
          name: 'Advertisement',
        }),
      );
    }

    const countLog = await this.repository.count({
      where: {
        id: RoleEnum.logdata,
      },
    });

    if (!countLog) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.logdata,
          name: 'Logdata',
        }),
      );
    }

    const countNotice = await this.repository.count({
      where: {
        id: RoleEnum.notice,
      },
    });

    if (!countNotice) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.notice,
          name: 'Notice',
        }),
      );
    }
  }
}
