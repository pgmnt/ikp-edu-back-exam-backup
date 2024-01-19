// chat-gpt-ai.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ChatGptAiController } from './chat-gpt-ai.controller';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { ChatSchema } from './schemas/chat-gpt-ai-schemas';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'ChatGptResponse', schema: ChatSchema }]),
  ],
  controllers: [ChatGptAiController],
  providers: [ChatGptAiService],
})
export class ChatGptAiModule {}
