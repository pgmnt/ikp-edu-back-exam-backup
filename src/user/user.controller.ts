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

  @Put('IfPass/:idUser/:index/:idCourse')
  async IfPass(@Param('idUser') idUser : string , @Param('index') index : number , @Param('idCourse') idCourse : string ){
        return this.UserService.IfPass(idUser,index,idCourse)
  }

  @Put('IfExamPass/:idUser/:idCourse')
  async IfExamPass(@Param('idUser') idUser : string , @Param('idCourse') idCourse : string){
        return this.UserService.IfExamPass(idUser,idCourse)
  }

  @Get('admin/:name')
  async getAuthors(@Param('name') name : string){
        return this.UserService.getAuthors(name)
  }
  


}
