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
exports.OutlineService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OutlineService = class OutlineService {
    constructor(OutlineModel, LearningPathModel, ExamModel, QuizModel) {
        this.OutlineModel = OutlineModel;
        this.LearningPathModel = LearningPathModel;
        this.ExamModel = ExamModel;
        this.QuizModel = QuizModel;
    }
    async SaveCourse(dataCourse) {
        try {
            const quizList = [];
            let exams = [];
            let outline = {};
            dataCourse.forEach((data) => {
                const keys = Object.keys(data)[0];
                if (keys.includes('quiz')) {
                    quizList.push(JSON.parse(data[keys]));
                }
                else if (keys === 'exam') {
                    exams = JSON.parse(data.exam);
                }
                else {
                    outline = JSON.parse(data.outline);
                }
            });
            outline['examination'] = exams;
            quizList.forEach((data, index) => {
                outline.lectureDetails[index][`quiz`] = data;
            });
            console.log(quizList, '>>>>>>');
            try {
                const examDict = { examination: exams };
                const exam_child = await Promise.all(examDict.examination.map(async (data) => {
                    const newExam = new this.ExamModel(data);
                    await newExam.save();
                    return newExam;
                }));
                const lectureDetailsDict = outline.lectureDetails;
                let implementLecture = [];
                for (let lectureDetail of lectureDetailsDict) {
                    if (lectureDetail) {
                        const newlecture = new this.LearningPathModel({
                            lectureNumber: lectureDetail.lectureNumber,
                            lectureTitle: lectureDetail.lectureTitle,
                            lectureWebsite: lectureDetail.lectureWebsite
                        });
                        if (lectureDetail.quiz) {
                            for (let quizSave of lectureDetail.quiz) {
                                const newquiz = new this.QuizModel(quizSave);
                                await newquiz.save();
                                newlecture.quiz.push(newquiz._id);
                            }
                        }
                        else {
                            console.log('empty');
                        }
                        const res = await newlecture.save();
                        implementLecture.push(res);
                    }
                    else {
                        console.error('lectureDetail.quiz is either undefined or an empty array.');
                    }
                }
                const newOutline = new this.OutlineModel({
                    question: outline.question,
                    description: outline.description,
                    requirement: outline.requirement,
                    lectureDetails: implementLecture,
                    examination: exam_child
                });
                console.log(newOutline);
                await newOutline.save();
                return { msg: 'Complete', data: newOutline._id };
            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async getid(id) {
        try {
            const findPreview = await this.OutlineModel
                .findById(id)
                .populate({
                path: 'lectureDetails',
                populate: { path: 'quiz', model: 'Quizmodel' },
            })
                .populate('examination');
            if (!findPreview) {
                return Error;
            }
            return findPreview;
        }
        catch (err) {
            console.log(err);
        }
    }
};
exports.OutlineService = OutlineService;
exports.OutlineService = OutlineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Outline')),
    __param(1, (0, mongoose_1.InjectModel)('LearningPath')),
    __param(2, (0, mongoose_1.InjectModel)('Examination')),
    __param(3, (0, mongoose_1.InjectModel)('Quizmodel')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OutlineService);
//# sourceMappingURL=outline.service.js.map