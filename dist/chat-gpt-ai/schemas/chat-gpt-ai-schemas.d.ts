/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
export declare enum Category {
    PROGRAMMING = "IT",
    GRAPHIC = "Graphic"
}
export declare enum Level {
    LV1 = "Beginner",
    LV2 = "Intermediate",
    LV3 = "Advanced"
}
export declare class ChatGptAiResponse {
    question: string;
    answer: string;
    modelId: string;
    description: String;
    level: Level;
    category: Category;
    requirement: String;
    lectureDetails: {
        lectureNumber: String;
        lectureWebsite1: String;
        lectureWebsite2: String;
        lectureDescription: String;
    }[];
}
export declare const ChatSchema: import("mongoose").Schema<ChatGptAiResponse, import("mongoose").Model<ChatGptAiResponse, any, any, any, import("mongoose").Document<unknown, any, ChatGptAiResponse> & ChatGptAiResponse & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChatGptAiResponse, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ChatGptAiResponse>> & import("mongoose").FlatRecord<ChatGptAiResponse> & {
    _id: import("mongoose").Types.ObjectId;
}>;
