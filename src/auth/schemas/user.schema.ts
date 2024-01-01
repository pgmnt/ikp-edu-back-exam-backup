import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { enroll } from './enroll.schema';

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'enrollModel' }] })
  enroll: enroll[];
}

export const UserSchema = SchemaFactory.createForClass(User);
