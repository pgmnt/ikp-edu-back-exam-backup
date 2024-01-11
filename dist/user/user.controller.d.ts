import { UserService } from './user.service';
export declare class UserController {
    private UserService;
    constructor(UserService: UserService);
    enroll(user: string, course: string): Promise<import("@nestjs/common").NotFoundException | {
        message: string;
        statusCode: number;
        newtoken: string;
    }>;
    getmycourse(id: string): Promise<import("../auth/schemas/enroll.schema").enroll[]>;
    IfPass(idUser: string, index: number, idCourse: string): Promise<import("@nestjs/common").NotFoundException | ErrorEvent | {
        message: string;
        statusCode: number;
        newToken: string;
    }>;
    IfExamPass(idUser: string, idCourse: string): Promise<import("@nestjs/common").NotFoundException | ErrorEvent | {
        message: string;
        statusCode: number;
        newToken: string;
    }>;
}
