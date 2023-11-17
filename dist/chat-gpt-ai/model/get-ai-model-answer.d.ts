export declare class GetAiModelAnswer {
    question: string;
    modelId: string;
    description: string;
    temperature: number;
    maxTokens: number;
    private cleanModelId;
    getModelId(): string;
    getMaxTokens(): number;
    getTemperature(): number;
}
