import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Examination {
  @Prop()
  num: string;

  @Prop()
  question_text: string;

  @Prop({ type: [{ ans: String, isCorrect: Boolean }] })
  options: Array<{ ans: string; isCorrect: boolean }>;
}

export const ExamSchema = SchemaFactory.createForClass(Examination);
