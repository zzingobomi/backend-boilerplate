import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Session } from 'src/session/domain/session';
import { UserEntity } from 'src/users/infrastructure/persistence/entities/user.entity';

@Entity({
  name: 'session',
})
export class SessionEntity extends EntityHelper implements Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @Index()
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
