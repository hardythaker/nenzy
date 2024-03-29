import { Module } from '@nestjs/common';
import { JobInvitationService } from './job-invitation.service';
import { JobInvitationController } from './job-invitation.controller';

@Module({
  controllers: [JobInvitationController],
  providers: [JobInvitationService],
})
export class JobInvitationModule {}
