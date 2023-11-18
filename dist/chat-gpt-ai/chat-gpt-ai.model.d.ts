import * as mongoose from 'mongoose';
export declare const ChatGptResponseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    lectureDetails: {
        lectureNumber?: string;
        lectureTitle?: string;
        lectureWebsite?: string;
    }[];
    description?: string;
    level?: string;
    question?: string;
    answer?: string;
    modelId?: string;
    requirement?: string;
    Category?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    lectureDetails: {
        lectureNumber?: string;
        lectureTitle?: string;
        lectureWebsite?: string;
    }[];
    description?: string;
    level?: string;
    question?: string;
    answer?: string;
    modelId?: string;
    requirement?: string;
    Category?: string;
}>> & mongoose.FlatRecord<{
    lectureDetails: {
        lectureNumber?: string;
        lectureTitle?: string;
        lectureWebsite?: string;
    }[];
    description?: string;
    level?: string;
    question?: string;
    answer?: string;
    modelId?: string;
    requirement?: string;
    Category?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface ChatGptResponseDocument extends mongoose.Document {
    _id: string;
    question: string;
    answer: string;
    modelId: string;
    description: String;
    level: String;
    Category: String;
    requirement: String;
    lectureDetails: Array<{
        lectureNumber: string;
        lectureTitle: string;
        lectureWebsite: string;
    }>;
}
