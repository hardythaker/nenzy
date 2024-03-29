import { IsMongoId } from 'class-validator';

export class CreateJobInvitationDto {
  @IsMongoId()
  userId!: string;

  @IsMongoId()
  jobIds!: string[];
}
