import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import {
  FileRepository,
  FileRepositoryImpl,
} from './repositories/file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [
    {
      provide: FileRepository,
      useClass: FileRepositoryImpl,
    },
  ],
  exports: [FileRepository],
})
export class FilePersistenceModule {}
