import { RolesBuilder } from 'nest-access-control';
import { RoleEnum } from './roles/roles.enum';
import { ResourceEnum } from './app.resources';

export const roles: RolesBuilder = new RolesBuilder();

roles
  // User
  .grant(RoleEnum[RoleEnum.user])
  // Advertisement
  .grant(RoleEnum[RoleEnum.advertisement])
  .createOwn(ResourceEnum.advertisement)
  .readOwn(ResourceEnum.advertisement)
  .updateOwn(ResourceEnum.advertisement)
  .deleteOwn(ResourceEnum.advertisement)
  // Log
  .grant(RoleEnum[RoleEnum.log])
  .createOwn(ResourceEnum.log)
  .readOwn(ResourceEnum.log)
  .updateOwn(ResourceEnum.log)
  .deleteOwn(ResourceEnum.log)
  // Notice
  .grant(RoleEnum[RoleEnum.notice])
  .createOwn(ResourceEnum.notice)
  .readOwn(ResourceEnum.notice)
  .updateOwn(ResourceEnum.notice)
  .deleteOwn(ResourceEnum.notice)
  // Admin
  .grant(RoleEnum[RoleEnum.admin])
  .extend(RoleEnum[RoleEnum.user])
  .extend(RoleEnum[RoleEnum.advertisement])
  .extend(RoleEnum[RoleEnum.log])
  .extend(RoleEnum[RoleEnum.notice]);
