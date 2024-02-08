//chat-gpt-ai.model.ts

import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

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
      lectureWebsite1: String,
      lectureWebsite2: String
    },
  ],
});

export interface ChatGptResponseDocument extends mongoose.Document {
  lectureWebsite1: any;
  lectureWebsite2: any;
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
    lectureWebsite1: string;
    lectureWebsite2: string;
  }>;
}

