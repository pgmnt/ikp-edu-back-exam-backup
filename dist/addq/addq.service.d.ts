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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { QuizResponseDocument } from './addq.model';
import { GetAiModelQuiz } from './model/get-quiz-model-answer';
export declare class AddqService {
    private readonly QuizResponseModel;
    getDataQuiz(): void;
    private readonly openAiApi;
    private readonly logger;
    constructor(QuizResponseModel: Model<QuizResponseDocument>);
    saveQuizResponse(lecture_id: string, questions: any[]): Promise<import("mongoose").Document<unknown, {}, QuizResponseDocument> & QuizResponseDocument & Required<{
        _id: string;
    }>>;
    getModelAnswer(input: GetAiModelQuiz): Promise<import("openai").CreateCompletionResponse | (import("mongoose").Document<unknown, {}, QuizResponseDocument> & QuizResponseDocument & Required<{
        _id: string;
    }>)>;
    parseQuizDetails(answerText: string): Promise<{
        num: number;
        question_text: string;
        options: {
            ans: string;
            isCorrect: boolean;
        }[];
    }[]>;
}
