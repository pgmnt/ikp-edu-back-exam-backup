import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { LearningPath } from './learningPath.schema';
import { Examination } from 'src/exam/schemas/exam.schema';

@Schema({
  timestamps: true,
})
export class Outline {
  @Prop()
  question: string;

  @Prop()
  description: string;

  @Prop()
  requirement: string;


  @Prop()
  author: string;

  @Prop({ default: false })
  publish: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LearningPath' }] })
  lectureDetails: LearningPath[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Examination' }] })
  examination: Examination[];

  @Prop({default : 0})
  numberUser :number

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  WhoEnroll: mongoose.Schema.Types.ObjectId[];
}

export const OutlineSchema = SchemaFactory.createForClass(Outline);




