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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const course_schema_1 = require("./schemas/course.schema");
let CourseService = class CourseService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async findAll(query) {
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        const keyword = query.keyword
            ? {
                title: {
                    $regex: query.keyword,
                    $options: 'i',
                },
            }
            : {};
        const courses = await this.courseModel
            .find(Object.assign({}, keyword))
            .limit(resPerPage)
            .skip(skip);
        return courses;
    }
    async create(course, user) {
        const data = Object.assign(course, { user: user._id });
        const res = await this.courseModel.create(data);
        return res;
    }
    async findById(id) {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const course = await this.courseModel.findById(id);
        if (!course) {
            throw new common_1.NotFoundException('Course not found.');
        }
        return course;
    }
    async updateById(id, course) {
        return await this.courseModel.findByIdAndUpdate(id, course, {
            new: true,
            runValidators: true,
        });
    }
    async deleteById(id) {
        return await this.courseModel.findByIdAndDelete(id);
    }
    async addcoe(dataCourse) {
        try {
            const quizList = [];
            let exams = {};
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
            outline['exam'] = exams;
            quizList.forEach((data, index) => {
                outline.lectureDetails[index][`quiz${index + 1}`] = data;
            });
        }
        catch (err) {
            console.log(err);
        }
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], CourseService);
//# sourceMappingURL=course.service.js.map