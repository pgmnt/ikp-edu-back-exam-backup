// chat-gpt-ai-schemas.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  PROGRAMMING = 'IT',
  GRAPHIC = 'Graphic',
}

export enum Level {
  LV1 = 'Beginner',
  LV2 = 'Intermediate',
  LV3 = 'Advanced'
}

@Schema()
export class ChatGptAiResponse {

  @Prop()
  question: string;

  @Prop()
  answer: string;

  @Prop()
  modelId: string;

  @Prop()
  description: String;

  @Prop()
  level: Level;

  @Prop()
  category: Category;

  @Prop()
  requirement: String;

  @Prop([{
    lectureNumber: String,
    lectureTitle: String,
    lectureWebsite1: String,
    lectureWebsite2: String,
    lectureDescription: String
  }])
  lectureDetails: {
    lectureNumber: String;
    lectureWebsite1: String,
    lectureWebsite2: String,
    lectureDescription: String;
  }[];
}

export const ChatSchema = SchemaFactory.createForClass(ChatGptAiResponse);
