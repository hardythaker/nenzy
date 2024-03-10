import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

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

  @Prop({ required: true })
  userType!: string;

  @Prop()
  companyName?: string;

  @Prop()
  companySize?: string;

  @Prop()
  companyDeparments?: string[];

  @Prop()
  roles?: string[];

  @Prop()
  refreshToken?: string;

  @Prop({ default: true })
  isEnabled?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
