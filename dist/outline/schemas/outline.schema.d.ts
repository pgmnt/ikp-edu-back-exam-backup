import mongoose from 'mongoose';
import { LearningPath } from './learningPath.schema';
import { Examination } from 'src/exam/schemas/exam.schema';
export declare class Outline {
    question: string;
    description: string;
    requirement: string;
    author: string;
    publish: boolean;
    lectureDetails: LearningPath[];
    examination: Examination[];
    numberUser: number;
    WhoEnroll: mongoose.Schema.Types.ObjectId[];
}
export declare const OutlineSchema: mongoose.Schema<Outline, mongoose.Model<Outline, any, any, any, mongoose.Document<unknown, any, Outline> & Outline & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Outline, mongoose.Document<unknown, {}, mongoose.FlatRecord<Outline>> & mongoose.FlatRecord<Outline> & {
    _id: mongoose.Types.ObjectId;
}>;
