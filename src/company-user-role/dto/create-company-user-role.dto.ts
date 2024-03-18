import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCompanyUserRoleDto {
  @IsMongoId()
  user_id!: Types.ObjectId;
  @IsMongoId()
  company_id!: Types.ObjectId;
  @IsMongoId()
  role_id!: Types.ObjectId;
}
