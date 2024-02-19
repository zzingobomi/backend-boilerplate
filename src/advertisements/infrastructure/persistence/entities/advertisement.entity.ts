import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Advertisement } from 'src/advertisements/domain/advertisement';

@Entity({
  name: 'advertisement',
})
export class AdvertisementEntity
  extends EntityRelationalHelper
  implements Advertisement
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  name?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
