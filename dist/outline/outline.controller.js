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
exports.OutlineController = void 0;
const common_1 = require("@nestjs/common");
const outline_service_1 = require("./outline.service");
let OutlineController = class OutlineController {
    constructor(outlineService) {
        this.outlineService = outlineService;
    }
    SaveCourse(dataCourse, name) {
        return this.outlineService.SaveCourse(dataCourse, name);
    }
    Getall_outline() {
        return this.outlineService.Getall_outline();
    }
    EditOutline(id) {
        return this.outlineService.EditOutline(id);
    }
    EditNewOutline(dataCourse) {
        return this.outlineService.EditNewOutline(dataCourse);
    }
    deleteCourse(id) {
        return this.outlineService.deleteCourse(id);
    }
    Publish(id) {
        return this.outlineService.Publish(id);
    }
    getid(id) {
        return this.outlineService.getid(id);
    }
};
exports.OutlineController = OutlineController;
__decorate([
    (0, common_1.Post)("/add/:id"),
    __param(0, (0, common_1.Body)("dataCourse")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], OutlineController.prototype, "SaveCourse", null);
__decorate([
    (0, common_1.Get)(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OutlineController.prototype, "Getall_outline", null);
__decorate([
    (0, common_1.Post)("/get"),
    __param(0, (0, common_1.Body)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OutlineController.prototype, "EditOutline", null);
__decorate([
    (0, common_1.Post)("/edit"),
    __param(0, (0, common_1.Body)("dataCourse")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OutlineController.prototype, "EditNewOutline", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OutlineController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.Put)("/publish/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OutlineController.prototype, "Publish", null);
__decorate([
    (0, common_1.Post)("/preview"),
    __param(0, (0, common_1.Body)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OutlineController.prototype, "getid", null);
exports.OutlineController = OutlineController = __decorate([
    (0, common_1.Controller)("outline"),
    __metadata("design:paramtypes", [outline_service_1.OutlineService])
], OutlineController);
//# sourceMappingURL=outline.controller.js.map