import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Model } from 'mongoose';
import { Company } from './entities/company.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    const newCompany = new this.companyModel(createCompanyDto);
    return newCompany.save();
  }

  findAll() {
    return this.companyModel.find().lean().exec();
  }

  findOne(id: string) {
    return this.companyModel.findById(id).lean().exec();
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true, lean: true })
      .exec();
  }

  //`This action removes a #${id} company`
  remove(id: string) {
    return this.companyModel
      .findByIdAndDelete(id, { new: true, lean: true })
      .exec();
  }
}
