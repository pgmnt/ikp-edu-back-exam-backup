import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseSchema } from './schemas/course.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
