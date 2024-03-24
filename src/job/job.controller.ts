import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    const createdJob = await this.jobService.create(createJobDto);
    //return createdJob;
    return {
      _id: createdJob.id,
      isPublic: createdJob.isPublic,
      publicLink: createdJob.publicLink,
    };
  }

  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @Get('public')
  findJobByPublicLink(@Query('job') publicLink: string) {
    return this.jobService
      .findJobByPublicLink(publicLink)
      .populate(['title', 'company'])
      .exec();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(id);
  }
}
