//chat-gpt-ai.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { GetAiModelAnswer } from './model/get-ai-model-answer';


@Controller('api')
export class ChatGptAiController {
  constructor(
    private readonly service: ChatGptAiService,
  ) {}

  @Post('/message')
  @UsePipes(ValidationPipe)
  async getModelAnswer(
    @Body(new ValidationPipe({ transform: true })) data: GetAiModelAnswer,
  ) {
    console.log('getModelAnswer >>', data);
    return this.service.getModelAnswer(data);
  }

  @Post('/regenPath')
  async regenLearningPath(
    @Body(new ValidationPipe({ transform: true })) data: GetAiModelAnswer,
  ) {
    console.log('getModelAnswer >>', data);
    return this.service.regenLearningPath(data);
  }


  @Get('/model')
  listModels() {
    return this.service.listModels();
  }

  @Post('/courseGPT')
  Get_Course(@Body('id') id  : string){
      return this.service.get_Course(id)
  }

  @Delete('/learningPath/:courseId/:lectureId')
  async deleteLearningPath(
    @Param('courseId') courseId: string,
    @Param('lectureId') lectureId: string,
  ) {
    try {
      // Call your service method to delete the learning path or lecture
      await this.service.deleteLearningPath(courseId, lectureId);
      return { message: 'Learning path or lecture deleted successfully' };
    } catch (error) {
      // Handle errors appropriately (e.g., return an error response)
      throw new NotFoundException('Learning path or lecture not found');
    }
  }

  @Post('/add-lecture')
  async AddLecture(@Body() lectureData: { _id: string, lectureDetails: any[] }) {
  const { _id, lectureDetails } = lectureData; // Use "_id" instead of "courseId"
  return this.service.AddLearningPath(_id, lectureDetails);

  }
}

