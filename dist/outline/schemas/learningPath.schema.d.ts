import mongoose from 'mongoose';
import { Quizmodel } from './quiz.schemas';
export declare class LearningPath {
    lectureNumber: string;
    lectureTitle: string;
    lectureWebsite: string[];
    lectureDescription: string;
    quiz: Quizmodel[];
}
export declare const LearningPathSchema: mongoose.Schema<LearningPath, mongoose.Model<LearningPath, any, any, any, mongoose.Document<unknown, any, LearningPath> & LearningPath & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, LearningPath, mongoose.Document<unknown, {}, mongoose.FlatRecord<LearningPath>> & mongoose.FlatRecord<LearningPath> & {
    _id: mongoose.Types.ObjectId;
}>;
