import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return (await this.userService.findAll()).map((user) => {
      const { password, ...result } = user.toJSON({
        versionKey: false,
      });
      return result;
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = (await this.userService.findOneById(id))?.toJSON({
      versionKey: false,
    });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...result } = user;
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    const user = (await this.userService.update(id, UpdateUserDto))?.toJSON({
      versionKey: false,
    });
    if (!user) throw new NotFoundException('User not found');

    const { password, ...result } = user;
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
