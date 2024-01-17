import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import { enroll } from "src/auth/schemas/enroll.schema";
import { User } from "src/auth/schemas/user.schema";
import { Outline } from "src/outline/schemas/outline.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    // @InjectModel('Course')
    // private courseModel: Model<Course>,
    @InjectModel("User")
    private UserModel: Model<User>,
    @InjectModel("Enroll")
    private EnrollModel: Model<enroll>,
    @InjectModel("Outline")
    private OutlineModel: Model<Outline>,
    private jwtService: JwtService
  ) {}

  async enroll(user: string, course: string) {
    try {
      const findUser = await this.UserModel.findById(user);
      const userobject = new mongoose.Types.ObjectId(user);
      const objectcourse = new mongoose.Types.ObjectId(course);
      if (!findUser) return new NotFoundException(`User with ID not found.`);
      const isEnrolled = findUser.enroll.some((val: any) =>
        val._id.equals(objectcourse)
      );
      if (isEnrolled) {
        throw new HttpException(
          "User is already enrolled in this course",
          HttpStatus.BAD_REQUEST
        );
      }
      

      const findoutline = await this.OutlineModel.findById(course);
      if (!findoutline) return new NotFoundException("Not found outline");
      findoutline.numberUser = findoutline.numberUser + 1;
      await findoutline.save()

      const new_enroll = new this.EnrollModel({
        id: findoutline._id,
        question: findoutline.question,
        IsPass: findoutline.lectureDetails.map((value) => false),
        numberUser : findoutline.numberUser
      });
      findUser.enroll.push(new_enroll);
      await findUser.save();
      const newtoken = this.jwtService.sign({
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        role: findUser.role,
        gender: findUser.gender,
        occupation: findUser.occupation,
        enroll: findUser.enroll,
      });
      return {
        message: "Enrollment successful",
        statusCode: 200,
        newtoken: newtoken,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getmycourse(id: string) {
    try {
      const findUser = await this.UserModel.findById(id);
      return findUser.enroll;
    } catch (error) {
      console.log(error);
    }
  }

  async IfPass(idUser: string, index: number, idCourse: string) {
    try {
      const res = await this.UserModel.updateOne(
        { _id: idUser, "enroll._id": idCourse },
        { $set: { [`enroll.$.IsPass.${index}`]: true } }
      );
      if (!res) return new ErrorEvent("Can't Update ");
      const User = await this.UserModel.findById(idUser);
      if (!User) return new NotFoundException("Not found User");
      const newToken = this.jwtService.sign({
        id: User._id,
        name: User.name,
        email: User.email,
        role: User.role,
        gender: User.gender,
        occupation: User.occupation,
        enroll: User.enroll,
      });
      return {
        message: "Update successful",
        statusCode: 200,
        newToken: newToken,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async IfExamPass(idUser: string, idCourse: string) {
    try {
      const res = await this.UserModel.updateOne(
        { _id: idUser, "enroll._id": idCourse },
        { $set: { [`enroll.$.Examination`]: true } }
      );
      if (!res) return new ErrorEvent("Can't Update ");
      const User = await this.UserModel.findById(idUser);
      if (!User) return new NotFoundException("Not found User");
      const newToken = this.jwtService.sign({
        id: User._id,
        name: User.name,
        email: User.email,
        role: User.role,
        gender: User.gender,
        occupation: User.occupation,
        enroll: User.enroll,
      });
      return {
        message: "Update successful",
        statusCode: 200,
        newToken: newToken,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getAuthors(getAuthors: string) {
    try {
      const findUser = await this.OutlineModel.find({ author: getAuthors });
      if (!findUser) return new NotFoundException("Not found User");
      return findUser;
    } catch (err) {
      console.log(err);
    }
  }
}
