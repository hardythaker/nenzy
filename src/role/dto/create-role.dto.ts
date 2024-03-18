import { IsEnum } from 'class-validator';

export enum USER_ROLE {
  owner = 'owner',
  admin = 'admin',
  maintainer = 'maintainer',
}

export class CreateRoleDto {
  @IsEnum(USER_ROLE)
  name!: USER_ROLE;
}
