import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CouponDocument = HydratedDocument<Coupon>;
@Schema({
  timestamps: true,
})
export class Coupon {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  code!: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    max: 100,
  })
  discount!: number;

  @Prop({
    type: Date,
    default: new Date().toISOString(),
  })
  startDate?: Date;

  @Prop({
    type: Date,
    default: null,
  })
  expiryDate?: Date;

  @Prop({
    type: Number,
    min: 0,
    default: 0, //O means unlimited usage
  })
  usageLimit?: number;

  @Prop({
    type: Number,
    min: 0,
    default: 0,
  })
  usageCount?: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive?: boolean;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
