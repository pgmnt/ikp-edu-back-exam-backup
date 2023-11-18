import { Level, Category } from '../schemas/chat-gpt-ai-schemas';
export declare class GetAiModelAnswer {
    question: string;
    modelId: string;
    description: string;
    readonly level: Level;
    readonly category: Category;
    temperature: number;
    maxTokens: number;
    private cleanModelId;
    getModelId(): string;
    getMaxTokens(): number;
    getTemperature(): number;
}
