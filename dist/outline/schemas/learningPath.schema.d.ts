import mongoose from 'mongoose';
export declare class LearningPath {
    lectureNumber: string;
    lectureTitle: string;
    lectureWebsite: string;
    quiz: mongoose.Types.ObjectId[];
}
export declare const LearningPathSchema: mongoose.Schema<LearningPath, mongoose.Model<LearningPath, any, any, any, mongoose.Document<unknown, any, LearningPath> & LearningPath & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, LearningPath, mongoose.Document<unknown, {}, mongoose.FlatRecord<LearningPath>> & mongoose.FlatRecord<LearningPath> & {
    _id: mongoose.Types.ObjectId;
}>;
