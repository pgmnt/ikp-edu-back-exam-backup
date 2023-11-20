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
exports.ChatGptAiController = void 0;
const common_1 = require("@nestjs/common");
const chat_gpt_ai_service_1 = require("./chat-gpt-ai.service");
const get_ai_model_answer_1 = require("./model/get-ai-model-answer");
let ChatGptAiController = class ChatGptAiController {
    constructor(service) {
        this.service = service;
    }
    async getModelAnswer(data) {
        console.log('getModelAnswer >>', data);
        return this.service.getModelAnswer(data);
    }
    listModels() {
        return this.service.listModels();
    }
    Get_Course(id) {
        return this.service.get_Course(id);
    }
    async deleteLearningPath(courseId, lectureId) {
        try {
            await this.service.deleteLearningPath(courseId, lectureId);
            return { message: 'Learning path or lecture deleted successfully' };
        }
        catch (error) {
            throw new common_1.NotFoundException('Learning path or lecture not found');
        }
    }
    async AddLecture(lectureData) {
        const { _id, lectureDetails } = lectureData;
        return this.service.AddLearningPath(_id, lectureDetails);
    }
};
exports.ChatGptAiController = ChatGptAiController;
__decorate([
    (0, common_1.Post)('/message'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_ai_model_answer_1.GetAiModelAnswer]),
    __metadata("design:returntype", Promise)
], ChatGptAiController.prototype, "getModelAnswer", null);
__decorate([
    (0, common_1.Get)('/model'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatGptAiController.prototype, "listModels", null);
__decorate([
    (0, common_1.Post)('/courseGPT'),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatGptAiController.prototype, "Get_Course", null);
__decorate([
    (0, common_1.Delete)('/learningPath/:courseId/:lectureId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChatGptAiController.prototype, "deleteLearningPath", null);
__decorate([
    (0, common_1.Post)('/add-lecture'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGptAiController.prototype, "AddLecture", null);
exports.ChatGptAiController = ChatGptAiController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [chat_gpt_ai_service_1.ChatGptAiService])
], ChatGptAiController);
//# sourceMappingURL=chat-gpt-ai.controller.js.map