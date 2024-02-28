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
exports.ExamSchema = exports.Examination = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Examination = class Examination {
};
exports.Examination = Examination;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Examination.prototype, "question_text", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Examination.prototype, "answer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Examination.prototype, "num", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Examination.prototype, "options", void 0);
exports.Examination = Examination = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Examination);
exports.ExamSchema = mongoose_1.SchemaFactory.createForClass(Examination);
//# sourceMappingURL=exam.schema.js.map