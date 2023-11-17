import * as mongoose from 'mongoose';
export declare const QuizResponseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    questions: {
        options: {
            ans?: string;
            isCorrect?: boolean;
        }[];
        num?: number;
        question_text?: string;
    }[];
    lecture_id?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    questions: {
        options: {
            ans?: string;
            isCorrect?: boolean;
        }[];
        num?: number;
        question_text?: string;
    }[];
    lecture_id?: string;
}>> & mongoose.FlatRecord<{
    questions: {
        options: {
            ans?: string;
            isCorrect?: boolean;
        }[];
        num?: number;
        question_text?: string;
    }[];
    lecture_id?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface QuizResponseDocument extends mongoose.Document {
    _id: string;
    lecture_id: string;
    questions: Array<{
        num: number;
        question_text: string;
        options: Array<{
            ans: string;
            isCorrect: boolean;
        }>;
    }>;
}
