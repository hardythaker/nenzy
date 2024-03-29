import { PartialType } from '@nestjs/swagger';
import { CreateJobInvitationDto } from './create-job-invitation.dto';

export class UpdateJobInvitationDto extends PartialType(CreateJobInvitationDto) {}
