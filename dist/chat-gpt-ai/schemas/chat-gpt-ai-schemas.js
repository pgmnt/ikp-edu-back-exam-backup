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
exports.ChatSchema = exports.ChatGptAiResponse = exports.Level = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var Category;
(function (Category) {
    Category["PROGRAMMING"] = "ICT literacy";
    Category["GRAPHIC"] = "Graphic";
})(Category || (exports.Category = Category = {}));
var Level;
(function (Level) {
    Level["LV1"] = "Beginner";
    Level["LV2"] = "Intermediate";
    Level["LV3"] = "Advanced";
})(Level || (exports.Level = Level = {}));
let ChatGptAiResponse = class ChatGptAiResponse {
};
exports.ChatGptAiResponse = ChatGptAiResponse;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ChatGptAiResponse.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ChatGptAiResponse.prototype, "answer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ChatGptAiResponse.prototype, "modelId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ChatGptAiResponse.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ChatGptAiResponse.prototype, "level", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ChatGptAiResponse.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ChatGptAiResponse.prototype, "requirement", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            lectureNumber: String,
            lectureTitle: String,
            lectureWebsite: (Array),
            lectureDescription: String
        }]),
    __metadata("design:type", Array)
], ChatGptAiResponse.prototype, "lectureDetails", void 0);
exports.ChatGptAiResponse = ChatGptAiResponse = __decorate([
    (0, mongoose_1.Schema)()
], ChatGptAiResponse);
exports.ChatSchema = mongoose_1.SchemaFactory.createForClass(ChatGptAiResponse);
//# sourceMappingURL=chat-gpt-ai-schemas.js.map