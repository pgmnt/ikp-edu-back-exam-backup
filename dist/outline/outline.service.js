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
    async deleteCourse(outline) {
        try {
            const outlines = await this.OutlineModel.findById(outline).exec();
            if (!outlines) {
                console.log(`Outline with ID ${outlines} not found.`);
                return;
            }
            await outlines.deleteOne();
            const examinationIdsToDelete = outlines.examination;
            if (examinationIdsToDelete && examinationIdsToDelete.length > 0) {
                await this.ExamModel.deleteMany({ _id: { $in: examinationIdsToDelete } }).exec();
            }
            const learningPathIdsToDelete = outlines.lectureDetails.map((learningPath) => learningPath);
            if (learningPathIdsToDelete && learningPathIdsToDelete.length > 0) {
                for (const learningPathId of learningPathIdsToDelete) {
                    const learningPath = await this.LearningPathModel.findById(learningPathId).exec();
                    if (learningPath) {
                        const quizIdsToDelete = learningPath.quiz;
                        if (quizIdsToDelete && quizIdsToDelete.length > 0) {
                            await this.QuizModel.deleteMany({ _id: { $in: quizIdsToDelete } }).exec();
                        }
                    }
                }
                await this.LearningPathModel.deleteMany({ _id: { $in: learningPathIdsToDelete } }).exec();
            }
            console.log(`Outline with ID ${outlines._id} and associated LearningPath, quizzes, and examinations deleted successfully.`);
            const data = { msg: 'complete' };
            return data;
        }
        catch (error) {
            console.error(error);
        }
    }
    async SaveCourse(dataCourse, name) {
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
            await this.deleteCourse(outline._id);
            const examDict = { examination: exams };
            const exam_child = await Promise.all(examDict.examination.map(async (data) => {
                const newExam = new this.ExamModel({
                    num: data.num,
                    question_text: data.question_text,
                    options: data.options,
                });
                await newExam.save();
                return newExam;
            }));
            const lectureDetailsDict = outline.lectureDetails;
            let implementLecture = [];
            console.log(lectureDetailsDict, '<<<<<<');
            for (let lectureDetail of lectureDetailsDict) {
                if (lectureDetail) {
                    const lecTureWebsite = [];
                    const keys = Object.keys(lectureDetail);
                    const keysOfWebsite = keys.filter((key) => key.includes('lectureWebsite'));
                    keysOfWebsite.forEach((key) => key.includes('lectureWebsite') ? lecTureWebsite.push(lectureDetail[key]) : null);
                    const newLecture = new this.LearningPathModel({
                        lectureNumber: lectureDetail.lectureNumber,
                        lectureTitle: lectureDetail.lectureTitle,
                        lectureDescription: lectureDetail.lectureDescription,
                        lectureWebsite: lecTureWebsite
                    });
                    if (lectureDetail.quiz) {
                        for (let quizSave of lectureDetail.quiz) {
                            const newQuiz = new this.QuizModel({
                                num: quizSave.num,
                                question_text: quizSave.question_text,
                                options: quizSave.options
                            });
                            const quizChild = await newQuiz.save();
                            newLecture.quiz.push(quizChild);
                        }
                    }
                    else {
                        console.log('empty');
                    }
                    const res = await newLecture.save();
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
                examination: exam_child,
                author: name
            });
            await newOutline.save();
            return { msg: 'Complete', data: newOutline._id };
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
    async Getall_outline() {
        try {
            const getAlloutline = await this.OutlineModel.find();
            return getAlloutline;
        }
        catch (err) {
            console.log(err);
        }
    }
    async EditOutline(id) {
        try {
            const getAlloutline = await this.OutlineModel.findById(id).populate({
                path: 'lectureDetails',
                populate: { path: 'quiz', model: 'Quizmodel' },
            })
                .populate('examination');
            if (getAlloutline) {
                return getAlloutline;
            }
            else {
                return { message: 'Not Found' };
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async EditNewOutline(dataCourse) {
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
            const outlineObjectId = new mongoose_2.Types.ObjectId(outline._id);
            await this.OutlineModel.deleteOne({ _id: outlineObjectId });
            await this.LearningPathModel.deleteMany({ outline: outlineObjectId });
            await this.ExamModel.deleteMany({ outline: outlineObjectId });
        }
        catch (err) {
            console.log(err);
        }
    }
    async Publish(id) {
        try {
            const findId = await this.OutlineModel.findOneAndUpdate({ _id: id }, { publish: true }, { new: true, validateBeforeSave: true });
            if (!findId) {
                return { msg: 'Not found!' };
            }
            return { msg: 'Complete' };
        }
        catch (err) {
            console.log(err);
        }
    }
    async GetPreview(id) {
        try {
            const findId = await this.OutlineModel
                .findOne({ _id: id })
                .populate([
                {
                    path: 'lectureDetails',
                    populate: {
                        path: 'quiz',
                    },
                },
                {
                    path: 'examination',
                }
            ])
                .exec();
            if (!findId) {
                return { msg: 'Not found!' };
            }
            return findId;
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