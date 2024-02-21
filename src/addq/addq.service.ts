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

  async getModelAnswer(input: GetAiModelQuiz, num: string) {
    try {
      const course = input.lecture_id;
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

      const scrapedContent = await getScrapedContent();

      const params: CreateCompletionRequest = {
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

        // console.log('Received JSON Data:', data.choices[0].text);

        const answerText = data.choices[0].text;
        // this.logger.log('Received JSON Data:', answerText);

        const quizDetails = await this.parseQuizDetails(answerText);
        if (quizDetails.length) {

          const resData = await this.saveQuizResponse("1", num, quizDetails);
          return resData;
          // } else {
          //   this.logger.error('Invalid quiz data format in the answer text:', answerText);
          // }
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

  parseQuizDetails(answerText: string) {
    this.logger.log("answerText", answerText);
    const quizDetails: { num: string; question: string; options: Array<{ ans: string; isCorrect: boolean }> }[] = [];
    let currentQuestion: any = {};
  
    const lines = answerText.split('\n');
  
    for (const line of lines) {
      const numMatch = line.match(/Num: (\d+)/);
      if (numMatch) {
        const [, num] = numMatch;
        currentQuestion = {
          num,
          question: '',
          options: [],
        };
        quizDetails.push(currentQuestion);
      } else if (line.startsWith("Question:")) {
        currentQuestion.question = line.replace("Question:", "").trim();
      } else if (line.startsWith("Options:")) {
        for (let i = lines.indexOf(line) + 1; i < lines.length; i++) {
          const ansMatch = lines[i].match(/ans: (.*), isCorrect: (True|False),/);
          if (ansMatch) {
            const [, ans, isCorrect] = ansMatch;
            currentQuestion.options.push({ ans, isCorrect: isCorrect === 'True' });
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

    this.logger.log('quizDetails: ', quizDetails);

    const formattedQuestions = new this.QuizResponseModel({
      lecture_id,
      // questions: quizDetails.map((questionGroup) => ({
      // num: questionGroup.num,
      num,
      questions: quizDetails.map((question) => ({
        question: question.question,
        options: question.options.map((option) => ({
          ans: option.ans,
          isCorrect: option.isCorrect
        }))
      })),
      // })),
    });


    this.logger.log('formattedQuestions', JSON.stringify(formattedQuestions, null, 2));

    try {
      const savedResponse = await formattedQuestions.save();
      return savedResponse;
    } catch (error) {
      this.logger.error('Error saving to the database: ', error);
    }
  }

}

