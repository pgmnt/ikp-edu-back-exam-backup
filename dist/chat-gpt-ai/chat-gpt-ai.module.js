"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGptAiModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const chat_gpt_ai_controller_1 = require("./chat-gpt-ai.controller");
const chat_gpt_ai_service_1 = require("./chat-gpt-ai.service");
const chat_gpt_ai_schemas_1 = require("./schemas/chat-gpt-ai-schemas");
let ChatGptAiModule = class ChatGptAiModule {
};
exports.ChatGptAiModule = ChatGptAiModule;
exports.ChatGptAiModule = ChatGptAiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'ChatGptResponse', schema: chat_gpt_ai_schemas_1.ChatSchema }]),
        ],
        controllers: [chat_gpt_ai_controller_1.ChatGptAiController],
        providers: [chat_gpt_ai_service_1.ChatGptAiService],
    })
], ChatGptAiModule);
//# sourceMappingURL=chat-gpt-ai.module.js.map