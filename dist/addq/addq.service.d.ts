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
    getModelAnswer(input: GetAiModelQuiz, num: string): Promise<import("openai").CreateCompletionResponse | (mongoose.Document<unknown, {}, QuizResponseDocument> & QuizResponseDocument & Required<{
        _id: string;
    }>)>;
    getScrapedContent(htmlContent: string): Promise<string>;
    answerText: `[
  {
    "num": "1",
    "question": "What is the capital of France?",
    "options": [
      {"ans": "Berlin", "isCorrect": "False"},
      {"ans": "Paris", "isCorrect": "True"},
      {"ans": "Madrid", "isCorrect": "False"}
    ]
  },
  {
    "num": "2",
    "question": "Which planet is known as the Red Planet?",
    "options": [
      {"ans": "Earth", "isCorrect": "False"},
      {"ans": "Mars", "isCorrect": "True"},
      {"ans": "Venus", "isCorrect": "False"}
    ]
  },
  {
    "num": “3”,
    "question": "Which planet is known as the Red Planet?",
    "options": [
      {"ans": "Earth", "isCorrect": "False"},
      {"ans": "Mars", "isCorrect": "True"},
      {"ans": "Venus", "isCorrect": "False"}
    ]
  },
  {
    "num": “4”,
    "question": "Which planet is known as the Red Planet?",
    "options": [
      {"ans": "Earth", "isCorrect": "False"},
      {"ans": "Mars", "isCorrect": "True"},
      {"ans": "Venus", "isCorrect": "False"}
    ]
  },
  {
    "num": “5”,
    "question": "Which planet is known as the Red Planet?",
    "options": [
      {"ans": "Earth", "isCorrect": "False"},
      {"ans": "Mars", "isCorrect": "True"},
      {"ans": "Venus", "isCorrect": "False"}
    ]
  },
]`;
    parseQuizDetails(answerText: string): {
        num: string;
        question: string;
        options: {
            ans: string;
            isCorrect: boolean;
        }[];
    }[];
    saveQuizResponse(lecture_id: string, quizDetails: any): Promise<mongoose.Document<unknown, {}, QuizResponseDocument> & QuizResponseDocument & Required<{
        _id: string;
    }>>;
}
