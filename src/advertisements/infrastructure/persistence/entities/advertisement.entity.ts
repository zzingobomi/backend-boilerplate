import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Advertisement } from 'src/advertisements/domain/advertisement';
import { FileEntity } from 'src/files/infrastructure/persistence/entities/file.entity';

@Entity({
  name: 'advertisement',
})
export class AdvertisementEntity extends EntityHelper implements Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, nullable: true })
  name?: string | null;

  @OneToMany(
    () => FileEntity,
    (attachmentFile) => attachmentFile.advertisement,
    { nullable: true },
  )
  attachmentFiles?: FileEntity[] | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
