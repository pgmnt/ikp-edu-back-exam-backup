import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Document, Types } from 'mongoose';

@Schema({
    timestamps: true,
  })
  export class enroll{
   
    @Prop()
    name: string;

   
  }
  
  export const enrollSchema = SchemaFactory.createForClass(enroll);
  