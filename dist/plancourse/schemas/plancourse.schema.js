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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSchema = exports.Plans = exports.Level = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var Category;
(function (Category) {
    Category["PROGRAMMING"] = "Programming";
    Category["GRAPHIC"] = "Graphic";
})(Category || (exports.Category = Category = {}));
var Level;
(function (Level) {
    Level["LV1"] = "Easy";
    Level["LV2"] = "Hard";
})(Level || (exports.Level = Level = {}));
let Plans = class Plans {
};
exports.Plans = Plans;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Plans.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Plans.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Plans.prototype, "level", void 0);
exports.Plans = Plans = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Plans);
exports.CourseSchema = mongoose_1.SchemaFactory.createForClass(Plans);
//# sourceMappingURL=plancourse.schema.js.map