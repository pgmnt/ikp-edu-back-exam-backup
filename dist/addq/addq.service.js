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
const mongodb_1 = require("mongodb");
let AddqService = AddqService_1 = class AddqService {
    getDataQuiz() {
        throw new Error("Method not implemented.");
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
            const Object_Id = new mongodb_1.ObjectId(course);
            let lectureWebsite1;
            let lectureWebsite2;
            const courseDocument = await this.ChatGptResponseModel.findOne({ "lectureDetails._id": Object_Id }, { "lectureDetails.$": 1 });
            if (courseDocument &&
                courseDocument.lectureDetails &&
                courseDocument.lectureDetails.length > 0) {
                const lectureDetails = courseDocument.lectureDetails[0];
                lectureWebsite1 = lectureDetails.lectureWebsite1;
                lectureWebsite2 = lectureDetails.lectureWebsite2;
            }
            else {
                console.error("Document not found in the database or lectureDetails is empty.");
            }
            const getScrapedContent = async () => {
                return new Promise((resolve, reject) => {
                    const pythonProcess = (0, child_process_1.spawn)("python", [
                        "D:/Work/course_work/pythonProject2/main.py",
                        lectureWebsite1,
                        lectureWebsite2,
                    ]);
                    let scrapedContent = "";
                    pythonProcess.stdout.on("data", (data) => {
                        scrapedContent += data.toString();
                    });
                    pythonProcess.stderr.on("data", (error) => {
                        reject(new Error(`Error from Python script: ${error.toString()}`));
                    });
                    pythonProcess.on("exit", (code) => {
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
                prompt: `Create ${num} data according to this format
            [{
              num: 1,
            question_text: question_text1?,
            options:[ 
              {ans: ans1, isCorrect: boolean isCorrect1},
              {ans: ans2, isCorrect: boolean isCorrect2},
              {ans: ans3, isCorrect: boolean isCorrect3},
              {ans: ans4, isCorrect: boolean isCorrect4},
            ]
          },{
            num: 2,
          question_text: question_text2?,
          options:[ 
            {ans: ans1, isCorrect:boolean isCorrect1},
            {ans: ans2, isCorrect:boolean isCorrect1},
            {ans: ans3, isCorrect:boolean isCorrect1},
            {ans: ans4, isCorrect:boolean isCorrect4},
          ]
        },{
          num: 3,
        question_text: question_text3?,
        options:[ 
          {ans: ans1, isCorrect:boolean isCorrect1},
          {ans: ans2, isCorrect:boolean isCorrect2},
          {ans: ans3, isCorrect:boolean isCorrect3},
          {ans: ans4, isCorrect:boolean isCorrect4},
        ]
      },{
        num: 4,
      question_text: question_text4?,
      options:[ 
        {ans: ans1, isCorrect:boolean isCorrect1},
        {ans: ans2, isCorrect:boolean isCorrect2},
        {ans: ans3, isCorrect:boolean isCorrect3},
        {ans: ans4, isCorrect:boolean isCorrect4},
      ]
    },{
    num: 5,
    question_text: question_text5?,
    options:[ 
      {ans: ans1, isCorrect: isCorrect1},
      {ans: ans2, isCorrect: isCorrect2},
      {ans: ans3, isCorrect: isCorrect3},
      {ans: ans4, isCorrect: isCorrect4},
    ]
  }]
   using reference data question_txt from ${scrapedContent} starting from num = 1. Convert the data to JSON and the options must have 4 characters and must follow the format provided. only And the data you created can use JSON.parse() without err and random position isCorrect.`,
                model: input.getModelId(),
                temperature: input.getTemperature(),
                max_tokens: input.getMaxTokens(),
            };
            const response = await this.openAiApi.createCompletion(params);
            const { data } = response;
            console.log(data);
            const return_data = JSON.parse(data.choices[0].text.trim());
            if (return_data[0].options.length >= 4) {
                return return_data;
            }
            else {
                console.error('The format is incorrect. ');
                throw new common_1.HttpException('The format is incorrect', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            this.logger.error("Error processing user request: ", error);
            throw error;
        }
    }
    async getScrapedContent(htmlContent) {
        try {
            return htmlContent;
        }
        catch (error) {
            console.error("Error getting scraped content:", error);
            throw error;
        }
    }
    parseQuizDetails(answerText) {
        this.logger.log("answerText", answerText);
        const quizDetails = [];
        let currentQuestion = {};
        const lines = answerText.split("\n");
        for (const line of lines) {
            const numMatch = line.match(/Num: (\d+)/);
            if (numMatch) {
                const [, num] = numMatch;
                currentQuestion = {
                    num,
                    question: "",
                    options: [],
                };
                quizDetails.push(currentQuestion);
            }
            else if (line.startsWith("Question:")) {
                currentQuestion.question = line.replace("Question:", "").trim();
            }
            else if (line.startsWith("Options:")) {
                for (let i = lines.indexOf(line) + 1; i < lines.length; i++) {
                    const ansMatch = lines[i].match(/ans: (.*), isCorrect: (True|False),/);
                    if (ansMatch) {
                        const [, ans, isCorrect] = ansMatch;
                        currentQuestion.options.push({
                            ans,
                            isCorrect: isCorrect === "True",
                        });
                    }
                    else if (lines[i].trim() === "") {
                        break;
                    }
                }
            }
        }
        this.logger.log("quizDetails", quizDetails);
        return quizDetails;
    }
    async saveQuizResponse(lecture_id, num, quizDetails) {
        this.logger.log("quizDetails: ", quizDetails);
        const formattedQuestions = new this.QuizResponseModel({
            lecture_id,
            num,
            questions: quizDetails.map((question) => ({
                question: question.question,
                options: question.options.map((option) => ({
                    ans: option.ans,
                    isCorrect: option.isCorrect,
                })),
            })),
        });
        this.logger.log("formattedQuestions", JSON.stringify(formattedQuestions, null, 2));
        try {
            const savedResponse = await formattedQuestions.save();
            return savedResponse;
        }
        catch (error) {
            this.logger.error("Error saving to the database: ", error);
        }
    }
};
exports.AddqService = AddqService;
exports.AddqService = AddqService = AddqService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("QuizResponse")),
    __param(1, (0, mongoose_2.InjectModel)("ChatGptResponse")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], AddqService);
//# sourceMappingURL=addq.service.js.map