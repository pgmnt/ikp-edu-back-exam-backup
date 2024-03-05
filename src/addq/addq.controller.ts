//addq.controller.ts
import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddqService } from './addq.service';
import { GenQuiz } from './dto/gen-quiz-dto';


@Controller('addq')

export class AddqController {
  constructor(private appqService: AddqService) { }

  //     @Post() 
  //     addquiz(@Body('id') id : string){
  //             return this.appqService.addquiz(id)
  //     }

  // @Post('/')
  // @UsePipes(ValidationPipe)
  // async getModelAnswer(
  // @Body(new ValidationPipe({ transform: true })) data: GetAiModelQuiz,
  // ) {
  // console.log('getModelAnswer >>', data);
  // return this.appqService.getModelAnswer(data , '5');
  // }


  // @Post('/regen')
  // regenQuiz(@Body(new ValidationPipe({ transform: true })) data: GetAiModelQuiz,) {
  //   console.log('Title Regen >>', data);
  //   return this.appqService.getModelAnswer(data, '1')

  // }

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
    @Body(new ValidationPipe({ transform: true })) input:GenQuiz,
  ) {
    // Call the getScrapedContent method from the service
    const result = await this.appqService.getModelAnswer(input);

    return { result }; // Modify the response as needed
  }


}


