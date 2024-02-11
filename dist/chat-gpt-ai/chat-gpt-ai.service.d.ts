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
import { Model } from "mongoose";
import { CreateCompletionRequest } from "openai";
import { GetAiModelAnswer } from "./model/get-ai-model-answer";
import { ChatGptResponseDocument } from "./chat-gpt-ai.model";
export declare class ChatGptAiService {
    private ChatGptResponseModel;
    private readonly openAiApi;
    private readonly logger;
    constructor(ChatGptResponseModel: Model<ChatGptResponseDocument>);
    extractDescriptionAndRequirements(input: string): Promise<{
        description: string;
        requirements: string;
    }>;
    levelPrompt(input: GetAiModelAnswer): CreateCompletionRequest;
    getModelAnswer(input: GetAiModelAnswer): Promise<(import("mongoose").Document<unknown, {}, ChatGptResponseDocument> & ChatGptResponseDocument & Required<{
        _id: string;
    }>) | import("openai").CreateCompletionResponse>;
    parseLectureDetails(answerText: string): {
        lectureNumber: string;
        lectureDescription: string;
        lectureTitle: string;
        lectureWebsite1: string;
        lectureWebsite2: string;
    }[];
    saveGptResponse(question: any, answer: any, modelId: any, description: any, level: any, category: any, requirement: any, lectureDetails: any): Promise<import("mongoose").Document<unknown, {}, ChatGptResponseDocument> & ChatGptResponseDocument & Required<{
        _id: string;
    }>>;
    listModels(): Promise<import("openai").ListModelsResponse>;
    get_Course(id: string): Promise<(import("mongoose").Document<unknown, {}, ChatGptResponseDocument> & ChatGptResponseDocument & Required<{
        _id: string;
    }>) | {
        msg: string;
    }>;
    deleteLearningPath(courseId: string, lectureId: string): Promise<void>;
    split_lecture(answerText: any): {
        lectureTitle: any;
        lectureWebsite: any;
    };
    regenLearningPath(input: GetAiModelAnswer): Promise<{
        lectureTitle: any;
        lectureWebsite: any;
    }>;
}
