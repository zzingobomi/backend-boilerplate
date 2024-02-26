import { Notice } from 'src/notices/domain/notice';
import { NoticeEntity } from '../entities/notice.entity';

export class NoticeMapper {
  static toDomain(raw: NoticeEntity): Notice {
    const notice = new Notice();
    notice.id = raw.id;
    notice.title = raw.title;
    notice.content = raw.content;
    notice.createdAt = raw.createdAt;
    notice.updatedAt = raw.updatedAt;
    notice.deletedAt = raw.deletedAt;

    return notice;
  }

  static toPersistence(notice: Notice): NoticeEntity {
    const noticeEntity = new NoticeEntity();
    if (notice.id && typeof notice.id === 'number') {
      noticeEntity.id = notice.id;
    }

    noticeEntity.title = notice.title;
    noticeEntity.content = notice.content;

    noticeEntity.createdAt = notice.createdAt;
    noticeEntity.updatedAt = notice.updatedAt;
    noticeEntity.deletedAt = notice.deletedAt;

    return noticeEntity;
  }
}
