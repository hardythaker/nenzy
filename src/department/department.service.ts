import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Department } from './entity/department.entity';
import { Model } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Departments')
@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    const createdDepartment = new this.departmentModel(createDepartmentDto);
    return createdDepartment.save();
  }

  findAll() {
    return this.departmentModel.find().lean().exec();
  }

  findOne(id: string) {
    return this.departmentModel.findById(id).lean().exec();
  }

  update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentModel
      .findByIdAndUpdate(id, updateDepartmentDto, { new: true })
      .lean()
      .exec();
  }

  //Remove the document by ID
  remove(id: string) {
    return this.departmentModel.findByIdAndDelete(id).lean().exec();
  }
}
