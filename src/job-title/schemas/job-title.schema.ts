import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobTitleDocument = HydratedDocument<JobTitle>;
@Schema({
  timestamps: true,
})
export class JobTitle {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: 'U+1F600' })
  unicode?: string;
}

export const JobTitleSchema = SchemaFactory.createForClass(JobTitle);
