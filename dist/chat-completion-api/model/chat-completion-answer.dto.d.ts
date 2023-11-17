export declare class GetChatCompletionAnswerInputDTO {
    message: string;
}
export declare class GetChatCompletionAnswerOutputDTO {
    aiMessage: string;
    static getInstance(aiMessage: string): GetChatCompletionAnswerOutputDTO;
}
