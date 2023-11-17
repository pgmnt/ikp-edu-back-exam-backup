import * as mongoose from 'mongoose';
import { Course } from './schemas/course.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
export declare class CourseService {
    private courseModel;
    constructor(courseModel: mongoose.Model<Course>);
    findAll(query: Query): Promise<Course[]>;
    create(course: Course, user: User): Promise<Course>;
    findById(id: string): Promise<Course>;
    updateById(id: string, course: Course): Promise<Course>;
    deleteById(id: string): Promise<Course>;
    addcoe(dataCourse: any): Promise<void>;
}
