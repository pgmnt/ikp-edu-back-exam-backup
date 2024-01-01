import { Module } from '@nestjs/common';
import { OutlineController } from './outline.controller';
import { OutlineService } from './outline.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  OutlineSchema } from './schemas/outline.schema';
import { LearningPathSchema } from './schemas/learningPath.schema';
import { ExamSchema } from 'src/exam/schemas/exam.schema';
import { QuizmodelSchema } from './schemas/quiz.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Outline', schema: OutlineSchema }]),
    MongooseModule.forFeature([{ name: 'LearningPath', schema: LearningPathSchema }]),
    MongooseModule.forFeature([{ name: 'Examination', schema: ExamSchema }]),
    MongooseModule.forFeature([{ name: 'Quizmodel', schema: QuizmodelSchema }]),
  ],
  controllers: [OutlineController],
  providers: [OutlineService]
})
export class OutlineModule {}
