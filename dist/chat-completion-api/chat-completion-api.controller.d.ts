import { ChatCompletionApiService } from './chat-completion-api.service';
import { GetChatCompletionAnswerInputDTO } from './model/chat-completion-answer.dto';
export declare class ChatCompletionApiController {
    private readonly service;
    constructor(service: ChatCompletionApiService);
    getChatCompletionMessage(data: GetChatCompletionAnswerInputDTO): Promise<import("./model/chat-completion-answer.dto").GetChatCompletionAnswerOutputDTO>;
}
