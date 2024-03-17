import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Department } from 'src/department/schema/department.schema';
import { User } from 'src/user/schemas/user.schema';
import { COMPANY_SIZE } from '../dto/create-company.dto';

@Schema({
  timestamps: true,
})
export class Company {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, enum: COMPANY_SIZE })
  size!: string;

  @Prop({ type: [Types.ObjectId], required: true, ref: Department.name })
  departmentIds!: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], required: false, default: 1 }) //ref: Plan.name
  planId!: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], required: false }) //ref: Member.name
  memberId!: Types.ObjectId;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
