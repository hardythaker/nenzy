import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Company } from 'src/company/entities/company.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class CompanyUserRole {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  user_id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: Company.name })
  company_id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: Role.name })
  role_id!: Types.ObjectId;
}

export const CompanyUserRoleSchema =
  SchemaFactory.createForClass(CompanyUserRole);
