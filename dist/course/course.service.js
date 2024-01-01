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
const mongoose_2 = require("mongoose");
let CourseService = class CourseService {
    constructor(UserModel, EnrollModel, OutlineModel) {
        this.UserModel = UserModel;
        this.EnrollModel = EnrollModel;
        this.OutlineModel = OutlineModel;
    }
    async enroll(id, params) {
        try {
            const findUser = await this.UserModel.findById(id);
            if (!findUser)
                return new common_1.NotFoundException(`User with ID not found.`);
            const findoutline = await this.OutlineModel.findById(params);
            if (!findoutline)
                return new common_1.NotFoundException('Not found outline');
            const new_enroll = await new this.EnrollModel({
                _id: findoutline._id,
                name: findoutline.question
            });
            await new_enroll.save();
            findUser.enroll.push(new_enroll);
            await findUser.save();
            return {
                message: 'Enrollment successful',
                statusCode: 200
            };
        }
        catch (err) {
            console.log(err);
        }
    }
    async getmycourse(id) {
        try {
            const findmycourse = await this.EnrollModel;
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Enroll')),
    __param(2, (0, mongoose_1.InjectModel)('Outline')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CourseService);
//# sourceMappingURL=course.service.js.map