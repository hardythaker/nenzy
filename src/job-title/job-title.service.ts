import { Injectable } from '@nestjs/common';
import { CreateJobTitleDto } from './dto/create-job-title.dto';
import { UpdateJobTitleDto } from './dto/update-job-title.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JobTitle } from './entities/job-title.entity';
import { Model } from 'mongoose';

@Injectable()
export class JobTitleService {
  constructor(
    @InjectModel(JobTitle.name) private jobTitleModel: Model<JobTitle>,
  ) {}

  create(createJobTitleDto: CreateJobTitleDto) {
    return this.jobTitleModel.create(createJobTitleDto);
  }

  findAll() {
    return this.jobTitleModel.find().exec();
  }

  findOne(id: string) {
    return this.jobTitleModel.findById(id).exec();
  }

  update(id: string, updateJobTitleDto: UpdateJobTitleDto) {
    return this.jobTitleModel
      .findByIdAndUpdate(id, updateJobTitleDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.jobTitleModel.findByIdAndDelete(id).exec();
  }
}
