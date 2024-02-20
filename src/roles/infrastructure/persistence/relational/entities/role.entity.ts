import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Role } from '../../../../domain/role';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'role',
})
export class RoleEntity extends EntityRelationalHelper implements Role {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users?: UserEntity[] | null;
}
