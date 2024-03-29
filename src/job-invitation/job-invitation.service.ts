import { Injectable } from '@nestjs/common';
import { CreateJobInvitationDto } from './dto/create-job-invitation.dto';
import { UpdateJobInvitationDto } from './dto/update-job-invitation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JobInvitation } from './entities/job-invitation.entity';
import { Model } from 'mongoose';

@Injectable()
export class JobInvitationService {
  constructor(
    @InjectModel(JobInvitation.name)
    private readonly jobInvitationModel: Model<JobInvitation>,
  ) {}

  //'This action adds a new jobInvitation';
  create(createJobInvitationDto: CreateJobInvitationDto) {
    const newJobInvitation = new this.jobInvitationModel(
      createJobInvitationDto,
    );
    return newJobInvitation.save();
  }

  //`This action returns all jobInvitation`;
  findAll() {
    return this.jobInvitationModel
      .find()
      .populate(['user', 'jobs'])
      .lean()
      .exec();
  }

  //`This action returns a #${id} jobInvitation`;
  findOne(id: string) {
    return this.jobInvitationModel
      .findById(id)
      .populate(['user', 'jobs'])
      .lean()
      .exec();
  }

  //`This action updates a #${id} jobInvitation`;
  update(id: string, updateJobInvitationDto: UpdateJobInvitationDto) {
    return this.jobInvitationModel
      .findByIdAndUpdate(id, UpdateJobInvitationDto)
      .populate(['user', 'jobs'])
      .lean()
      .exec();
  }

  //`This action removes a #${id} jobInvitation`;
  remove(id: string) {
    return this.jobInvitationModel.findByIdAndDelete(id).lean().exec();
  }
}
