import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async create(createJobDto: CreateJobDto) {
    const newJob = new this.jobModel(createJobDto);
    newJob.publicLink = uuidv4();
    return newJob.save();
  }

  async findAll() {
    return this.jobModel.find().exec();
  }

  findJobByPublicLink(publicLink: string) {
    return this.jobModel.findOne({ publicLink });
  }

  async findOne(id: string) {
    return this.jobModel.findById(id).exec();
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    return this.jobModel
      .findByIdAndUpdate(id, updateJobDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.jobModel.findByIdAndDelete(id).exec();
  }
}
