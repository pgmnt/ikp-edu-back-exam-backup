// chat-gpt-ai-schemas.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  PROGRAMMING = 'Programming',
  GRAPHIC = 'Graphic',
}

export enum Level {
  LV1 = 'Easy',
  LV2 = 'Hard',
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
  }])
  lectureDetails: {
    lectureNumber: string;
    lectureWebsite1: String,
    lectureWebsite2: String,
  }[];
}

export const ChatSchema = SchemaFactory.createForClass(ChatGptAiResponse);
