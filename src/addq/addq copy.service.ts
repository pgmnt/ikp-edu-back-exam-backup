//addq.service.ts
import { Injectable, Logger } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { LearningPath } from 'src/outline/schemas/learningPath.schema';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { QuizResponseDocument } from './addq.model';
import { GetAiModelQuiz } from './model/get-quiz-model-answer';
import { spawn } from 'child_process';
import { ChatGptResponseDocument } from '../chat-gpt-ai/chat-gpt-ai.model'; // Adjust the path if needed

@Injectable()
export class AddqService {
  getDataQuiz() {
    throw new Error('Method not implemented.');
  }
  private readonly openAiApi: OpenAIApi;
  private readonly logger: Logger = new Logger(AddqService.name);

  constructor(
    @InjectModel('QuizResponse') private readonly QuizResponseModel: Model<QuizResponseDocument>,
    // @InjectModel('LearningPath') private LearningPathModel : Model<LearningPath>
    @InjectModel('ChatGptResponse') private readonly ChatGptResponseModel: Model<ChatGptResponseDocument>,

  ) {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openAiApi = new OpenAIApi(configuration);
  }

  async saveQuizResponse(lecture_id: string, questions: any[]) {
    const formattedQuestions = questions.map((question) => ({
      num: question.num,
      question_text: question.question_text, // Use 'text' from your JSON data
      options: question.options.map((option) => ({
        ans: option.ans,
        isCorrect: option.isCorrect,
      })),
    }));
  
    // Create an instance of the QuizResponse schema with the correct structure
    const formattedResponse = new this.QuizResponseModel({
      lecture_id,
      questions: formattedQuestions,
    });
  
    try {
      const savedResponse = await formattedResponse.save();
      return savedResponse;
    } catch (error) {
      this.logger.error('Error saving to the database: ', error);
    }
  }

  async getModelAnswer(input: GetAiModelQuiz, num: string) {
    try {
      const course = input.course_id;
      let lectureWebsite1: string | undefined;
      let lectureWebsite2: string | undefined;

      const courseDocument = await this.ChatGptResponseModel.findOne(
        { 'lectureDetails._id': course },
        { 'lectureDetails.$': 1 }
      );

      console.log('courseDocument:', courseDocument);

      if (courseDocument && courseDocument.lectureDetails && courseDocument.lectureDetails.length > 0) {
        const lectureDetails = courseDocument.lectureDetails[0];
        lectureWebsite1 = lectureDetails.lectureWebsite1;
        lectureWebsite2 = lectureDetails.lectureWebsite2;
      } else {
        console.error('Document not found in the database or lectureDetails is empty.');
      }

      const getScrapedContent = async (): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
          const pythonProcess = spawn(
            'python3',
            ['/Users/manitachawyotha/PycharmProjects/pythonProject2/main.py', lectureWebsite1, lectureWebsite2]
          );
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
            } else {
              console.error(`Python script exited with code ${code}`);
              reject(new Error(`Python script exited with code ${code}`));
            }
          });
        });
      };

      // Wait for the completion of getScrapedContent before proceeding
      const scrapedContent = await getScrapedContent();

  //     const params: CreateCompletionRequest = {
  //       prompt: `generate ${num} quizes, Provide data in this JSON format only [{
  //         "num": "1",
  //         "question": "",
  //         "options": [
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""}
  //         ]
  //     },
  //     {
  //         "num": "2",
  //         "question": "",
  //         "options": [
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""}
  //         ]
  //     },
  //     {
  //         "num": "3",
  //         "question": "",
  //         "options": [
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""}
  //         ]
  //     },
  //     {
  //         "num": "4",
  //         "question": "",
  //         "options": [
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""}
  //         ]
  //     },
  //     {
  //         "num": "5",
  //         "question": "",
  //         "options": [
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""},
  //             {"ans": "", "isCorrect": ""}
  //         ]
  //     }
  // ], An array of questions. Each question should have a num, a question, and an array of options, where each option has an ans (answer) and an isCorrect flag to indicate if it's the correct answer in the topic of ${scrapedContent}`,
  //       model: input.getModelId(),
  //       temperature: input.getTemperature(),
  //       max_tokens: input.getMaxTokens(),
  //     };

      const params: CreateCompletionRequest = {
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
          } else {
            this.logger.error('Invalid quiz data format in the answer text:', answerText);
          }
        } else {
          this.logger.error('Invalid quiz details format in the answer text:', answerText);
        }
      } else {
        return response.data;
      }
    } catch (error) {
      this.logger.error('Error processing user request: ', error);
      throw error;
    }
  }

async getScrapedContent(htmlContent: string): Promise<string> {
  try {
    // console.log('Received HTML content in service:', htmlContent);
    return htmlContent;
  } catch (error) {
    console.error('Error getting scraped content:', error);
    throw error;
  }
}

answerText1: `[
  {
    "num": "1",
    "question": "What is the capital of France?",
    "options": [
      {"ans": "Berlin", "isCorrect": "False"},
      {"ans": "Paris", "isCorrect": "True"},
      {"ans": "Madrid", "isCorrect": "False"}
    ]
  },
  {
    "num": "2",
    "question": "Which planet is known as the Red Planet?",
    "options": [
      {"ans": "Earth", "isCorrect": "False"},
      {"ans": "Mars", "isCorrect": "True"},
      {"ans": "Venus", "isCorrect": "False"}
    ]
  },
  {
    "num": “3”,
    "question": "Which planet is known as the Red Planet?",
    "options": [
      {"ans": "Earth", "isCorrect": "False"},
      {"ans": "Mars", "isCorrect": "True"},
      {"ans": "Venus", "isCorrect": "False"}
    ]
  },
  {
    "num": “4”,
    "question": "Which planet is known as the Red Planet?",
    "options": [
      {"ans": "Earth", "isCorrect": "False"},
      {"ans": "Mars", "isCorrect": "True"},
      {"ans": "Venus", "isCorrect": "False"}
    ]
  },
  {
    "num": “5”,
    "question": "Which planet is known as the Red Planet?",
    "options": [
      {"ans": "Earth", "isCorrect": "False"},
      {"ans": "Mars", "isCorrect": "True"},
      {"ans": "Venus", "isCorrect": "False"}
    ]
  },
]`

async parseQuizDetails(answerText1: string) {
  const QuizDetails = [];
  let currentQuestion: any = {};

  try {
    const parsedData = JSON.parse(answerText1);
    const questions = parsedData.questions;
    this.logger.debug(questions);

    if (Array.isArray(questions)) {
      questions.forEach((item: any, index: number) => {
        const num = item.num || (index + 1).toString();
        const question = item.question || '';
        const options = item.options || [];

        if (typeof num === 'string' && typeof question === 'string' && Array.isArray(options)) {
          QuizDetails.push({
            num,
            question,
            options: options.map((option: any) => ({
              ans: option.ans || '',
              isCorrect: option.isCorrect || 'False',
            })),
          });
        } else {
          this.logger.error('Invalid quiz data format in the answer text:', questions);
        }
      });
    } else {
      this.logger.error('Invalid quiz details format in the answer text:', questions);
    }
  } catch (error) {
    this.logger.error('Error parsing quiz details:', error);
  }

  return QuizDetails;
}

}