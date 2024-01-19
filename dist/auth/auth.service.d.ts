import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signUp(signUpDto: SignUpDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(loginDto: LoginDto, req: Request, res: Response): Promise<void>;
    Edit(edit: any, id: string): Promise<{
        message: string;
        statusCode: number;
        newtoken: string;
    }>;
}
