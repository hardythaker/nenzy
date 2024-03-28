import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Model } from 'mongoose';
import { Subscription } from './entities/subscription.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>,
  ) {}

  //'This action adds a new subscription along with StartDate';
  create(createSubscriptionDto: CreateSubscriptionDto) {
    const newSubscription = new this.subscriptionModel(createSubscriptionDto);
    newSubscription.startDate = new Date().toISOString();
    return newSubscription.save();
  }

  //`This action returns all subscription`;
  findAll() {
    return this.subscriptionModel.find().lean().exec();
  }

  //`This action returns a #${id} subscription`;
  findOne(id: string) {
    return this.subscriptionModel.findById(id).lean().exec();
  }

  //`This action updates a #${id} subscription`;
  update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionModel
      .findByIdAndUpdate(id, updateSubscriptionDto)
      .lean()
      .exec();
  }

  //`This action removes a #${id} subscription`;
  remove(id: string) {
    return this.subscriptionModel.findByIdAndDelete(id).lean().exec();
  }
}
