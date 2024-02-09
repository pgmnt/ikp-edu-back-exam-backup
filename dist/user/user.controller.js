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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(UserService) {
        this.UserService = UserService;
    }
    async enroll(user, course) {
        return this.UserService.enroll(user, course);
    }
    async getmycourse(id) {
        return this.UserService.getmycourse(id);
    }
    async IfPass(idUser, index, idCourse) {
        return this.UserService.IfPass(idUser, index, idCourse);
    }
    async IfExamPass(idUser, idCourse) {
        return this.UserService.IfExamPass(idUser, idCourse);
    }
    async getAuthors(name) {
        return this.UserService.getAuthors(name);
    }
    async getClassOwn(name, role) {
        return this.UserService.getClassOwn(name, role);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Put)(':user/:course'),
    __param(0, (0, common_1.Param)('user')),
    __param(1, (0, common_1.Param)('course')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "enroll", null);
__decorate([
    (0, common_1.Get)('my/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getmycourse", null);
__decorate([
    (0, common_1.Put)('IfPass/:idUser/:index/:idCourse'),
    __param(0, (0, common_1.Param)('idUser')),
    __param(1, (0, common_1.Param)('index')),
    __param(2, (0, common_1.Param)('idCourse')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "IfPass", null);
__decorate([
    (0, common_1.Put)('IfExamPass/:idUser/:idCourse'),
    __param(0, (0, common_1.Param)('idUser')),
    __param(1, (0, common_1.Param)('idCourse')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "IfExamPass", null);
__decorate([
    (0, common_1.Get)('admin/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAuthors", null);
__decorate([
    (0, common_1.Get)('getClass/:name/:role'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getClassOwn", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map