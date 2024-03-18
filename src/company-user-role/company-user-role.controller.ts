import { Controller } from '@nestjs/common';
import { CompanyUserRoleService } from './company-user-role.service';

@Controller('company-user-role')
export class CompanyUserRoleController {
  constructor(private readonly companyUserRoleService: CompanyUserRoleService) {}
}
