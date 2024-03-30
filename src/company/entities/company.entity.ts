import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Department } from 'src/department/entity/department.entity';
import { COMPANY_SIZE } from '../dto/create-company.dto';
import { Plan } from 'src/plan/entities/plan.entity';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({
  timestamps: true,
})
export class Company {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, enum: COMPANY_SIZE })
  size!: string;

  @Prop({
    type: [Types.ObjectId],
    required: true,
    ref: Department.name,
    alias: 'departmentIds',
  })
  departments!: Department[];

  //TODO: fecth the plan ids and add the FreePlan's id as default Plan Id
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: Plan.name,
    alias: 'planId',
  })
  plan!: Plan;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
