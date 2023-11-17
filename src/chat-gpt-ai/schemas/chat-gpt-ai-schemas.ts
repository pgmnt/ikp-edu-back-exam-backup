// chat-gpt-ai-schemas.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

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
  requirement: String;

  @Prop([{
    lectureNumber: String,
    lectureTitle: String,
    lectureWebsite: String,
  }])
  lectureDetails: {
    lectureNumber: string;
    lectureTitle: string;
    lectureWebsite: string;
  }[];
}

export const ChatSchema = SchemaFactory.createForClass(ChatGptAiResponse);
