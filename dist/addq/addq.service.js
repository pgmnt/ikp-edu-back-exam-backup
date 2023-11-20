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
var AddqService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddqService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const openai_1 = require("openai");
let AddqService = AddqService_1 = class AddqService {
    getDataQuiz() {
        throw new Error('Method not implemented.');
    }
    constructor(QuizResponseModel) {
        this.QuizResponseModel = QuizResponseModel;
        this.logger = new common_1.Logger(AddqService_1.name);
        const configuration = new openai_1.Configuration({
            organization: process.env.ORGANIZATION_ID,
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openAiApi = new openai_1.OpenAIApi(configuration);
    }
    async saveQuizResponse(lecture_id, questions) {
        const formattedQuestions = questions.map((question) => ({
            num: question.num,
            question_text: question.question_text,
            options: question.options.map((option) => ({
                ans: option.ans,
                isCorrect: option.isCorrect,
            })),
        }));
        const formattedResponse = new this.QuizResponseModel({
            lecture_id,
            questions: formattedQuestions,
        });
        try {
            const savedResponse = await formattedResponse.save();
            return savedResponse;
        }
        catch (error) {
            this.logger.error('Error saving to the database: ', error);
        }
    }
    async getModelAnswer(input) {
        try {
            const params = {
                prompt: `generate 5 quizes, Provide an example of data in JSON format for a lecture with a lecture_id and an array of questions. Each question should have a num, a question_text, and an array of options, where each option has an ans (answer) and an isCorrect flag to indicate if it's the correct answer in the topic of ${input.question}`,
                model: input.getModelId(),
                temperature: input.getTemperature(),
                max_tokens: input.getMaxTokens(),
            };
            const response = await this.openAiApi.createCompletion(params);
            console.log('hiii', response);
            this.logger.log('Raw Response from ChatGPT:', response.data.choices[0].text);
            const { data } = response;
            if (data.choices.length) {
                const answerText = data.choices[0].text;
                this.logger.log('Received JSON Data:', answerText);
                const quizData = JSON.parse(answerText);
                if (quizData.lecture_id && quizData.questions) {
                    const resData = await this.saveQuizResponse(quizData.lecture_id, quizData.questions);
                    return resData;
                }
                else {
                    this.logger.error('Invalid quiz data format in the answer text:', answerText);
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
    async parseQuizDetails(answerText) {
        const QuizDetails = [];
        const regex = /"num": (\d+),\s+"question_text": "(.*?)",\s+"options": \[([^\]]+)\]/g;
        let match;
        while ((match = regex.exec(answerText)) !== null) {
            const num = parseInt(match[1]);
            const question_text = match[2];
            const optionsText = match[3];
            const options = JSON.parse('[' + optionsText + ']');
            QuizDetails.push({
                num,
                question_text,
                options,
            });
        }
        return QuizDetails;
    }
};
exports.AddqService = AddqService;
exports.AddqService = AddqService = AddqService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('QuizResponse')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AddqService);
//# sourceMappingURL=addq.service.js.map