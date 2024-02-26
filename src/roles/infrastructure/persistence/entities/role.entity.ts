import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Role } from 'src/roles/domain/role';
import { UserEntity } from 'src/users/infrastructure/persistence/entities/user.entity';

@Entity({
  name: 'role',
})
export class RoleEntity extends EntityHelper implements Role {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users?: UserEntity[] | null;
}
