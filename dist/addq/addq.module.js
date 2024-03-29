"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddqModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const addq_controller_1 = require("./addq.controller");
const addq_service_1 = require("./addq.service");
const addq_schemas_1 = require("./schemas/addq.schemas");
const chat_gpt_ai_model_1 = require("../chat-gpt-ai/chat-gpt-ai.model");
let AddqModule = class AddqModule {
};
exports.AddqModule = AddqModule;
exports.AddqModule = AddqModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'QuizResponse', schema: addq_schemas_1.QuizResponseSchema },
                { name: 'ChatGptResponse', schema: chat_gpt_ai_model_1.ChatGptResponseSchema },
            ]),
        ],
        controllers: [addq_controller_1.AddqController],
        providers: [addq_service_1.AddqService],
    })
], AddqModule);
//# sourceMappingURL=addq.module.js.map