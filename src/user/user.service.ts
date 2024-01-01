import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { enroll } from 'src/auth/schemas/enroll.schema';
import { User } from 'src/auth/schemas/user.schema';
import { Outline } from 'src/outline/schemas/outline.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        // @InjectModel('Course')
        // private courseModel: Model<Course>,
        @InjectModel('User')
        private UserModel: Model<User>,
        @InjectModel('Enroll')
        private EnrollModel: Model<enroll>,
        @InjectModel('Outline')
        private OutlineModel: Model<Outline>,
        private jwtService: JwtService,
    ) { }


    async enroll(user : string , course : string){
        try{
           const findUser = await this.UserModel.findById(user)
           const objectcourse = new mongoose.Types.ObjectId(course);
           if(!findUser)return  new NotFoundException(`User with ID not found.`);
           const isEnrolled = findUser.enroll.some((val:any) => val._id.equals(objectcourse));
           if(isEnrolled){
            throw new HttpException('User is already enrolled in this course', HttpStatus.BAD_REQUEST);
           }

           const findoutline = await this.OutlineModel.findById(course)
           if(!findoutline) return new NotFoundException('Not found outline')
           
           const new_enroll = await new this.EnrollModel({
               _id : findoutline._id,
               name : findoutline.question
           })
           await new_enroll.save()
           findUser.enroll.push(new_enroll)
           await findUser.save()
           console.log(findUser)
           const newtoken = this.jwtService.sign({ 
            id: 'ss', 
            
          });

          console.log(newtoken)



           return {
               message: 'Enrollment successful',
               statusCode : 200,
               newtoken : ''
           
             };
        }catch(err){
         console.log(err)
       }
   }


   async getmycourse(id : string){
       try{
               const findmycourse = await this.EnrollModel

       }catch(error){
               console.log(error)

       }

   }




}
