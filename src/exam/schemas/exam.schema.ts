import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Examination {
  @Prop()
  question_text: string;

  @Prop()
  answer: string;
  @Prop()
  num: number;

  @Prop()
  options: Array<{
    question: string;
    options: Array<{
      ans: string;
      isCorrect: boolean;
    }>;
  }>;
}

export const ExamSchema = SchemaFactory.createForClass(Examination);
