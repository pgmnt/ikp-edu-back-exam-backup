import { Body, Controller, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto , @Res() res : Response){
    return this.authService.signUp(signUpDto ,res );
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto , @Req() req : Request , @Res() res : Response){
    return this.authService.login(loginDto , req , res);
  }

  @Put('/edit/:id')
  Edit(@Body() edit : SignUpDto , @Param() id : string){
      return this.authService.Edit(edit , id)
  }

  
}
