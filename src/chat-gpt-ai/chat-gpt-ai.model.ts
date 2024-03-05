import * as mongoose from 'mongoose';

export const ChatGptResponseSchema = new mongoose.Schema({
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
      lectureWebsite: Array<String>,
      lectureDescription: String,
    },
  ],
});

export interface ChatGptResponseDocument extends mongoose.Document {
  lectureWebsite: string[];
  lectureDescription: any; // เพิ่ม lectureDescription ที่นี่
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
    lectureDescription: string; // เพิ่ม lectureDescription ที่นี่
    lectureTitle: string;
    lectureWebsite: string[];
  }>;
}



