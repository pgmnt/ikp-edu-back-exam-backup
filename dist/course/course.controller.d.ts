import { CourseService } from './course.service';
export declare class CourseController {
    private courseService;
    constructor(courseService: CourseService);
    enroll(id: string, params: string): Promise<import("@nestjs/common").NotFoundException | {
        message: string;
        statusCode: number;
    }>;
    getmycourse(id: string): Promise<void>;
}
