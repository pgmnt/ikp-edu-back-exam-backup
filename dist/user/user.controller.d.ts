import { UserService } from './user.service';
export declare class UserController {
    private UserService;
    constructor(UserService: UserService);
    enroll(user: string, course: string): Promise<import("@nestjs/common").NotFoundException | {
        message: string;
        statusCode: number;
        newtoken: string;
    }>;
    getmycourse(id: string): Promise<void>;
}
