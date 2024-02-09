import mongoose, { Model, Types } from 'mongoose';
import { Outline } from './schemas/outline.schema';
import { LearningPath } from './schemas/learningPath.schema';
import { Examination } from 'src/exam/schemas/exam.schema';
import { Quizmodel } from './schemas/quiz.schemas';
export declare class OutlineService {
    private OutlineModel;
    private LearningPathModel;
    private ExamModel;
    private QuizModel;
    constructor(OutlineModel: Model<Outline>, LearningPathModel: Model<LearningPath>, ExamModel: Model<Examination>, QuizModel: Model<Quizmodel>);
    deleteCourse(outline: any): Promise<{
        msg: string;
    }>;
    SaveCourse(dataCourse: any, name: string): Promise<{
        msg: string;
        data: Types.ObjectId;
    }>;
    getid(id: string): Promise<ErrorConstructor | (mongoose.Document<unknown, {}, Outline> & Outline & {
        _id: Types.ObjectId;
    })>;
    Getall_outline(): Promise<(mongoose.Document<unknown, {}, Outline> & Outline & {
        _id: Types.ObjectId;
    })[]>;
    EditOutline(id: string): Promise<(mongoose.Document<unknown, {}, Outline> & Outline & {
        _id: Types.ObjectId;
    }) | {
        message: string;
    }>;
    EditNewOutline(dataCourse: any): Promise<void>;
    Publish(id: string): Promise<{
        msg: string;
    }>;
}
