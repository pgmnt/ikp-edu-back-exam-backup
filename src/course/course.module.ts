import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseSchema } from './schemas/course.schema';
import { enrollSchema } from 'src/auth/schemas/enroll.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { OutlineSchema } from 'src/outline/schemas/outline.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name : 'Enroll' , schema : enrollSchema},
    {name : 'Outline' , schema : OutlineSchema}
  ])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
