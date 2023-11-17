import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

export enum Category {
  PROGRAMMING = 'Programming',
  GRAPHIC = 'Graphic',
}

export enum Level {
  LV1 = 'Easy',
  LV2 = 'Hard',
}

@Schema({
  timestamps: true,
})
export class Plans {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  level: Level;


}

export const CourseSchema = SchemaFactory.createForClass(Plans);
