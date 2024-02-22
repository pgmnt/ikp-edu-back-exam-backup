import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Examination {
  @Prop()
  question: string;

  @Prop()
  answer: string;

  @Prop()
  modelId: string;

  @Prop()
  course_id: string;

  @Prop()
  lecture_id: string;

  @Prop()
  num: number;

  @Prop()
  questions: Array<{
    question: string;
    options: Array<{
      ans: string;
      isCorrect: boolean;
    }>;
  }>;
}

export const ExamSchema = SchemaFactory.createForClass(Examination);
