import { Inject, Injectable } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './entities/job-application.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectModel(JobApplication.name)
    private readonly jobApplicationModel: Model<JobApplication>,
  ) {}

  //'This action adds a new jobApplication'
  create(createJobApplicationDto: CreateJobApplicationDto) {
    const newJobApplication = new this.jobApplicationModel(
      createJobApplicationDto,
    );
    return newJobApplication.save();
  }

  //`This action returns all jobApplication`
  findAll() {
    return this.jobApplicationModel.find().lean().exec();
  }

  //`This action returns a #${id} jobApplication`;
  findOne(id: string) {
    return this.jobApplicationModel.findById(id).lean().exec();
  }

  //`This action updates a #${id} jobApplication`;
  update(id: string, updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.jobApplicationModel
      .findByIdAndUpdate(id, updateJobApplicationDto)
      .lean()
      .exec();
  }

  //`This action removes a #${id} jobApplication`;
  remove(id: string) {
    return this.jobApplicationModel.findByIdAndDelete(id).lean().exec();
  }
}
