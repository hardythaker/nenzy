import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobTitleDocument = HydratedDocument<JobTitle>;
@Schema({
  timestamps: true,
})
export class JobTitle {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  unicode!: string;
}

export const JobTitleSchema = SchemaFactory.createForClass(JobTitle);
