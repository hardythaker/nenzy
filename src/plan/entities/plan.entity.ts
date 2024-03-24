import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({
  timestamps: true,
})
export class Plan {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ type: Number, required: true, min: 0 })
  price!: number;

  @Prop({ type: [String], default: [] })
  features?: string[];

  @Prop({ type: Number, required: true })
  teamMember!: number;

  @Prop({ type: Number, required: true, min: 1 })
  candidate!: number;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
