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
                prompt: `generate ${num} quizes (don't put number ex 1,2,3,4,5 in front of num:), Do list in string format, questions. Each question should have a num, and an of options, and each option has ans instead of (1,2,3,4 or a,b,c,d) and put answer behind each option with isCorrect flag after the option to indicate if it's the correct answer in the topic of ${scrapedContent} show the result exacly like this start with Num: 1, Question:, Options: and Num: 2, Question:, Options: and go on (example text format like this (
          num: 1,
          question: Which planet is known as the Red Planet?,
          options: 
            ans: Earth, isCorrect: False,
            ans: Mars, isCorrect: True,
            ans: Venus, isCorrect: False,
            ans: Moon, isCorrect: False,
          )`,
                model: input.getModelId(),
                temperature: input.getTemperature(),
                max_tokens: input.getMaxTokens(),
            };
            const response = await this.openAiApi.createCompletion(params);
            console.log('Received response:', response);
            const { data } = response;
            if (data.choices.length) {
                const answerText = data.choices[0].text;
                const quizDetails = await this.parseQuizDetails(answerText);
                if (quizDetails.length) {
                    const resData = await this.saveQuizResponse("1", quizDetails);
                    return resData;
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
    parseQuizDetails(answerText) {
        this.logger.log("answerText", answerText);
        const quizDetails = [];
        const lines = answerText.split('\n');
        let currentLecture = {};
        for (const line of lines) {
            const numMatch = line.match(/Num: (\d+)/);
            if (numMatch) {
                const [, num] = numMatch;
                currentLecture = {
                    num,
                    questions: [],
                };
                quizDetails.push(currentLecture);
            }
            else if (line.startsWith("Question:")) {
                const question = line.replace("Question:", "").trim();
                const options = [];
                const optionsIndex = lines.findIndex((l) => l.startsWith("Options:"));
                if (optionsIndex !== -1) {
                    for (let i = optionsIndex + 1; i < lines.length; i++) {
                        const ansMatch = lines[i].match(/ans: (.*), isCorrect: (True|False),/);
                        if (ansMatch) {
                            const [, ans, isCorrect] = ansMatch;
                            options.push({ ans, isCorrect: isCorrect === 'True' });
                        }
                        else if (lines[i].trim() === "") {
                            break;
                        }
                    }
                }
                currentLecture.questions.push({
                    question,
                    options,
                });
            }
            else if (currentLecture && line.trim() === "") {
                currentLecture = {};
            }
        }
        this.logger.log("quizDetails", quizDetails);
        return quizDetails;
    }
    async saveQuizResponse(lecture_id, quizDetails) {
        this.logger.log('quizDetails: ', quizDetails);
        const formattedQuestions = new this.QuizResponseModel({
            lecture_id,
            questions: quizDetails.map((questionGroup) => ({
                num: questionGroup.num,
                questions: questionGroup.questions.map((question) => ({
                    question: question.question,
                    options: question.options.map((option) => ({
                        ans: option.ans,
                        isCorrect: option.isCorrect
                    }))
                }))
            })),
        });
        this.logger.log('formattedQuestions', JSON.stringify(formattedQuestions, null, 2));
        try {
            const savedResponse = await formattedQuestions.save();
            return savedResponse;
        }
        catch (error) {
            this.logger.error('Error saving to the database: ', error);
        }
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
//# sourceMappingURL=addq.service.js.map