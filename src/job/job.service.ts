import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './schema/job.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JobService {

  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {
  }

  async create(createJobDto: CreateJobDto) {
    return this.jobModel.create(createJobDto);
  }

  async findAll() {
    return this.jobModel.find().exec()
  }

  async findOne(id: string) {
    return this.jobModel.findById(id).exec();
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    return this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true }).exec();  
  }

  async remove(id: string) {
    return this.jobModel.findByIdAndDelete(id);
  }
}
