import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Job } from 'src/job/schema/job.schema';
import { User } from 'src/user/schemas/user.schema';

export type JobApplicationDocument = HydratedDocument<JobApplication>;

export enum JOB_APPLICATION_STATUS {
  completed = 'completed',
  interviewing = 'interviewing',
  cancelled = 'cancelled',
}
@Schema({
  timestamps: true,
})
export class JobApplication {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  user!: User;

  @Prop({ type: Types.ObjectId, required: true, ref: Job.name })
  job!: Job;

  @Prop({ type: String, required: true, enum: JOB_APPLICATION_STATUS })
  status!: string;

  @Prop({ required: true })
  chatHistory!: string[];

  @Prop({ required: true })
  appliedDate!: string;

  @Prop({ required: true })
  isQualified!: boolean;

  @Prop({ required: true })
  score!: number;

  @Prop({ required: true })
  feedback!: string;
}

export const JobApplicationSchema =
  SchemaFactory.createForClass(JobApplication);
