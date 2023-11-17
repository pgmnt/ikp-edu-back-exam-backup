"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGptResponseSchema = void 0;
const mongoose = require("mongoose");
exports.ChatGptResponseSchema = new mongoose.Schema({
    question: String,
    answer: String,
    modelId: String,
    description: String,
    requirement: String,
    lectureDetails: [
        {
            lectureNumber: String,
            lectureTitle: String,
            lectureWebsite: String,
        },
    ],
});
//# sourceMappingURL=chat-gpt-ai.model.js.map