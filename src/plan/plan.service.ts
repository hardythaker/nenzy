import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Model } from 'mongoose';
import { Plan } from './entities/plan.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Plan.name) private readonly planModel: Model<Plan>,
  ) {}

  //'This action adds a new plan';
  create(createPlanDto: CreatePlanDto) {
    const newPlan = new this.planModel(createPlanDto);
    return newPlan.save();
  }

  //`This action returns all plan`
  findAll() {
    return this.planModel.find().lean().exec();
  }

  //`This action returns a #${id} plan`;
  findOne(id: string) {
    return this.planModel.findById(id).lean().exec();
  }

  findOneByName(name: string) {
    return this.planModel.findOne({ name }).exec();
  }

  //`This action updates a #${id} plan`;
  update(id: string, updatePlanDto: UpdatePlanDto) {
    return this.planModel
      .findByIdAndUpdate(id, updatePlanDto, { new: true })
      .lean()
      .exec();
  }

  //`This action removes a #${id} plan`;
  remove(id: string) {
    return this.planModel.findByIdAndDelete(id).lean().exec();
  }
}
