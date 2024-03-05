import mongoose, { Model } from "mongoose";
import { QuizResponseDocument } from "./addq.model";
import { ChatGptResponseDocument } from "../chat-gpt-ai/chat-gpt-ai.model";
import { GenQuiz } from "./dto/gen-quiz-dto";
export declare class AddqService {
    private readonly QuizResponseModel;
    private readonly ChatGptResponseModel;
    getDataQuiz(): void;
    private readonly openAiApi;
    private readonly logger;
    constructor(QuizResponseModel: Model<QuizResponseDocument>, ChatGptResponseModel: Model<ChatGptResponseDocument>);
    getModelAnswer(input: GenQuiz): Promise<{
        result: any;
        statusCode: number;
    }>;
    delete_Identification_number(): void;
    getScrapedContent(htmlContent: string): Promise<string>;
    parseQuizDetails(answerText: string): {
        num: string;
        question: string;
        options: Array<{
            ans: string;
            isCorrect: boolean;
        }>;
    }[];
    saveQuizResponse(lecture_id: string, num: string, quizDetails: any): Promise<mongoose.Document<unknown, {}, QuizResponseDocument> & QuizResponseDocument & Required<{
        _id: string;
    }>>;
}
