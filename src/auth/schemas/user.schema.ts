import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { enroll, enrollSchema } from './enroll.schema';

@Schema({
  timestamps: true,
})
export class User{
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'user' }) 
  role: string;
 
  @Prop()
  birth : Date;

  @Prop()
  gender : string;
  
  @Prop()
  occupation? : string;

  @Prop({ type: [enrollSchema] })
  enroll: enroll[];
}

export const UserSchema = SchemaFactory.createForClass(User);
