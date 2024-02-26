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
  .createAny(ResourceEnum.advertisement)
  .readOwn(ResourceEnum.advertisement)
  .readAny(ResourceEnum.advertisement)
  .updateOwn(ResourceEnum.advertisement)
  .updateAny(ResourceEnum.advertisement)
  .deleteOwn(ResourceEnum.advertisement)
  .deleteAny(ResourceEnum.advertisement)
  // Log
  .grant(RoleEnum[RoleEnum.log])
  .createOwn(ResourceEnum.log)
  .createAny(ResourceEnum.log)
  .readOwn(ResourceEnum.log)
  .readAny(ResourceEnum.log)
  .updateOwn(ResourceEnum.log)
  .updateAny(ResourceEnum.log)
  .deleteOwn(ResourceEnum.log)
  .deleteAny(ResourceEnum.log)
  // Notice
  .grant(RoleEnum[RoleEnum.notice])
  .createOwn(ResourceEnum.notice)
  .createAny(ResourceEnum.notice)
  .readOwn(ResourceEnum.notice)
  .readAny(ResourceEnum.notice)
  .updateOwn(ResourceEnum.notice)
  .updateAny(ResourceEnum.notice)
  .deleteOwn(ResourceEnum.notice)
  .deleteAny(ResourceEnum.notice)
  // Admin
  .grant(RoleEnum[RoleEnum.admin])
  .extend(RoleEnum[RoleEnum.user])
  .extend(RoleEnum[RoleEnum.advertisement])
  .extend(RoleEnum[RoleEnum.log])
  .extend(RoleEnum[RoleEnum.notice]);
