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
import { GetAiModelAnswer } from './model/get-ai-model-answer';
import { ChatGptResponseDocument } from './chat-gpt-ai.model';
export declare class ChatGptAiService {
    private readonly ChatGptResponseModel;
    private readonly openAiApi;
    private readonly logger;
    constructor(ChatGptResponseModel: Model<ChatGptResponseDocument>);
    extractDescriptionAndRequirements(input: string): Promise<{
        description: string;
        requirements: string;
    }>;
    'prompt: "generate course outlines and guide users step by step, Do list the number of lecture, name of lecture and each lecture provide me exactly 2 website links in each lecture that I can learn - focusing on " + input.question + " within the context of input.category and sub1. Ensure that the lecture provides a challenging and insightful experience for learner - Difficulty: Beginner (Keyword to generate lectures: Understanding basic syntax and program structure,Learning variables, data types, and basic operations,Implementing simple algorithms and conditional statements,Basic input/output and user interaction,Introduction to debugging and error handling), In this format Course Outline - Name of the course, Summary: summary of the course no new line, Requirement: requirement of the course no new line, Lecture number of lecture: name of lecture, description: description new line, website1: website1 new line, website2: website2 new line link to be in the form /Lecture (\d+): (.), Description: (.), Website: (https://\S+)/ if no website found in lecture or N/A cut that lecture out", model: input.getModelId(),': any;
    getModelAnswer(input: GetAiModelAnswer): Promise<(import("mongoose").Document<unknown, {}, ChatGptResponseDocument> & ChatGptResponseDocument & Required<{
        _id: string;
    }>) | import("openai").CreateCompletionResponse>;
    parseLectureDetails(answerText: string): {
        lectureNumber: string;
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
    AddLearningPath(courseId: string, lectureDetails: any[]): Promise<{
        msg: string;
    }>;
    split_lecture(answerText: any): {
        lectureTitle: any;
        lectureWebsite: any;
    };
    regenLearningPath(input: GetAiModelAnswer): Promise<{
        lectureTitle: any;
        lectureWebsite: any;
    }>;
}
