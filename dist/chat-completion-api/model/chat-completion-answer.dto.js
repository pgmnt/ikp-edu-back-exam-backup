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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetChatCompletionAnswerOutputDTO = exports.GetChatCompletionAnswerInputDTO = void 0;
const class_validator_1 = require("class-validator");
class GetChatCompletionAnswerInputDTO {
}
exports.GetChatCompletionAnswerInputDTO = GetChatCompletionAnswerInputDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetChatCompletionAnswerInputDTO.prototype, "message", void 0);
class GetChatCompletionAnswerOutputDTO {
    static getInstance(aiMessage) {
        const result = new GetChatCompletionAnswerOutputDTO();
        result.aiMessage = aiMessage;
        return result;
    }
}
exports.GetChatCompletionAnswerOutputDTO = GetChatCompletionAnswerOutputDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetChatCompletionAnswerOutputDTO.prototype, "aiMessage", void 0);
//# sourceMappingURL=chat-completion-answer.dto.js.map