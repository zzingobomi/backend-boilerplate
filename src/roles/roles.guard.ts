import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();

    // TODO: 만약 배열로 안들어오면 예외처리 해줘야 할듯?
    if (request.user?.roles) {
      request.user.roles = request.user.roles.map((role) =>
        role.name.toLowerCase(),
      );
    }

    return true;
  }
}
