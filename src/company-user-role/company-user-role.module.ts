import { Module } from '@nestjs/common';
import { CompanyUserRoleService } from './company-user-role.service';
import { CompanyUserRoleController } from './company-user-role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CompanyUserRole,
  CompanyUserRoleSchema,
} from './schemas/company-user-role.schema';

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
})
export class CompanyUserRoleModule {}
