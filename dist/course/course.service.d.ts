import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { enroll } from 'src/auth/schemas/enroll.schema';
import { Outline } from 'src/outline/schemas/outline.schema';
export declare class CourseService {
    private UserModel;
    private EnrollModel;
    private OutlineModel;
    constructor(UserModel: Model<User>, EnrollModel: Model<enroll>, OutlineModel: Model<Outline>);
    enroll(id: string, params: string): Promise<NotFoundException | {
        message: string;
        statusCode: number;
    }>;
    getmycourse(id: string): Promise<void>;
}
