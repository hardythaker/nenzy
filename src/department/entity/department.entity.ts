import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DepartmentDocument = HydratedDocument<Department>;

@Schema({
  timestamps: true,
})
export class Department {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, default: 'U+1F4BC' }) //Dafault value briefcase
  unicode!: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
