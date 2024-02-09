/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
    getAuthors(name: string): Promise<import("@nestjs/common").NotFoundException | (import("mongoose").Document<unknown, {}, import("../outline/schemas/outline.schema").Outline> & import("../outline/schemas/outline.schema").Outline & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getClassOwn(name: string, role: string): Promise<import("@nestjs/common").NotFoundException | {
        CourseCreated: number;
        CoursePublished: number;
        CourseNotPublished: number;
    }>;
}
