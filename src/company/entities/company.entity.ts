import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Department } from 'src/department/schema/department.schema';
import { COMPANY_SIZE } from '../dto/create-company.dto';

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
  @Prop({ type: Types.ObjectId, required: true, default: 1 }) //ref: Plan.name
  plan?: Types.ObjectId; //TODO change it to plan class
}

export const CompanySchema = SchemaFactory.createForClass(Company);
