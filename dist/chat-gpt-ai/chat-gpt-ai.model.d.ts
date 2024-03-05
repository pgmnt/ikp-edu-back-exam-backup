import * as mongoose from 'mongoose';
export declare const ChatGptResponseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    lectureDetails: {
        lectureWebsite: any[];
        lectureNumber?: string;
        lectureTitle?: string;
        lectureDescription?: string;
    }[];
    question?: string;
    answer?: string;
    modelId?: string;
    description?: string;
    level?: string;
    Category?: string;
    requirement?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    lectureDetails: {
        lectureWebsite: any[];
        lectureNumber?: string;
        lectureTitle?: string;
        lectureDescription?: string;
    }[];
    question?: string;
    answer?: string;
    modelId?: string;
    description?: string;
    level?: string;
    Category?: string;
    requirement?: string;
}>> & mongoose.FlatRecord<{
    lectureDetails: {
        lectureWebsite: any[];
        lectureNumber?: string;
        lectureTitle?: string;
        lectureDescription?: string;
    }[];
    question?: string;
    answer?: string;
    modelId?: string;
    description?: string;
    level?: string;
    Category?: string;
    requirement?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface ChatGptResponseDocument extends mongoose.Document {
    lectureWebsite: string[];
    lectureDescription: any;
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
        lectureDescription: string;
        lectureTitle: string;
        lectureWebsite: string[];
    }>;
}
