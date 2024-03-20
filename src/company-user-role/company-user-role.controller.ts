import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CompanyUserRoleService } from './company-user-role.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Company User Role')
@Controller('company-user-role')
export class CompanyUserRoleController {
  constructor(
    private readonly companyUserRoleService: CompanyUserRoleService,
  ) {}

  @Get()
  findAll() {
    return this.companyUserRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyUserRoleService
      .findOne(id)
      .populate(['user', 'company', 'role']);
  }

  //find one and populate by userId
  @Get('user/:id')
  findOneByUserId(@Param('id') id: string) {
    return this.companyUserRoleService
      .findOneByUserId(id)
      .populate(['user', 'company', 'role']);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyUserRoleService.remove(id);
  }
}
