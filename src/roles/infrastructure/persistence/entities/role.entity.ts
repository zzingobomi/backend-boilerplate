import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Role } from 'src/roles/domain/role';
import { UserEntity } from 'src/users/infrastructure/persistence/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'role',
})
export class RoleEntity extends EntityHelper implements Role {
  @PrimaryColumn()
  @Exclude()
  id: number;

  @Column()
  name?: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users?: UserEntity[] | null;
}
