import { Injectable } from '@nestjs/common';
import { User } from 'src/users/domain/user';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { Session } from './domain/session';
import { NullableType } from 'src/utils/types/nullable.type';
import { SessionRepository } from './infrastructure/persistence/repositories/session.repository';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  findOne(options: EntityCondition<Session>): Promise<NullableType<Session>> {
    return this.sessionRepository.findOne(options);
  }

  create(
    data: Omit<Session, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<Session> {
    return this.sessionRepository.create(data);
  }

  async softDelete(criteria: {
    id?: Session['id'];
    user?: Pick<User, 'id'>;
    excludeId?: Session['id'];
  }): Promise<void> {
    await this.sessionRepository.softDelete(criteria);
  }
}
