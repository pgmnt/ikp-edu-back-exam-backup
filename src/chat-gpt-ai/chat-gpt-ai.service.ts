//chat-gpt-ai.service
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { GetAiModelAnswer } from './model/get-ai-model-answer';
import { ChatGptResponseDocument } from './chat-gpt-ai.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatGptAiService {
  private readonly openAiApi: OpenAIApi;
  private readonly logger: Logger = new Logger(ChatGptAiService.name);

  constructor(
    @InjectModel('ChatGptResponse') private readonly ChatGptResponseModel: Model<ChatGptResponseDocument>,
  ) {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openAiApi = new OpenAIApi(configuration);
  }
  
  async extractDescriptionAndRequirements(input: string): Promise<{ description: string, requirements: string }> {
    try {
      // Initialize variables to store the description and requirements
      let description = '';
      let requirements = '';
  
      // Split the input text into lines
      const lines = input.split('\n');
      // Use a flag to determine if we are currently parsing the description or requirements
      let isParsingDescription = true;
  
      for (const line of lines) {
        // Check if the line contains "Description of the course:"
        if (line.includes("Description") && isParsingDescription) {
              description += line + '\n';
          continue; // Skip this line
        } else if (line.includes("Requirements:")) {
          isParsingDescription = false;
          if(!isParsingDescription){
            requirements += line + '\n';
          }
          continue; // Skip this line
        }
  
        // If we are parsing the description, add the line to the description text
        // if (isParsingDescription) {
        //     console.log('hello' , line)
        //   description += line + '\n';
        // } else {
          // If we are parsing the requirements, add the line to the requirements text
        //   requirements += line + '\n';
        // }
      }
  
      // Remove leading and trailing whitespace
      description = description.trim();
      requirements = requirements.trim();
  
      return { description, requirements };
    } catch (error) {
      this.logger.error('Error extracting description and requirements: ', error);
      throw error;
    }
  }

  
  async getModelAnswer(input: GetAiModelAnswer) {
    try {
      const params: CreateCompletionRequest = {
        prompt: "generate course outlines and guide users step by step, Do list the number of lecture, name of lecture and each lecture provide me the website link that I can learn -" + input.question + "In this format Course Outline - Name of the course, Description of the course, Requirements, Lecture number of lecture: name of lecture, description: description, website: website link to be in the form /Lecture (\d+): (.*), Description: (.*), Website: (https:\/\/\S+)/ ",
        model: input.getModelId(),
        temperature: input.getTemperature(),
        max_tokens: input.getMaxTokens(),
      };
  
      const response = await this.openAiApi.createCompletion(params);
  
      const { data } = response;
      if (data.choices.length) {
        const answerText = data.choices[0].text;

  
        // Extract description and requirements using the provided function
        const { description, requirements } = await this.extractDescriptionAndRequirements(answerText);
  
        // Parse lecture details from the answer text
        const lectureDetails = this.parseLectureDetails(answerText);
  
        if (lectureDetails.length > 0) {
          // Save lecture details to the database
          const resData = await this.saveGptResponse(input.question, answerText, input.getModelId(), description, input.level,
          input.category, requirements, lectureDetails);
  
          // Log the lecture details
          // this.logger.log('Lecture Details:', resData);
          return resData;
        } else {
          this.logger.error('No valid lecture details found in the answer text:', answerText);
        }
      } else {
        return response.data;
      }
    } catch (error) {
      this.logger.error('Error processing user request: ', error);
      throw error;
    }
  }
  
  

  parseLectureDetails(answerText: string) {
    const lectureDetails: ChatGptResponseDocument['lectureDetails'] = [];
    const lines = answerText.split('\n');
    let currentLecture: any = {};
  
    for (const line of lines) {
      const lectureMatch = line.match(/Lecture (\d+): (.*), Description: (.*), Website: (https:\/\/\S+)/);
      if (lectureMatch) {
        const [_,lectureNumber, lectureTitle, lectureDescription, lectureWebsite] = lectureMatch;
        currentLecture = {
          lectureNumber,
          lectureTitle,
          lectureDescription,
          lectureWebsite,
        };
        lectureDetails.push(currentLecture);
      } else if (currentLecture && line.trim() === "") {
        // If a blank line is encountered, reset currentLecture
        currentLecture = {};
      }
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
        lectureWebsite: lecture.lectureWebsite,
      })),
    });
  
    try {
      const Gptresponse = await formattedResponse.save();
      return Gptresponse
    } catch (error) {
      this.logger.error('Error saving to the database: ', error);
    }
  }
  

  async listModels() {
    try {
      const models = await this.openAiApi.listModels();
      return models.data;
    } catch (error) {
      this.logger.error('Error listing models: ', error);
      throw error;
    }
  }

  async get_Course(id : string){
      try{
          const response = await this.ChatGptResponseModel.findById(id)
          if(!response){  
            return { msg : 'ไม่พบข้อมูล'}
          }
          return response

      }catch(error){
          console.log(error)
          throw error
      }
  }

  async deleteLearningPath(courseId: string, lectureId: string) {
    try {
      // Implement the logic to delete the learning path or lecture by its courseId and lectureId
      const result = await this.ChatGptResponseModel.updateOne(
        { '_id': courseId },
        { $pull: { lectureDetails: { '_id': lectureId } } },
      );

      if (!result) {
        throw new NotFoundException('Learning path or lecture not found');
      }
    } catch (error) {
      this.logger.error('Error deleting learning path or lecture: ', error);
      throw error;
    }
  }

}



