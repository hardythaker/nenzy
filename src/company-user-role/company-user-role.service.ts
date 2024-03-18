import { Injectable } from '@nestjs/common';
import { CompanyUserRole } from './schemas/company-user-role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyUserRoleDto } from './dto/create-company-user-role.dto';
import { UpdateCompanyUserRoleDto } from './dto/update-company-user-role.dto';

@Injectable()
export class CompanyUserRoleService {
  constructor(
    @InjectModel(CompanyUserRole.name)
    private readonly companyUserRoleModel: Model<CompanyUserRole>,
  ) {}

  //'This action adds a new role';
  create(createCompanyUserRoleDto: CreateCompanyUserRoleDto) {
    const newRole = new this.companyUserRoleModel(createCompanyUserRoleDto);
    return newRole.save();
  }

  //`This action returns all role`
  findAll() {
    return this.companyUserRoleModel.find().lean().exec();
  }

  //`This action returns a #${id} role`
  findOne(id: string) {
    return this.companyUserRoleModel.findById(id);
  }

  //`This action updates a #${id} role`
  update(id: string, updateCompanyUserRoleDto: UpdateCompanyUserRoleDto) {
    return this.companyUserRoleModel
      .findByIdAndUpdate(id, updateCompanyUserRoleDto, { new: true })
      .exec();
  }

  //`This action removes a #${id} role`
  remove(id: string) {
    return this.companyUserRoleModel.findByIdAndDelete(id).lean().exec();
  }
}
