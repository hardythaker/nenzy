import { Module } from '@nestjs/common';
import { CompanyUserRoleService } from './company-user-role.service';
import { CompanyUserRoleController } from './company-user-role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CompanyUserRole,
  CompanyUserRoleSchema,
} from './entities/company-user-role.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompanyUserRole.name,
        schema: CompanyUserRoleSchema,
      },
    ]),
  ],
  controllers: [CompanyUserRoleController],
  providers: [CompanyUserRoleService],
  exports: [CompanyUserRoleService],
})
export class CompanyUserRoleModule {}
