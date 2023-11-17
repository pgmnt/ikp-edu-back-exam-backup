//addq.model.ts

import * as mongoose from 'mongoose';

export const QuizResponseSchema = new mongoose.Schema({
  lecture_id: String,
  questions: [
    {
      num: Number,
      question_text: String,
      options: [
        {
          ans: String,
          isCorrect: Boolean,
        },
      ],
    },
  ],
});

export interface QuizResponseDocument extends mongoose.Document {
  _id: string;
  lecture_id: string;
  questions: Array<{
    num: number;
    question_text: string;
    options: Array<{
      ans: string;
      isCorrect: boolean;
    }>;
  }>;
}
