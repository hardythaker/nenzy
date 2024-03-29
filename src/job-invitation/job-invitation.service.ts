import { Injectable } from '@nestjs/common';
import { CreateJobInvitationDto } from './dto/create-job-invitation.dto';
import { UpdateJobInvitationDto } from './dto/update-job-invitation.dto';

@Injectable()
export class JobInvitationService {
  create(createJobInvitationDto: CreateJobInvitationDto) {
    return 'This action adds a new jobInvitation';
  }

  findAll() {
    return `This action returns all jobInvitation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobInvitation`;
  }

  update(id: number, updateJobInvitationDto: UpdateJobInvitationDto) {
    return `This action updates a #${id} jobInvitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobInvitation`;
  }
}
