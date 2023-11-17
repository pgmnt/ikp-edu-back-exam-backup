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
import { ChatGptAiService } from './chat-gpt-ai.service';
import { GetAiModelAnswer } from './model/get-ai-model-answer';
export declare class ChatGptAiController {
    private readonly service;
    constructor(service: ChatGptAiService);
    getModelAnswer(data: GetAiModelAnswer): Promise<(import("mongoose").Document<unknown, {}, import("./chat-gpt-ai.model").ChatGptResponseDocument> & import("./chat-gpt-ai.model").ChatGptResponseDocument & Required<{
        _id: string;
    }>) | import("openai").CreateCompletionResponse>;
    listModels(): Promise<import("openai").ListModelsResponse>;
    Get_Course(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./chat-gpt-ai.model").ChatGptResponseDocument> & import("./chat-gpt-ai.model").ChatGptResponseDocument & Required<{
        _id: string;
    }>) | {
        msg: string;
    }>;
}
