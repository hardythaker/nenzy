import { IsMongoId } from 'class-validator';

export class CreateCompanyUserRoleDto {
  @IsMongoId()
  userId!: string;
  @IsMongoId()
  roleId!: string;
  @IsMongoId()
  companyId!: string;
}
