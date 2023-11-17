"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlineModule = void 0;
const common_1 = require("@nestjs/common");
const outline_controller_1 = require("./outline.controller");
const outline_service_1 = require("./outline.service");
const mongoose_1 = require("@nestjs/mongoose");
const outline_schema_1 = require("./schemas/outline.schema");
const learningPath_schema_1 = require("./schemas/learningPath.schema");
const exam_schema_1 = require("../exam/schemas/exam.schema");
const quiz_schemas_1 = require("./schemas/quiz.schemas");
let OutlineModule = class OutlineModule {
};
exports.OutlineModule = OutlineModule;
exports.OutlineModule = OutlineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Outline', schema: outline_schema_1.OutlineSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'LearningPath', schema: learningPath_schema_1.LearningPathSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Examination', schema: exam_schema_1.ExamSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Quizmodel', schema: quiz_schemas_1.QuizmodelSchema }]),
        ],
        controllers: [outline_controller_1.OutlineController],
        providers: [outline_service_1.OutlineService]
    })
], OutlineModule);
//# sourceMappingURL=outline.module.js.map