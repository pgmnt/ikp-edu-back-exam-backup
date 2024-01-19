"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizResponseSchema = void 0;
const mongoose = require("mongoose");
exports.QuizResponseSchema = new mongoose.Schema({
    course_id: String,
    lecture_id: String,
    questions: [
        {
            num: Number,
            question: String,
            options: [
                {
                    ans: String,
                    isCorrect: Boolean,
                },
            ],
        },
    ],
});
//# sourceMappingURL=addq.model.js.map