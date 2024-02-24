//addq.controller.ts
import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddqService } from './addq.service';
import { GetAiModelQuiz } from './model/get-quiz-model-answer';


@Controller('addq')

export class AddqController {
  constructor(private appqService: AddqService) { }

  //     @Post() 
  //     addquiz(@Body('id') id : string){
  //             return this.appqService.addquiz(id)
  //     }

  @Post('/')
  @UsePipes(ValidationPipe)
  async getModelAnswer(
  @Body(new ValidationPipe({ transform: true })) data: GetAiModelQuiz,
  ) {
  console.log('getModelAnswer >>', data);
  return this.appqService.getModelAnswer(data , '5');
  }


  @Post('/regen')
  regenQuiz(@Body(new ValidationPipe({ transform: true })) data: GetAiModelQuiz,) {
    console.log('Title Regen >>', data);
    return this.appqService.getModelAnswer(data, '1')

  }

  @Get()
  getDataQuiz() {
    return this.appqService.getDataQuiz()
  }

  //     @Delete(':id')
  //     deleteQuiz(@Param('id') id : string ){
  //             return this.appqService.deleteQuiz(id)
  //     }


  @Post('/scraped') // <-- Add this endpoint
  @UsePipes(ValidationPipe)
  async getScrapedContent(
    @Body(new ValidationPipe({ transform: true })) input: GetAiModelQuiz,
  ) {
    // Call the getScrapedContent method from the service
    const result = await this.appqService.getModelAnswer(input,String(5));

    return { result }; // Modify the response as needed
  }


}


