import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto , res : Response) {
    const { name, email, password , birth , gender , occupation} = signUpDto;
    const ishaveuser = await this.userModel.findOne({ email : email})
    if(ishaveuser){
      throw new UnauthorizedException('This email is already in use.');
    }

    const birthDate = new Date(birth);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      birthDate,
      gender,
      occupation
    });

    return res.status(200).send({ message : 'complete' , statusCode : 200})
  }

  async login(loginDto: LoginDto , req : Request , res : Response){
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    console.log(user)
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ 
      id: user._id , 
      name : user.name ,
      email : user.email,
      role : user.role,
      birth : user.birth,
      gender : user.gender,
      occupation : user.occupation,
      enroll : user.enroll
    });

    if(!token){
        throw new ForbiddenException()
    }
    res.status(200).send({token : token  , statusCode : 200})
  }

  async Edit(edit : any , id : string){
      try{
        const {email , birth } = edit
        const isHaveEmail = await this.userModel.findOne({email : email})
        
        if(isHaveEmail){
          throw new UnauthorizedException('This email is already in use.');
        }
      const userIdObject = new mongoose.Types.ObjectId(id);
      const birthDate = new Date(birth);
      const res = await this.userModel.findOneAndUpdate({ _id: userIdObject }, {
          name : edit.name,
          email : edit.email,
          password : edit.password,
          birth : birthDate,
          gender : edit.gender,
          occupation : edit.occupation
      });
      const token = this.jwtService.sign({ 
        id: res._id , 
        name : res.name ,
        email : res.email,
        role : res.role ,
        birth : res.birth,
        gender : res.gender,
        occupation : res.occupation
      });
      return { message : 'complete'  , statusCode : 200 , newtoken : token}
      }catch(err){
        console.log(err)
      

      }
  }
}
