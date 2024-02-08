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
export declare class QuizResponse {
    question: string;
    answer: string;
    modelId: string;
    course_id: string;
    lecture_id: string;
    num: number;
    questions: Array<{
        question: string;
        options: Array<{
            ans: string;
            isCorrect: boolean;
        }>;
    }>;
}
export declare const QuizResponseSchema: import("mongoose").Schema<QuizResponse, import("mongoose").Model<QuizResponse, any, any, any, import("mongoose").Document<unknown, any, QuizResponse> & QuizResponse & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, QuizResponse, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<QuizResponse>> & import("mongoose").FlatRecord<QuizResponse> & {
    _id: import("mongoose").Types.ObjectId;
}>;
