import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobInvitationService } from './job-invitation.service';
import { CreateJobInvitationDto } from './dto/create-job-invitation.dto';
import { UpdateJobInvitationDto } from './dto/update-job-invitation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Job Invitation')
@Controller('job-invitation')
export class JobInvitationController {
  constructor(private readonly jobInvitationService: JobInvitationService) {}

  @Post()
  create(@Body() createJobInvitationDto: CreateJobInvitationDto) {
    return this.jobInvitationService.create(createJobInvitationDto);
  }

  @Get()
  findAll() {
    return this.jobInvitationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobInvitationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobInvitationDto: UpdateJobInvitationDto,
  ) {
    return this.jobInvitationService.update(id, updateJobInvitationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobInvitationService.remove(id);
  }
}
