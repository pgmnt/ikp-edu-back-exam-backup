import { Module } from '@nestjs/common';
import { PlancourseService } from './plancourse.service';
import { PlancourseController } from './plancourse.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plans } from './schemas/plancourse.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Plan', schema: Plans }]),

  ] ,
  providers: [],
  controllers: []
})
export class PlancourseModule {}
