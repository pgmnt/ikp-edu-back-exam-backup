import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamSchema } from './schemas/exam.schema';
import { OutlineSchema } from 'src/outline/schemas/outline.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Exam', schema: ExamSchema }]),
    MongooseModule.forFeature([{ name: 'Outline', schema: OutlineSchema }]),
  ],

  providers: [ExamService],
  controllers: [ExamController]
})
export class ExamModule {}
