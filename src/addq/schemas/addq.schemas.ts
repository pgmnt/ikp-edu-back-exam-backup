//addq.schemas.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class QuizResponse {
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

export const QuizResponseSchema = SchemaFactory.createForClass(QuizResponse);
