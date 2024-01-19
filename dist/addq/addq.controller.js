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
exports.AddqController = void 0;
const common_1 = require("@nestjs/common");
const addq_service_1 = require("./addq.service");
const get_quiz_model_answer_1 = require("./model/get-quiz-model-answer");
let AddqController = class AddqController {
    constructor(appqService) {
        this.appqService = appqService;
    }
    async getModelAnswer(data) {
        console.log('getModelAnswer >>', data);
        return this.appqService.getModelAnswer(data, '5');
    }
    regenQuiz(data) {
        console.log('Title Regen >>', data);
        return this.appqService.getModelAnswer(data, '1');
    }
    getDataQuiz() {
        return this.appqService.getDataQuiz();
    }
    async getScrapedContent(input) {
        const result = await this.appqService.getScrapedContent(input.content);
        return { result };
    }
};
exports.AddqController = AddqController;
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_quiz_model_answer_1.GetAiModelQuiz]),
    __metadata("design:returntype", Promise)
], AddqController.prototype, "getModelAnswer", null);
__decorate([
    (0, common_1.Post)('/regen'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_quiz_model_answer_1.GetAiModelQuiz]),
    __metadata("design:returntype", void 0)
], AddqController.prototype, "regenQuiz", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AddqController.prototype, "getDataQuiz", null);
__decorate([
    (0, common_1.Post)('/scraped'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddqController.prototype, "getScrapedContent", null);
exports.AddqController = AddqController = __decorate([
    (0, common_1.Controller)('addq'),
    __metadata("design:paramtypes", [addq_service_1.AddqService])
], AddqController);
//# sourceMappingURL=addq.controller.js.map