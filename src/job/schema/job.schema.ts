import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Company } from 'src/company/entities/company.entity';
import { Department } from 'src/department/schema/department.schema';
import { JobTitle } from 'src/job-title/schemas/job-title.schema';
import { User } from 'src/user/schemas/user.schema';

export type JobDocument = HydratedDocument<Job>;

export enum JobLevel {
  'Entry-Level' = 'Entry-Level',
  'Junior' = 'Junior',
  'Mid-Level' = 'Mid-Level',
  'Senior-Level' = 'Senior-Level',
  'Executive' = 'Executive',
}

@Schema({
  timestamps: true,
})
export class Job {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: Company.name,
    alias: 'companyId',
  })
  company!: Company;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
    alias: 'userId',
  })
  user!: User;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: JobTitle.name,
    alias: 'titleId',
  })
  title!: JobTitle;

  @Prop({ type: String, required: true, enum: JobLevel })
  level!: string;

  @Prop({ type: [String], default: [] })
  customQuestions?: string[];

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: Department.name,
    alias: 'departmentId',
  })
  department!: Department;

  @Prop({ type: Number, default: 0 })
  limit?: number;

  @Prop({ type: Date, default: null })
  endDate?: Date;

  @Prop({ type: Boolean, default: true })
  isPublic?: boolean;

  @Prop({ type: String, required: true, unique: true })
  publicLink!: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
