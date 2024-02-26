import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeEntity } from 'src/notices/infrastructure/persistence/entities/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeSeedService {
  constructor(
    @InjectRepository(NoticeEntity)
    private repository: Repository<NoticeEntity>,
  ) {}

  async run() {
    const countNotice = await this.repository.count();
    if (countNotice <= 0) {
      for (let i = 1; i <= 200; i++) {
        await this.repository.save(
          this.repository.create({
            title: `title ${i}`,
            content: `content ${i}`,
          }),
        );
      }
    }
  }
}
