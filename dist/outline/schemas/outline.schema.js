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
exports.OutlineSchema = exports.Outline = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Outline = class Outline {
};
exports.Outline = Outline;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Outline.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Outline.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Outline.prototype, "requirement", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Outline.prototype, "publish", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'LearningPath' }] }),
    __metadata("design:type", Array)
], Outline.prototype, "lectureDetails", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Examination' }] }),
    __metadata("design:type", Array)
], Outline.prototype, "examination", void 0);
exports.Outline = Outline = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Outline);
exports.OutlineSchema = mongoose_1.SchemaFactory.createForClass(Outline);
//# sourceMappingURL=outline.schema.js.map