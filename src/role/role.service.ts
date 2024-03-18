import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Model } from 'mongoose';
import { Role } from './entities/role.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  //'This action adds a new role';
  create(createRoleDto: CreateRoleDto) {
    const newRole = new this.roleModel(createRoleDto);
    return newRole.save();
  }

  //`This action returns all role`
  findAll() {
    return this.roleModel.find().lean().exec();
  }

  //`This action returns a #${id} role`
  findOne(id: string) {
    return this.roleModel.findById(id);
  }

  //`This action updates a #${id} role`
  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .exec();
  }

  //`This action removes a #${id} role`
  remove(id: string) {
    return this.roleModel.findByIdAndDelete(id).lean().exec();
  }
}
