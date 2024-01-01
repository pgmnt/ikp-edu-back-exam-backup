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
            const new_enroll = await new this.EnrollModel({
                _id: findoutline._id,
                name: findoutline.question
            });
            await new_enroll.save();
            findUser.enroll.push(new_enroll);
            await findUser.save();
            console.log(findUser);
            const newtoken = this.jwtService.sign({
                id: 'ss',
            });
            console.log(newtoken);
            return {
                message: 'Enrollment successful',
                statusCode: 200,
                newtoken: ''
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