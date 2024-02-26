import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import {
  UserRepository,
  UsersRepositoryImpl,
} from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UserRepository,
      useClass: UsersRepositoryImpl,
    },
  ],
  exports: [UserRepository],
})
export class UserPersistenceModule {}
