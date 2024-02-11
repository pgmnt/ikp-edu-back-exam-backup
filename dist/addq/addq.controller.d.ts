import { AddqService } from './addq.service';
import { GetAiModelQuiz } from './model/get-quiz-model-answer';
export declare class AddqController {
    private appqService;
    constructor(appqService: AddqService);
    getModelAnswer(data: GetAiModelQuiz): Promise<any>;
    regenQuiz(data: GetAiModelQuiz): Promise<any>;
    getDataQuiz(): void;
    getScrapedContent(input: {
        content: string;
    }): Promise<{
        result: string;
    }>;
}
