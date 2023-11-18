//chat-gpt-ai.model.ts

import * as mongoose from 'mongoose';

export const ChatGptResponseSchema = new mongoose.Schema({
  // Define your schema fields here
  question: String,
  answer: String,
  modelId: String,
  description: String,
  level: String,
  Category: String,
  requirement: String,
  lectureDetails: [
    {
      lectureNumber: String,
      lectureTitle: String,
      lectureWebsite: String,
    },
  ],
});

export interface ChatGptResponseDocument extends mongoose.Document {
  _id: string;
  question: string;
  answer: string;
  modelId: string;
  description: String;
  level: String,
  Category: String,
  requirement: String;
  lectureDetails: Array<{
    lectureNumber: string;
    lectureTitle: string;
    lectureWebsite: string;
  }>;
}