"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatCompletionApiController = void 0;
const common_1 = require("@nestjs/common");
const chat_completion_api_service_1 = require("./chat-completion-api.service");
const chat_completion_answer_dto_1 = require("./model/chat-completion-answer.dto");
let ChatCompletionApiController = class ChatCompletionApiController {
    constructor(service) {
        this.service = service;
    }
    getChatCompletionMessage(data) {
        return this.service.getAiModelAnswer(data);
    }
};
exports.ChatCompletionApiController = ChatCompletionApiController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_completion_answer_dto_1.GetChatCompletionAnswerInputDTO]),
    __metadata("design:returntype", void 0)
], ChatCompletionApiController.prototype, "getChatCompletionMessage", null);
exports.ChatCompletionApiController = ChatCompletionApiController = __decorate([
    (0, common_1.Controller)('chat-completion-api'),
    __metadata("design:paramtypes", [chat_completion_api_service_1.ChatCompletionApiService])
], ChatCompletionApiController);
//# sourceMappingURL=chat-completion-api.controller.js.map