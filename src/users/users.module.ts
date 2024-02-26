import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { FilesModule } from 'src/files/files.module';
import { UsersService } from './users.service';
import { UserPersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
  imports: [UserPersistenceModule, FilesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UserPersistenceModule],
})
export class UsersModule {}
