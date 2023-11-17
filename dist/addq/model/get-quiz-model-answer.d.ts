export declare class GetAiModelQuiz {
    question: string;
    lecture_id: string;
    modelId: string;
    temperature: number;
    maxTokens: number;
    private cleanModelId;
    getModelId(): string;
    getMaxTokens(): number;
    getTemperature(): number;
}
