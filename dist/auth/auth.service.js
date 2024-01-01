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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto, res) {
        const { name, email, password, birth, gender, occupation } = signUpDto;
        const ishaveuser = await this.userModel.findOne({ email: email });
        if (ishaveuser) {
            throw new common_1.UnauthorizedException('This email is already in use.');
        }
        const birthDate = new Date(birth);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            birthDate,
            gender,
            occupation
        });
        return res.status(200).send({ message: 'complete', statusCode: 200 });
    }
    async login(loginDto, req, res) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const token = this.jwtService.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            birth: user.birth,
            gender: user.gender,
            occupation: user.occupation
        });
        if (!token) {
            throw new common_1.ForbiddenException();
        }
        res.status(200).send({ token: token, statusCode: 200 });
    }
    async Edit(edit, id) {
        try {
            const { email, birth } = edit;
            const isHaveEmail = await this.userModel.findOne({ email: email });
            if (isHaveEmail) {
                throw new common_1.UnauthorizedException('This email is already in use.');
            }
            const userIdObject = new mongoose_2.default.Types.ObjectId(id);
            const birthDate = new Date(birth);
            const res = await this.userModel.findOneAndUpdate({ _id: userIdObject }, {
                name: edit.name,
                email: edit.email,
                password: edit.password,
                birth: birthDate,
                gender: edit.gender,
                occupation: edit.occupation
            });
            const token = this.jwtService.sign({
                id: res._id,
                name: res.name,
                email: res.email,
                role: res.role,
                birth: res.birth,
                gender: res.gender,
                occupation: res.occupation
            });
            return { message: 'complete', statusCode: 200, newtoken: token };
        }
        catch (err) {
            console.log(err);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map