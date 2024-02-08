import * as mongoose from 'mongoose';
export declare const QuizResponseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    questions: {
        options: {
            ans?: string;
            isCorrect?: boolean;
        }[];
        question?: string;
        num?: number;
    }[];
    course_id?: string;
    lecture_id?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    questions: {
        options: {
            ans?: string;
            isCorrect?: boolean;
        }[];
        question?: string;
        num?: number;
    }[];
    course_id?: string;
    lecture_id?: string;
}>> & mongoose.FlatRecord<{
    questions: {
        options: {
            ans?: string;
            isCorrect?: boolean;
        }[];
        question?: string;
        num?: number;
    }[];
    course_id?: string;
    lecture_id?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface QuizResponseDocument extends mongoose.Document {
    _id: string;
    course_id: string;
    lecture_id: string;
    num: string;
    questions: Array<{
        options: Array<{
            ans: string;
            isCorrect: boolean;
        }>;
    }>;
    lectureWebsite1: string;
    lectureWebsite2: string;
}
