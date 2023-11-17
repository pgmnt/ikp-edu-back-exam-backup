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
exports.QuizResponseSchema = exports.QuizResponse = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let QuizResponse = class QuizResponse {
};
exports.QuizResponse = QuizResponse;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], QuizResponse.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], QuizResponse.prototype, "answer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], QuizResponse.prototype, "modelId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], QuizResponse.prototype, "lecture_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], QuizResponse.prototype, "questions", void 0);
exports.QuizResponse = QuizResponse = __decorate([
    (0, mongoose_1.Schema)()
], QuizResponse);
exports.QuizResponseSchema = mongoose_1.SchemaFactory.createForClass(QuizResponse);
//# sourceMappingURL=addq.schemas.js.map