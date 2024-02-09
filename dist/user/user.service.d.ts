import { NotFoundException } from '@nestjs/common';
import mongoose, { Model, Types } from 'mongoose';
import { enroll } from 'src/auth/schemas/enroll.schema';
import { User } from 'src/auth/schemas/user.schema';
import { Outline } from 'src/outline/schemas/outline.schema';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private UserModel;
    private EnrollModel;
    private OutlineModel;
    private jwtService;
    constructor(UserModel: Model<User>, EnrollModel: Model<enroll>, OutlineModel: Model<Outline>, jwtService: JwtService);
    enroll(user: string, course: string): Promise<NotFoundException | {
        message: string;
        statusCode: number;
        newtoken: string;
    }>;
    getmycourse(id: string): Promise<enroll[]>;
    IfPass(idUser: string, index: number, idCourse: string): Promise<NotFoundException | ErrorEvent | {
        message: string;
        statusCode: number;
        newToken: string;
    }>;
    IfExamPass(idUser: string, idCourse: string): Promise<NotFoundException | ErrorEvent | {
        message: string;
        statusCode: number;
        newToken: string;
    }>;
    getAuthors(getAuthors: string): Promise<NotFoundException | (mongoose.Document<unknown, {}, Outline> & Outline & {
        _id: Types.ObjectId;
    })[]>;
    getClassOwn(name: string, role: string): Promise<NotFoundException | {
        CourseCreated: number;
        CoursePublished: number;
        CourseNotPublished: number;
    }>;
    test(): Promise<void>;
}
