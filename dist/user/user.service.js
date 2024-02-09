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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(UserModel, EnrollModel, OutlineModel, jwtService) {
        this.UserModel = UserModel;
        this.EnrollModel = EnrollModel;
        this.OutlineModel = OutlineModel;
        this.jwtService = jwtService;
    }
    async enroll(user, course) {
        try {
            const findUser = await this.UserModel.findById(user);
            const objectcourse = new mongoose_2.default.Types.ObjectId(course);
            if (!findUser)
                return new common_1.NotFoundException(`User with ID not found.`);
            const isEnrolled = findUser.enroll.some((val) => val._id.equals(objectcourse));
            if (isEnrolled) {
                throw new common_1.HttpException('User is already enrolled in this course', common_1.HttpStatus.BAD_REQUEST);
            }
            const findoutline = await this.OutlineModel.findById(course);
            if (!findoutline)
                return new common_1.NotFoundException('Not found outline');
            findoutline.WhoEnroll.push(findUser._id);
            findoutline.numberUser = findoutline.numberUser + 1;
            await findoutline.save();
            const new_enroll = new this.EnrollModel({
                id: findoutline._id,
                question: findoutline.question,
                IsPass: findoutline.lectureDetails.map((value) => false),
                numberUser: findoutline.numberUser
            });
            findUser.enroll.push(new_enroll);
            await findUser.save();
            const newtoken = this.jwtService.sign({
                id: findUser._id,
                name: findUser.name,
                email: findUser.email,
                role: findUser.role,
                gender: findUser.gender,
                occupation: findUser.occupation,
                enroll: findUser.enroll
            });
            return {
                message: 'Enrollment successful',
                statusCode: 200,
                newtoken: newtoken
            };
        }
        catch (err) {
            console.log(err);
        }
    }
    async getmycourse(id) {
        try {
            const findUser = await this.UserModel.findById(id);
            return findUser.enroll;
        }
        catch (error) {
            console.log(error);
        }
    }
    async IfPass(idUser, index, idCourse) {
        try {
            const res = await this.UserModel.updateOne({ _id: idUser, 'enroll._id': idCourse }, { $set: { [`enroll.$.IsPass.${index}`]: true } });
            if (!res)
                return new ErrorEvent("Can't Update ");
            const User = await this.UserModel.findById(idUser);
            if (!User)
                return new common_1.NotFoundException("Not found User");
            const newToken = this.jwtService.sign({
                id: User._id,
                name: User.name,
                email: User.email,
                role: User.role,
                gender: User.gender,
                occupation: User.occupation,
                enroll: User.enroll
            });
            return {
                message: 'Update successful',
                statusCode: 200,
                newToken: newToken
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async IfExamPass(idUser, idCourse) {
        try {
            const res = await this.UserModel.updateOne({ _id: idUser, 'enroll._id': idCourse }, { $set: { [`enroll.$.Examination`]: true } });
            if (!res)
                return new ErrorEvent("Can't Update ");
            const User = await this.UserModel.findById(idUser);
            if (!User)
                return new common_1.NotFoundException("Not found User");
            const newToken = this.jwtService.sign({
                id: User._id,
                name: User.name,
                email: User.email,
                role: User.role,
                gender: User.gender,
                occupation: User.occupation,
                enroll: User.enroll
            });
            return {
                message: 'Update successful',
                statusCode: 200,
                newToken: newToken
            };
        }
        catch (err) {
            console.log(err);
        }
    }
    async getAuthors(getAuthors) {
        try {
            const findUser = await this.OutlineModel.find({ author: getAuthors });
            if (!findUser)
                return new common_1.NotFoundException("Not found User");
            return findUser;
        }
        catch (err) {
            console.log(err);
            return new common_1.NotFoundException("Not found User");
        }
    }
    async getClassOwn(name, role) {
        try {
            const findClassLength = await this.OutlineModel.find({ author: name });
            if (!findClassLength)
                return new common_1.NotFoundException("Not found User");
            const findClassPublish = await this.OutlineModel.find({ author: name, publish: false });
            if (!findClassPublish)
                return new common_1.NotFoundException("Not found User");
            return {
                CourseCreated: findClassLength.length,
                CoursePublished: findClassLength.length - findClassPublish.length,
                CourseNotPublished: findClassPublish.length
            };
        }
        catch (err) {
            console.log(err);
            return new common_1.NotFoundException("Not found User");
        }
    }
    async test() {
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Enroll')),
    __param(2, (0, mongoose_1.InjectModel)('Outline')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map