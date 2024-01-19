import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(loginDto: LoginDto, req: Request, res: Response): Promise<void>;
    Edit(edit: SignUpDto, id: string): Promise<{
        message: string;
        statusCode: number;
        newtoken: string;
    }>;
}
