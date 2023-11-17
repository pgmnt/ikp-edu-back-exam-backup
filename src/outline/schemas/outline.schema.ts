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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LearningPath' }] })
  lectureDetails: LearningPath[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Examination' }] })
  examination: Examination[];
}

export const OutlineSchema = SchemaFactory.createForClass(Outline);




