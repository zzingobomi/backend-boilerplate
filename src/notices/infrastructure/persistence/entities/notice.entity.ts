import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
import { Notice } from 'src/notices/domain/notice';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';

@Entity({
  name: 'notice',
})
export class NoticeEntity extends EntityRelationalHelper implements Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
