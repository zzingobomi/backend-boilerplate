import { Session } from 'src/session/domain/session';
import { User } from 'src/users/domain/user';

export type JwtPayloadType = Pick<User, 'id' | 'roles'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
