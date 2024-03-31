import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Model, MongooseError } from 'mongoose';
import { Company } from './entities/company.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyUserRoleService } from 'src/company-user-role/company-user-role.service';
import { CreateCompanyUserRoleDto } from 'src/company-user-role/dto/create-company-user-role.dto';
import { ValidationError, validateOrReject } from 'class-validator';
import { RoleService } from 'src/role/role.service';
import { RoleDocument } from 'src/role/entities/role.entity';
import { DeleteResult } from 'mongodb';
import { CompanyUserRoleDocument } from 'src/company-user-role/entities/company-user-role.entity';
import { PlanService } from 'src/plan/plan.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    private readonly companyUserRoleService: CompanyUserRoleService,
    private readonly roleService: RoleService,
    private readonly planService: PlanService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const newCompany = new this.companyModel(createCompanyDto);

    //Whenever we create a company we also create an associated CompanyUserRole
    //set the Default Role ID to 'Owner'
    let role: RoleDocument | null;
    try {
      role = await this.roleService.findOneByName('owner');
      if (!role?.id) {
        throw new MongooseError('Unable to fetch the default Role ID');
      }
    } catch {
      throw new MongooseError('Unable to fetch the default Role ID');
    }

    //Create the companyUserRoleDTO Object and validate it.
    const companyUserRole = new CreateCompanyUserRoleDto();
    companyUserRole.companyId = newCompany.id;
    companyUserRole.roleId = role?.id;
    companyUserRole.userId = createCompanyDto.userId;
    try {
      await validateOrReject(companyUserRole);
    } catch (error: any) {
      throw new BadRequestException(
        (error as ValidationError[]).flatMap((e) =>
          Object.values(e.constraints ?? e.toString),
        ),
      );
    }

    //create an associated CompanyUserRole
    let createdCompanyUserRole: CompanyUserRoleDocument;
    try {
      createdCompanyUserRole =
        await this.companyUserRoleService.create(companyUserRole);
    } catch (error) {
      throw error;
    }

    if (!createdCompanyUserRole?.id) {
      throw new MongooseError(
        'Unable to create an entry for companyUserRole table',
      );
    }

    // Sets the default value to 'Free' plan id
    // Fetch the 'free' plan ID
    try {
      const freePlan = await this.planService.findOneByName('free');
      if (!freePlan?.id) {
        throw new MongooseError('Unable to fetch the default Plan ID');
      }
      newCompany.plan = freePlan.id; // Assign the 'free' plan ID
    } catch (error) {
      console.error('Error fetching default Plan ID:', error);
      // Handle the error appropriately, e.g., throw a custom error
      throw new Error('Failed to create company due to plan retrieval error');
    }

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
  async remove(id: string) {
    //Before Deleting an company delete associated CompanyUserRole as well
    let deletedCompanyUserRole: DeleteResult;
    try {
      deletedCompanyUserRole =
        await this.companyUserRoleService.removeByCompanyId(id);
    } catch (err) {
      console.log(err);
      throw new MongooseError('Unable to delete associated CompanyUserRole');
    }

    if (!deletedCompanyUserRole.deletedCount) {
      //There should be at least one CompanyUserRole record. Because we are creating it by default while creating the company.
      //If execution is reaching here then there is a bug in the code while creating the company. Please report it to the developer.
      throw new MongooseError('No associated CompanyUserRole found');
    }

    return this.companyModel
      .findByIdAndDelete(id, { new: true, lean: true })
      .exec();
  }
}
