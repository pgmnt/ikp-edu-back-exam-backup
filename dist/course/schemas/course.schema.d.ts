import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
export declare enum Category {
    PROGRAMMING = "Programming",
    GRAPHIC = "Graphic"
}
export declare enum Level {
    LV1 = "Easy",
    LV2 = "Hard"
}
export declare class Course {
    title: string;
    description: string;
    level: Level;
    category: Category;
    user: User;
}
export declare const CourseSchema: mongoose.Schema<Course, mongoose.Model<Course, any, any, any, mongoose.Document<unknown, any, Course> & Course & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Course, mongoose.Document<unknown, {}, mongoose.FlatRecord<Course>> & mongoose.FlatRecord<Course> & {
    _id: mongoose.Types.ObjectId;
}>;
