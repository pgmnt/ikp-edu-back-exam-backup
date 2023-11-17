import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { ChatCompletionApiModule } from './chat-completion-api/chat-completion-api.module';
import { ChatGptAiModule } from './chat-gpt-ai/chat-gpt-ai.module';
import { AddqModule } from './addq/addq.module';
import { OutlineModule } from './outline/outline.module';

@Module({
  imports: [
    ChatGptAiModule, ChatCompletionApiModule, ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    CourseModule,
    ChatGptAiModule,
    AuthModule,
    AddqModule,
    // ExamModule,
    OutlineModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
