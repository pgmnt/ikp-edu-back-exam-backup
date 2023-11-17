import { GetChatCompletionAnswerInputDTO, GetChatCompletionAnswerOutputDTO } from './model/chat-completion-answer.dto';
export declare class ChatCompletionApiService {
    private readonly chatHistory;
    private readonly chat;
    constructor();
    getAiModelAnswer(data: GetChatCompletionAnswerInputDTO): Promise<GetChatCompletionAnswerOutputDTO>;
}
