import { RoleEntity } from 'src/roles/infrastructure/persistence/entities/role.entity';
import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const user = new User();
    user.id = raw.id;
    user.email = raw.email;
    user.password = raw.password;
    user.previousPassword = raw.previousPassword;
    user.provider = raw.provider;
    user.userName = raw.userName;
    user.createdAt = raw.createdAt;
    user.updatedAt = raw.updatedAt;
    user.deletedAt = raw.deletedAt;
    user.roles = raw.roles;
    return user;
  }

  static toPersistence(user: User): UserEntity {
    const userEntity = new UserEntity();
    if (user.id && typeof user.id === 'number') {
      userEntity.id = user.id;
    }
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.previousPassword = user.previousPassword;
    userEntity.provider = user.provider;
    userEntity.userName = user.userName;

    if (user.roles && user.roles.length > 0) {
      userEntity.roles = [];
      for (const role of user.roles) {
        const roleEntity = new RoleEntity();
        roleEntity.id = role.id;
        userEntity.roles.push(roleEntity);
      }
    }

    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    userEntity.deletedAt = user.deletedAt;
    return userEntity;
  }
}
