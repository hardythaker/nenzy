import { PartialType } from '@nestjs/swagger';
import { CreateCompanyUserRoleDto } from './create-company-user-role.dto';

export class UpdateCompanyUserRoleDto extends PartialType(
  CreateCompanyUserRoleDto,
) {}
