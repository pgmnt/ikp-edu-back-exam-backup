//addq.service.ts
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
// import { LearningPath } from 'src/outline/schemas/learningPath.schema';
import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
import { QuizResponseDocument } from "./addq.model";
import { spawn } from "child_process";
import { ChatGptResponseDocument } from "../chat-gpt-ai/chat-gpt-ai.model"; // Adjust the path if needed
import { GenQuiz } from "./dto/gen-quiz-dto";

const DEFAULT_MODEL_ID  = "gpt-3.5-turbo-instruct"
const DEFAULT_TEMPERATURE = 0.9
const DEFAULT_MAX_TOKENS = 2048



@Injectable()
export class AddqService {
  getDataQuiz() {
    throw new Error("Method not implemented.");
  }
  private readonly openAiApi: OpenAIApi;
  private readonly logger: Logger = new Logger(AddqService.name);

  constructor(
    @InjectModel("QuizResponse")
    private readonly QuizResponseModel: Model<QuizResponseDocument>,
    // @InjectModel('LearningPath') private LearningPathModel : Model<LearningPath>
    @InjectModel("ChatGptResponse")
    private readonly ChatGptResponseModel: Model<ChatGptResponseDocument>
  ) {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openAiApi = new OpenAIApi(configuration);
  }

  async getModelAnswer(input: GenQuiz) {
    try {
      let lectureWebsite1: string;
      let lectureWebsite2: string;
      lectureWebsite1 = input.webArray[0]
      lectureWebsite2 = input.webArray[1]
      if ( !lectureWebsite1||!lectureWebsite2) throw new HttpException('Not found lecture', HttpStatus.BAD_REQUEST);
      const getScrapedContent = async (): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
          const pythonProcess = spawn("python", [
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
            } else {
              console.error(`Python script exited with code ${code}`);
              reject(new Error(`Python script exited with code ${code}`));
            }
          });
        });
      };
      const scrapedContent = await getScrapedContent();
      const params: CreateCompletionRequest = {
        prompt: `Create ${15} data according to this format
            [{
              "num": 1,
            "question_text": "question_text1"?,
            "options":[ 
              {"ans": "ans1", "isCorrect": boolean isCorrect1},
              {"ans": "ans2", "isCorrect": boolean isCorrect2},
              {"ans": "ans3", "isCorrect": boolean isCorrect3},
              {"ans": "ans4", "isCorrect": boolean isCorrect4},
            ]
          },{
            "num": 2,
          "question_text": "question_text2"?,
          "options":[ 
            {"ans": "ans1", "isCorrect": boolean isCorrect1},
            {"ans": "ans2", "isCorrect": boolean isCorrect2},
            {"ans": "ans3", "isCorrect": boolean isCorrect3},
            {"ans": "ans4", "isCorrect": boolean isCorrect4},
          ]
        },{
          "num": 3,
        "question_text": "question_text3"?,
        "options":[ 
          {"ans": "ans1", "isCorrect": boolean isCorrect1},
          {"ans": "ans2", "isCorrect": boolean isCorrect2},
          {"ans": "ans3", "isCorrect": boolean isCorrect3},
          {"ans": "ans4", "isCorrect": boolean isCorrect4},
        ]
      },{
        "num": 4,
      "question_text": "question_text4"?,
      "options":[ 
        {"ans": "ans1", "isCorrect": boolean isCorrect1},
        {"ans": "ans2", "isCorrect": boolean isCorrect2},
        {"ans": "ans3", "isCorrect": boolean isCorrect3},
        {"ans": "ans4", "isCorrect": boolean isCorrect4},
      ]
    },{
      "num": 5,
    "question_text": "question_text5"?,
    "options":[ 
      {"ans": "ans1", "isCorrect": boolean isCorrect1},
      {"ans": "ans2", "isCorrect": boolean isCorrect2},
      {"ans": "ans3", "isCorrect": boolean isCorrect3},
      {"ans": "ans4", "isCorrect": boolean isCorrect4},
    ]
  }]
   using reference data question_txt from ${scrapedContent} starting from num = 1 until 15 . Convert the data to JSON and the options must have 4 characters and must follow the format provided. only And the data you created can use JSON.parse() without err and random position isCorrect.`,
        model: DEFAULT_MODEL_ID,
        temperature: DEFAULT_TEMPERATURE,
        max_tokens: DEFAULT_MAX_TOKENS,
      };

      const response = await this.openAiApi.createCompletion(params);
      const {data } = response
      let resultText = data.choices[0].text.trim().replace(/^\d+\.\s*|\d+\)\s*/gm, '');
      const return_data = JSON.parse(resultText)  
      if(return_data[0].options.length >= 4 && return_data){
        return  {result : return_data ,  statusCode : 200}
      }else{
        console.error('The format is incorrect. ')
        throw new HttpException('The format is incorrect', HttpStatus.BAD_REQUEST);
      }
    

    } catch (error) {
      this.logger.error("Error processing user request: ", error);
      throw error;
    }
  }

  delete_Identification_number(){

  }

  async getScrapedContent(htmlContent: string): Promise<string> {
    try {
      // console.log('Received HTML content in service:', htmlContent);
      return htmlContent;
    } catch (error) {
      console.error("Error getting scraped content:", error);
      throw error;
    }
  }

  parseQuizDetails(answerText: string) {
    this.logger.log("answerText", answerText);
    const quizDetails: {
      num: string;
      question: string;
      options: Array<{ ans: string; isCorrect: boolean }>;
    }[] = [];
    let currentQuestion: any = {};

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
      } else if (line.startsWith("Question:")) {
        currentQuestion.question = line.replace("Question:", "").trim();
      } else if (line.startsWith("Options:")) {
        for (let i = lines.indexOf(line) + 1; i < lines.length; i++) {
          const ansMatch = lines[i].match(
            /ans: (.*), isCorrect: (True|False),/
          );
          if (ansMatch) {
            const [, ans, isCorrect] = ansMatch;
            currentQuestion.options.push({
              ans,
              isCorrect: isCorrect === "True",
            });
          } else if (lines[i].trim() === "") {
            break;
          }
        }
      }
    }

    this.logger.log("quizDetails", quizDetails);
    return quizDetails;
  }

  async saveQuizResponse(lecture_id: string, num: string, quizDetails) {
    this.logger.log("quizDetails: ", quizDetails);

    const formattedQuestions = new this.QuizResponseModel({
      lecture_id,
      // questions: quizDetails.map((questionGroup) => ({
      // num: questionGroup.num,
      num,
      questions: quizDetails.map((question) => ({
        question: question.question,
        options: question.options.map((option) => ({
          ans: option.ans,
          isCorrect: option.isCorrect,
        })),
      })),
      // })),
    });

    this.logger.log(
      "formattedQuestions",
      JSON.stringify(formattedQuestions, null, 2)
    );

    try {
      const savedResponse = await formattedQuestions.save();
      return savedResponse;
    } catch (error) {
      this.logger.error("Error saving to the database: ", error);
    }
  }
}
