import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { USER_ROLE } from '../dto/create-role.dto';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;


@Schema({
  timestamps: true,
})
export class Role {
  @Prop({ required: true, unique: true, enum: USER_ROLE })
  name!: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
