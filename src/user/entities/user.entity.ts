import {
  HydratedDocument,
  Types,
} from 'mongoose';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { USER_TYPE } from '../dto/create-user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  //This field is just for TypeScript purpose. It has nothing to do with validations and creation of Documents.
  _id!: Types.ObjectId;

  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ enum: USER_TYPE })
  userType?: USER_TYPE;

  @Prop()
  refreshToken?: string;

  @Prop({ default: true })
  isEnabled?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
