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
const child_process_1 = require("child_process");
let AddqService = AddqService_1 = class AddqService {
    getDataQuiz() {
        throw new Error('Method not implemented.');
    }
    constructor(QuizResponseModel, ChatGptResponseModel) {
        this.QuizResponseModel = QuizResponseModel;
        this.ChatGptResponseModel = ChatGptResponseModel;
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
    async getModelAnswer(input, num) {
        try {
            const course = input.course_id;
            let lectureWebsite1;
            let lectureWebsite2;
            const courseDocument = await this.ChatGptResponseModel.findOne({ 'lectureDetails._id': course }, { 'lectureDetails.$': 1 });
            console.log('courseDocument:', courseDocument);
            if (courseDocument && courseDocument.lectureDetails && courseDocument.lectureDetails.length > 0) {
                const lectureDetails = courseDocument.lectureDetails[0];
                lectureWebsite1 = lectureDetails.lectureWebsite1;
                lectureWebsite2 = lectureDetails.lectureWebsite2;
            }
            else {
                console.error('Document not found in the database or lectureDetails is empty.');
            }
            const getScrapedContent = async () => {
                return new Promise((resolve, reject) => {
                    const pythonProcess = (0, child_process_1.spawn)('python3', ['/Users/manitachawyotha/PycharmProjects/pythonProject2/main.py', lectureWebsite1, lectureWebsite2]);
                    let scrapedContent = '';
                    pythonProcess.stdout.on('data', (data) => {
                        scrapedContent += data.toString();
                    });
                    pythonProcess.stderr.on('data', (error) => {
                        reject(new Error(`Error from Python script: ${error.toString()}`));
                    });
                    pythonProcess.on('exit', (code) => {
                        if (code === 0) {
                            resolve(scrapedContent);
                        }
                        else {
                            console.error(`Python script exited with code ${code}`);
                            reject(new Error(`Python script exited with code ${code}`));
                        }
                    });
                });
            };
            const scrapedContent = await getScrapedContent();
            const params = {
                prompt: `generate ${num} quizes, Provide data in this valid JSON, An array of questions. Each question should have a num, a question, and an array of options, where each option has an ans (answer) and an isCorrect flag to indicate if it's the correct answer in the topic of ${scrapedContent}`,
                model: input.getModelId(),
                temperature: input.getTemperature(),
                max_tokens: input.getMaxTokens(),
            };
            const response = await this.openAiApi.createCompletion(params);
            console.log('Received response:', response);
            const { data } = response;
            if (data.choices.length) {
                console.log('Received JSON Data:', data.choices[0].text);
                const answerText = data.choices[0].text;
                this.logger.log('Received JSON Data:', answerText);
                const quizDetails = await this.parseQuizDetails(answerText);
                if (quizDetails.length) {
                    const { lecture_id, questions } = quizDetails[0];
                    if (lecture_id && questions) {
                        const resData = await this.saveQuizResponse(lecture_id, questions);
                        return resData;
                    }
                    else {
                        this.logger.error('Invalid quiz data format in the answer text:', answerText);
                    }
                }
                else {
                    this.logger.error('Invalid quiz details format in the answer text:', answerText);
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
    async getScrapedContent(htmlContent) {
        try {
            return htmlContent;
        }
        catch (error) {
            console.error('Error getting scraped content:', error);
            throw error;
        }
    }
    async parseQuizDetails(answerText1) {
        const QuizDetails = [];
        let currentQuestion = {};
        try {
            const parsedData = JSON.parse(answerText1);
            const questions = parsedData.questions;
            this.logger.debug(questions);
            if (Array.isArray(questions)) {
                questions.forEach((item, index) => {
                    const num = item.num || (index + 1).toString();
                    const question = item.question || '';
                    const options = item.options || [];
                    if (typeof num === 'string' && typeof question === 'string' && Array.isArray(options)) {
                        QuizDetails.push({
                            num,
                            question,
                            options: options.map((option) => ({
                                ans: option.ans || '',
                                isCorrect: option.isCorrect || 'False',
                            })),
                        });
                    }
                    else {
                        this.logger.error('Invalid quiz data format in the answer text:', questions);
                    }
                });
            }
            else {
                this.logger.error('Invalid quiz details format in the answer text:', questions);
            }
        }
        catch (error) {
            this.logger.error('Error parsing quiz details:', error);
        }
        return QuizDetails;
    }
};
exports.AddqService = AddqService;
exports.AddqService = AddqService = AddqService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('QuizResponse')),
    __param(1, (0, mongoose_2.InjectModel)('ChatGptResponse')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], AddqService);
//# sourceMappingURL=addq%20copy.service.js.map