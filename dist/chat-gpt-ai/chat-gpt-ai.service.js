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
var ChatGptAiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGptAiService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const openai_1 = require("openai");
let ChatGptAiService = ChatGptAiService_1 = class ChatGptAiService {
    constructor(ChatGptResponseModel) {
        this.ChatGptResponseModel = ChatGptResponseModel;
        this.logger = new common_1.Logger(ChatGptAiService_1.name);
        const configuration = new openai_1.Configuration({
            organization: process.env.ORGANIZATION_ID,
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openAiApi = new openai_1.OpenAIApi(configuration);
    }
    async extractDescriptionAndRequirements(input) {
        try {
            let description = '';
            let requirements = '';
            const lines = input.split('\n');
            let isParsingDescription = true;
            for (const line of lines) {
                if (line.includes("Description") && isParsingDescription) {
                    description += line + '\n';
                    continue;
                }
                else if (line.includes("Requirements:")) {
                    isParsingDescription = false;
                    if (!isParsingDescription) {
                        requirements += line + '\n';
                    }
                    continue;
                }
            }
            description = description.trim();
            requirements = requirements.trim();
            return { description, requirements };
        }
        catch (error) {
            this.logger.error('Error extracting description and requirements: ', error);
            throw error;
        }
    }
    async getModelAnswer(input) {
        try {
            const params = {
                prompt: "generate course outlines and guide users step by step, Do list the number of lecture, name of lecture and each lecture provide me the website link that I can learn -" + input.question + "In this format Course Outline - Name of the course, Description of the course, Requirements, Lecture number of lecture: name of lecture, description: description, website: website link to be in the form /Lecture (\d+): (.*), Description: (.*), Website: (https:\/\/\S+)/ ",
                model: input.getModelId(),
                temperature: input.getTemperature(),
                max_tokens: input.getMaxTokens(),
            };
            const response = await this.openAiApi.createCompletion(params);
            const { data } = response;
            if (data.choices.length) {
                const answerText = data.choices[0].text;
                const { description, requirements } = await this.extractDescriptionAndRequirements(answerText);
                const lectureDetails = this.parseLectureDetails(answerText);
                if (lectureDetails.length > 0) {
                    const resData = await this.saveGptResponse(input.question, answerText, input.getModelId(), description, requirements, lectureDetails);
                    return resData;
                }
                else {
                    this.logger.error('No valid lecture details found in the answer text:', answerText);
                }
            }
            else {
                return response.data;
            }
        }
        catch (error) {
            this.logger.error('Error processing user request: ', error);
            throw error;
        }
    }
    parseLectureDetails(answerText) {
        const lectureDetails = [];
        const lines = answerText.split('\n');
        let currentLecture = {};
        for (const line of lines) {
            const lectureMatch = line.match(/Lecture (\d+): (.*), Description: (.*), Website: (https:\/\/\S+)/);
            if (lectureMatch) {
                const [_, lectureNumber, lectureTitle, lectureDescription, lectureWebsite] = lectureMatch;
                currentLecture = {
                    lectureNumber,
                    lectureTitle,
                    lectureDescription,
                    lectureWebsite,
                };
                lectureDetails.push(currentLecture);
            }
            else if (currentLecture && line.trim() === "") {
                currentLecture = {};
            }
        }
        return lectureDetails;
    }
    async saveGptResponse(question, answer, modelId, description, requirement, lectureDetails) {
        const formattedResponse = new this.ChatGptResponseModel({
            question,
            answer,
            modelId,
            description,
            requirement,
            lectureDetails: lectureDetails.map((lecture) => ({
                lectureNumber: lecture.lectureNumber,
                lectureTitle: lecture.lectureTitle,
                lectureWebsite: lecture.lectureWebsite,
            })),
        });
        try {
            const Gptresponse = await formattedResponse.save();
            return Gptresponse;
        }
        catch (error) {
            this.logger.error('Error saving to the database: ', error);
        }
    }
    async listModels() {
        try {
            const models = await this.openAiApi.listModels();
            return models.data;
        }
        catch (error) {
            this.logger.error('Error listing models: ', error);
            throw error;
        }
    }
    async get_Course(id) {
        try {
            const response = await this.ChatGptResponseModel.findById(id);
            if (!response) {
                return { msg: 'ไม่พบข้อมูล' };
            }
            return response;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
};
exports.ChatGptAiService = ChatGptAiService;
exports.ChatGptAiService = ChatGptAiService = ChatGptAiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('ChatGptResponse')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ChatGptAiService);
//# sourceMappingURL=chat-gpt-ai.service.js.map