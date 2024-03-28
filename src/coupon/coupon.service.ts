import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Model } from 'mongoose';
import { Coupon } from './entities/coupon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private readonly couponModel: Model<Coupon>,
  ) {}

  //'This action adds a new coupon';
  create(createCouponDto: CreateCouponDto) {
    const newCoupon = new this.couponModel(createCouponDto);
    return newCoupon.save();
  }

  //`This action returns all coupon`;
  findAll() {
    return this.couponModel.find().lean().exec();
  }

  //`This action returns a #${id} coupon`;
  findOne(id: string) {
    return this.couponModel.findById(id).lean().exec();
  }

  //`This action updates a #${id} coupon`;
  update(id: string, updateCouponDto: UpdateCouponDto) {
    return this.couponModel
      .findByIdAndUpdate(id, updateCouponDto, { new: true })
      .lean()
      .exec();
  }

  //`This action removes a #${id} coupon`;
  remove(id: string) {
    return this.couponModel.findByIdAndDelete(id).lean().exec();
  }
}
