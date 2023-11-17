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
exports.GetAiModelAnswer = void 0;
const class_validator_1 = require("class-validator");
const DEFAULT_MODEL_ID = "text-davinci-003";
const DEFAULT_TEMPERATURE = 0.9;
const DEFAULT_MAX_TOKENS = 2048;
class GetAiModelAnswer {
    cleanModelId(modelId) {
        if (modelId.includes(":")) {
            return modelId.replace(":", "-");
        }
        return modelId;
    }
    getModelId() {
        return this.cleanModelId(this.modelId ? this.modelId : DEFAULT_MODEL_ID);
    }
    getMaxTokens() {
        return this.maxTokens ? this.maxTokens : DEFAULT_MAX_TOKENS;
    }
    getTemperature() {
        return this.temperature ? this.temperature : DEFAULT_TEMPERATURE;
    }
}
exports.GetAiModelAnswer = GetAiModelAnswer;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetAiModelAnswer.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAiModelAnswer.prototype, "modelId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAiModelAnswer.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAiModelAnswer.prototype, "temperature", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAiModelAnswer.prototype, "maxTokens", void 0);
//# sourceMappingURL=get-ai-model-answer.js.map