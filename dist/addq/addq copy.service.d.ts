import mongoose, { Model } from 'mongoose';
import { QuizResponseDocument } from './addq.model';
import { GetAiModelQuiz } from './model/get-quiz-model-answer';
import { ChatGptResponseDocument } from '../chat-gpt-ai/chat-gpt-ai.model';
export declare class AddqService {
    private readonly QuizResponseModel;
    private readonly ChatGptResponseModel;
    getDataQuiz(): void;
    private readonly openAiApi;
    private readonly logger;
    constructor(QuizResponseModel: Model<QuizResponseDocument>, ChatGptResponseModel: Model<ChatGptResponseDocument>);
    saveQuizResponse(lecture_id: string, questions: any[]): Promise<mongoose.Document<unknown, {}, QuizResponseDocument> & QuizResponseDocument & Required<{
        _id: string;
    }>>;
    getModelAnswer(input: GetAiModelQuiz, num: string): Promise<import("openai").CreateCompletionResponse | (mongoose.Document<unknown, {}, QuizResponseDocument> & QuizResponseDocument & Required<{
        _id: string;
    }>)>;
    getScrapedContent(htmlContent: string): Promise<string>;
    parseQuizDetails(answerText1: string): Promise<any[]>;
}
