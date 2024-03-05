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
            let description = "";
            let requirements = "";
            const lines = input.split("\n");
            let isParsingDescription = true;
            for (const line of lines) {
                if (line.includes("Summary:") ||
                    (line.includes("Summary:\n") && isParsingDescription)) {
                    description += line + "\n";
                }
                else if (line.includes("Requirement:") ||
                    line.includes("Requirements:\n")) {
                    isParsingDescription = false;
                    requirements += line + "\n";
                }
            }
            description = description.trim();
            requirements = requirements.trim();
            return { description, requirements };
        }
        catch (error) {
            this.logger.error("Error extracting description and requirements: ", error);
            throw error;
        }
    }
    levelPrompt(input) {
        let params;
        switch (input.level) {
            case "Beginner":
                params = {
                    prompt: "generate course outlines and guide users step by step, Do list the number of lecture, name of lecture and each lecture provide me exactly 2 website links in each lecture that I can learn - focusing on " +
                        input.question +
                        " within the context of Software Engineering and App Development. Ensure that the lecture provides a challenging and insightful experience for learner - Difficulty: Beginner (Keyword to generate lectures: Understanding basic syntax and program structure,Learning variables, data types, and basic operations,Implementing simple algorithms and conditional statements,Basic input/output and user interaction,Introduction to debugging and error handling), In this format Course Outline - Name of the course, Summary: summary of the course no new line, Requirement: requirement of the course no new line, Lecture number of lecture: name of lecture, description: description new line, website1: website1 new line, website2: website2 new line link to be in the form /Lecture (d+): (.), Description: (.), Website: (https://S+)/ if no website found in lecture or N/A cut that lecture out",
                    model: input.getModelId(),
                    temperature: input.getTemperature(),
                    max_tokens: input.getMaxTokens(),
                };
                break;
            case "Intermediate":
                params = {
                    prompt: "generate course outlines and guide users step by step, Do list the number of lecture, name of lecture and each lecture provide me exactly 2 website links in each lecture that I can learn - focusing on " +
                        input.question +
                        " within the context of Software Engineering and App Development. Ensure that the lecture provides a challenging and insightful experience for learner - Difficulty: Intermediate (Keyword: Mastery of control flow structures (loops, conditionals),Understanding functions/methods and parameter passing,Introduction to data structures (arrays, lists),File I/O and exception handling,Object-oriented programming concepts (classes, objects, inheritance)), In this format Course Outline - Name of the course, Summary: summary of the course no new line, Requirement: requirement of the course no new line, Lecture number of lecture: name of lecture, description: description new line, website1: website1 new line, website2: website2 new line link to be in the form /Lecture (d+): (.), Description: (.), Website: (https://s+%29/ if no website found in lecture or N/A cut that lecture out",
                    model: input.getModelId(),
                    temperature: input.getTemperature(),
                    max_tokens: input.getMaxTokens(),
                };
                break;
            case "Advanced":
                params = {
                    prompt: "generate course outlines and guide users step by step, Do list the number of lecture, name of lecture and each lecture provide me exactly 2 website links in each lecture that I can learn - focusing on " +
                        input.question +
                        " within the context of Software Engineering and App Development. Ensure that the lecture provides a challenging and insightful experience for learner - Difficulty: Advanced (Keyword: Proficient understanding of data structures,Advanced algorithms and problem-solving skills,Multithreading and concurrency concepts,Database interaction and manipulation,Development frameworks), In this format Course Outline - Name of the course, Summary: summary of the course no new line, Requirement: requirement of the course no new line, Lecture number of lecture: name of lecture, description: description new line, website1: website1 new line, website2: website2 new line link to be in the form /Lecture (d+): (.), Description: (.), Website: (https://s+%29/ if no website found in lecture or N/A cut that lecture out",
                    model: input.getModelId(),
                    temperature: input.getTemperature(),
                    max_tokens: input.getMaxTokens(),
                };
                break;
        }
        return params;
    }
    async getModelAnswer(input) {
        const params = this.levelPrompt(input);
        try {
            const response = await this.openAiApi.createCompletion(params);
            const { data } = response;
            if (data.choices.length) {
                const answerText = data.choices[0].text;
                this.logger.log("Lecture Details:", answerText);
                const { description, requirements } = await this.extractDescriptionAndRequirements(answerText);
                const lectureDetails = this.parseLectureDetails(answerText);
                if (lectureDetails.length > 0) {
                    const resData = await this.saveGptResponse(input.question, answerText, input.getModelId(), description, input.level, input.category, requirements, lectureDetails);
                    return resData;
                }
                else {
                    this.logger.error("No valid lecture details found in the answer text:", answerText);
                }
            }
            else {
                return response.data;
            }
        }
        catch (error) {
            this.logger.error("Error processing user request: ", error);
            throw error;
        }
    }
    parseLectureDetails(answerText) {
        const lectureDetails = [];
        const lines = answerText.split("\n");
        let currentLecture = {};
        for (const line of lines) {
            const lectureMatch = line.match(/Lecture (\d+): (.*)/);
            if (lectureMatch) {
                const [_, lectureNumber, lectureTitle] = lectureMatch;
                currentLecture = {
                    lectureNumber,
                    lectureTitle,
                    lectureDescription: "",
                    lectureWebsite1: "",
                    lectureWebsite2: "",
                };
            }
            else if ((currentLecture.lectureNumber && line.startsWith("Description:")) ||
                line.startsWith("Description:\n")) {
                currentLecture.lectureDescription = line
                    .replace("Description:", "")
                    .trim();
            }
            else if ((currentLecture.lectureNumber && line.startsWith("Website")) ||
                line.startsWith("Website\n")) {
                const websiteMatch = line.match(/Website \d+: (https:\/\/\S+)/) ||
                    line.match(/Website\d+: (https:\/\/\S+)/);
                if (websiteMatch) {
                    const [, website] = websiteMatch;
                    if (!currentLecture.lectureWebsite1) {
                        currentLecture.lectureWebsite1 = website;
                    }
                    else if (!currentLecture.lectureWebsite2) {
                        currentLecture.lectureWebsite2 = website;
                    }
                }
            }
            else if (currentLecture.lectureNumber && line.trim() === "") {
                if (!(currentLecture.lectureWebsite1 === "N/A" ||
                    currentLecture.lectureWebsite1 === "" ||
                    currentLecture.lectureWebsite2 === "N/A" ||
                    currentLecture.lectureWebsite2 === "")) {
                    lectureDetails.push(currentLecture);
                }
                currentLecture = {};
            }
        }
        if (currentLecture.lectureNumber &&
            !(currentLecture.lectureWebsite1 === "N/A" ||
                currentLecture.lectureWebsite1 === "" ||
                currentLecture.lectureWebsite2 === "N/A" ||
                currentLecture.lectureWebsite2 === "")) {
            lectureDetails.push(currentLecture);
        }
        return lectureDetails;
    }
    async saveGptResponse(question, answer, modelId, description, level, category, requirement, lectureDetails) {
        const formattedResponse = new this.ChatGptResponseModel({
            question,
            answer,
            modelId,
            description,
            level,
            category,
            requirement,
            lectureDetails: lectureDetails.map((lecture) => ({
                lectureNumber: lecture.lectureNumber,
                lectureTitle: lecture.lectureTitle,
                lectureWebsite: [lecture.lectureWebsite1, lecture.lectureWebsite2],
                lectureDescription: lecture.lectureDescription,
            })),
        });
        try {
            const GptResponse = await formattedResponse.save();
            return GptResponse;
        }
        catch (error) {
            this.logger.error("Error saving to the database: ", error);
        }
    }
    async listModels() {
        try {
            const models = await this.openAiApi.listModels();
            return models.data;
        }
        catch (error) {
            this.logger.error("Error listing models: ", error);
            throw error;
        }
    }
    async get_Course(id) {
        try {
            const response = await this.ChatGptResponseModel.findById(id);
            if (!response) {
                return { msg: "ไม่พบข้อมูล" };
            }
            console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteLearningPath(courseId, lectureId) {
        try {
            const result = await this.ChatGptResponseModel.updateOne({ _id: courseId }, { $pull: { lectureDetails: { _id: lectureId } } });
            if (!result) {
                throw new common_1.NotFoundException("Learning path or lecture not found");
            }
        }
        catch (error) {
            this.logger.error("Error deleting learning path or lecture: ", error);
            throw error;
        }
    }
    split_lecture(answerText) {
        console.log(answerText);
        const lines = answerText.split("\n");
        let splitData = lines[lines.length - 1].split(" - ");
        let lectureTitle = splitData[0].trim();
        let website = splitData[1].trim();
        return {
            lectureTitle: lectureTitle,
            lectureWebsite: website,
        };
    }
    async regenLearningPath(input) {
        try {
            const params = {
                prompt: "generate lectureTitle lectureWebsite , lecture provide me the website link that I can learn " +
                    input.question +
                    "In this format lectureTitle : (.*) - lectureWebsite :(https://S+)/  ",
                model: input.getModelId(),
                temperature: input.getTemperature(),
                max_tokens: input.getMaxTokens(),
            };
            const response = await this.openAiApi.createCompletion(params);
            const { data } = response;
            if (data.choices.length) {
                const answerText = data.choices[0].text;
                const response = this.split_lecture(answerText);
                return response;
            }
            else {
                this.logger.error("err");
            }
        }
        catch (err) {
            this.logger.error(err);
        }
    }
};
exports.ChatGptAiService = ChatGptAiService;
exports.ChatGptAiService = ChatGptAiService = ChatGptAiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("ChatGptResponse")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ChatGptAiService);
//# sourceMappingURL=chat-gpt-ai.service.js.map