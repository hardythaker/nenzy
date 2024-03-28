import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from 'src/company/entities/company.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Plan } from 'src/plan/entities/plan.entity';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({
  timestamps: true,
})
export class Subscription {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: Plan.name,
    alias: 'planId',
  })
  plan!: Plan;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: Company.name,
    alias: 'companyId',
  })
  company!: Company;

  @Prop({
    type: Date, //TODO: need to see if this should be a Date or String
    required: true,
  })
  startDate!: string;

  @Prop({
    type: Date,
    required: true,
  })
  endDate!: Date;

  @Prop({
    type: Types.ObjectId,
    ref: Coupon.name,
    alias: 'appliedCouponId',
    default: null,
  })
  appliedCoupon?: Coupon;

  @Prop({
    type: String,
    required: true,
  })
  paymentId!: string;

  @Prop({
    type: String,
    required: true,
  })
  paymentStatus!: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
