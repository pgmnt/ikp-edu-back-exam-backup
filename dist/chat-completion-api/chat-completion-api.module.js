"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatCompletionApiModule = void 0;
const common_1 = require("@nestjs/common");
const chat_completion_api_service_1 = require("./chat-completion-api.service");
const chat_completion_api_controller_1 = require("./chat-completion-api.controller");
let ChatCompletionApiModule = class ChatCompletionApiModule {
};
exports.ChatCompletionApiModule = ChatCompletionApiModule;
exports.ChatCompletionApiModule = ChatCompletionApiModule = __decorate([
    (0, common_1.Module)({
        providers: [chat_completion_api_service_1.ChatCompletionApiService],
        controllers: [chat_completion_api_controller_1.ChatCompletionApiController]
    })
], ChatCompletionApiModule);
//# sourceMappingURL=chat-completion-api.module.js.map