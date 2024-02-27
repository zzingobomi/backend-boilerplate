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
  // Logdata
  .grant(RoleEnum[RoleEnum.logdata])
  .createOwn(ResourceEnum.logdata)
  .createAny(ResourceEnum.logdata)
  .readOwn(ResourceEnum.logdata)
  .readAny(ResourceEnum.logdata)
  .updateOwn(ResourceEnum.logdata)
  .updateAny(ResourceEnum.logdata)
  .deleteOwn(ResourceEnum.logdata)
  .deleteAny(ResourceEnum.logdata)
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
  .extend(RoleEnum[RoleEnum.logdata])
  .extend(RoleEnum[RoleEnum.notice]);
