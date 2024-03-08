import { Injectable } from '@nestjs/common';
import { CreateJobTitleDto } from './dto/create-job-title.dto';
import { UpdateJobTitleDto } from './dto/update-job-title.dto';

@Injectable()
export class JobTitleService {
  create(createJobTitleDto: CreateJobTitleDto) {
    return 'This action adds a new jobTitle';
  }

  findAll() {
    return `This action returns all jobTitle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobTitle`;
  }

  update(id: number, updateJobTitleDto: UpdateJobTitleDto) {
    return `This action updates a #${id} jobTitle`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobTitle`;
  }
}
