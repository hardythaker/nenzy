import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Job } from 'src/job/entities/job.entity';
import { User } from 'src/user/entities/user.entity';

export type JobInvitationDocument = HydratedDocument<JobInvitation>;
@Schema({
  timestamps: true,
})
export class JobInvitation {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, alias: 'userId' })
  user!: User;

  @Prop({ type: Types.ObjectId, ref: 'Job', required: true, alias: 'jobIds' })
  Jobs!: Job[];
}

export const JobInvitationSchema = SchemaFactory.createForClass(JobInvitation);
