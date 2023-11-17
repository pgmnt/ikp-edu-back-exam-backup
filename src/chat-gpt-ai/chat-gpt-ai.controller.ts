//chat-gpt-ai.controller.ts

import {
  Body,
  Controller,
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

  // @Post('/quiz')
  // @UsePipes(ValidationPipe)
  // async getModelAnswer(
  //   @Body(new ValidationPipe({ transform: true })) data: GetAiModelAnswer,
  // ) {
  //   console.log('getModelAnswer >>', data);
  //   return this.service.getModelAnswer(data);
  // }

  @Get('/model')
  listModels() {
    return this.service.listModels();
  }

  @Post('/courseGPT')
  Get_Course(@Body('id') id  : string){
      return this.service.get_Course(id)
  }

  
}
