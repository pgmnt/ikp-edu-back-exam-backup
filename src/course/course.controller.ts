import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schemas/course.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';


@Controller('api/course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  // @Get()
  // async getAllCourses(@Query() query: ExpressQuery): Promise<Course[]> {
  //   return this.courseService.findAll(query);
  // }


  @Put(':id/:params')
  async enroll(@Param('id') id : string , @Param('params') params : string){
      return this.courseService.enroll(id,params)
  }

  @Get('my')
  async getmycourse(@Param('id') id : string){
      return this.courseService.getmycourse(id)
  }
  // @Post()
  // @UseGuards(AuthGuard())
  // async createCourse(
  //   @Body()
  //   course: CreateCourseDto,
  //   @Req() req,
  // ): Promise<Course> {
  //   return this.courseService.create(course, req.user);
  // }

  // @Get(':id')
  // async getCourse(
  //   @Param('id')
  //   id: string,
  // ): Promise<Course> {
  //   return this.courseService.findById(id);
  // }

  // @Put(':id')
  // async updateCourse(
  //   @Param('id')
  //   id: string,
  //   @Body()
  //   course: UpdateCourseDto,
  // ): Promise<Course> {
  //   return this.courseService.updateById(id, course);
  // }

  // @Delete(':id')
  // async deleteCourse(
  //   @Param('id')
  //   id: string,
  // ): Promise<Course> {
  //   return this.courseService.deleteById(id);
  // }


// @Post('/add')
// SaveCourse(@Body('dataCourse') dataCourse:any){
//   return this.courseService.addcoe(dataCourse)
// };
   
}

