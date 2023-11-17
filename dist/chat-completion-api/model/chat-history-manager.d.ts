import { BaseMessage } from 'langchain/schema';
export declare class ChatHistoryManager {
    readonly chatHistory: BaseMessage[];
    constructor(systemMessage?: string);
    private addSystemMessage;
    addAiMessage(message: string): void;
    addHumanMessage(message: string): void;
}
