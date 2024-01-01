import { Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor( private  UserService: UserService) {}


  @Put(':user/:course')
  async enroll(@Param('user') user : string , @Param('course') course : string){
      return this.UserService.enroll(user,course)
  }

  @Get('my/:id')
  async getmycourse(@Param('id') id : string){
      return this.UserService.getmycourse(id)
  }


}
