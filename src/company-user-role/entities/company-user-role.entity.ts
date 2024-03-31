import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from 'src/company/entities/company.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

export type CompanyUserRoleDocument = HydratedDocument<CompanyUserRole>;

@Schema({
  timestamps: true,
})
export class CompanyUserRole {
  @Prop({
    type: Types.ObjectId,
    unique: true,
    required: true,
    ref: User.name,
    alias: 'userId',
  })
  user!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: Company.name,
    alias: 'companyId',
  })
  company!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: Role.name,
    alias: 'roleId',
  })
  role!: Types.ObjectId;
}

export const CompanyUserRoleSchema =
  SchemaFactory.createForClass(CompanyUserRole);
