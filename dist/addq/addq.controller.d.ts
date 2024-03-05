import { AddqService } from './addq.service';
import { GenQuiz } from './dto/gen-quiz-dto';
export declare class AddqController {
    private appqService;
    constructor(appqService: AddqService);
    getDataQuiz(): void;
    getScrapedContent(input: GenQuiz): Promise<{
        result: {
            result: any;
            statusCode: number;
        };
    }>;
}
