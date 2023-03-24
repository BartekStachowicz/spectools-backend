import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ require: true })
  username: string;
  @Prop({ require: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface UserInfo {
  id: string;
  username: string;
}

//DTO's

export class NewUserDTO {
  username: string;
  password: string;
}

export class ExistingUserDTO {
  username: string;
  password: string;
}
