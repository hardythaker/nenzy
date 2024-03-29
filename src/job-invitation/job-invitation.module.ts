import { Module } from '@nestjs/common';
import { JobInvitationService } from './job-invitation.service';
import { JobInvitationController } from './job-invitation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobInvitation,
  JobInvitationSchema,
} from './entities/job-invitation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobInvitation.name,
        schema: JobInvitationSchema,
      },
    ]),
  ],
  controllers: [JobInvitationController],
  providers: [JobInvitationService],
})
export class JobInvitationModule {}
