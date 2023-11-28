//addq.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { LearningPath } from 'src/outline/schemas/learningPath.schema';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { QuizResponseDocument } from './addq.model';
import { GetAiModelQuiz } from './model/get-quiz-model-answer';

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
    ) {
      const configuration = new Configuration({
        organization: process.env.ORGANIZATION_ID,
        apiKey: process.env.OPENAI_API_KEY,
      });
      this.openAiApi = new OpenAIApi(configuration);
    }
    
  // async addquiz(id : string) {
  //   const findLearinng = await this.LearningPathModel.findById(id)
  //   if(!findLearinng){
  //       return { msg : 'ไม่พบข้อมูล'}
  //   }
  //   const newAddq = new this.addqModel({
  //     question : '' ,
  //     choice : [] ,
  //     ans : []
  //   })
  //   await newAddq.save()
  //   findLearinng.addq.push(newAddq)
  //   await findLearinng.save()
  //   return { msg : 'บันทึกสำเร็จ'}
  // }

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
  

  async getModelAnswer(input: GetAiModelQuiz , num : string) {
    try {
      const params: CreateCompletionRequest = {
        prompt: `generate ${num} quizes, Provide an example of data in JSON format for a lecture with a lecture_id and an array of questions. Each question should have a num, a question_text, and an array of options, where each option has an ans (answer) and an isCorrect flag to indicate if it's the correct answer in the topic of ${input.question}`,
        model: input.getModelId(),
        temperature: input.getTemperature(),
        max_tokens: input.getMaxTokens(),
      };
  
      // const response = await this.openAiApi.createCompletion(params);
      const response = await this.openAiApi.createCompletion(params);
      
  
      this.logger.log('Raw Response from ChatGPT:', response.data.choices[0].text); // Log the raw response text here
  
      const { data } = response;
      if (data.choices.length) {
        const answerText = data.choices[0].text;
        this.logger.log('Received JSON Data:', answerText);

        const quizData = JSON.parse(answerText);
        if (quizData.lecture_id && quizData.questions) {
          const resData = await this.saveQuizResponse(quizData.lecture_id, quizData.questions);
          return resData;
        } else {
          this.logger.error('Invalid quiz data format in the answer text:', answerText);
        }
      } else {
        return response.data;
      }
    } catch (error) {
      this.logger.error('Error processing user request: ', error);
      throw error;
    }
  }
  

async parseQuizDetails(answerText: string) {
  const QuizDetails: QuizResponseDocument['questions'] = [];

  const regex = /"num": (\d+),\s+"question_text": "(.*?)",\s+"options": \[([^\]]+)\]/g;
  let match;

  while ((match = regex.exec(answerText)) !== null) {
    const num = parseInt(match[1]);
    const question_text = match[2];
    const optionsText = match[3];

    // Parse optionsText as an array of options
    const options: Array<{ ans: string; isCorrect: boolean }> = JSON.parse('[' + optionsText + ']');
    
    QuizDetails.push({
      num, // Include the "num" field
      question_text,
      options,
    });
  }

  return QuizDetails;
}


  



}