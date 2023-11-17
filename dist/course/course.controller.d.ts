import { CourseService } from './course.service';
import { Course } from './schemas/course.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
export declare class CourseController {
    private courseService;
    constructor(courseService: CourseService);
    getAllCourses(query: ExpressQuery): Promise<Course[]>;
    SaveCourse(dataCourse: any): Promise<void>;
}
