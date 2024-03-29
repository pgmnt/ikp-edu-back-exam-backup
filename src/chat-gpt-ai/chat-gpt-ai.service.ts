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
        if (line.includes("Description:") && isParsingDescription) {
          description += line + '\n';
        } else if (line.includes("Requirement:")) {
          isParsingDescription = false;
          requirements += line + '\n';
        }
        // } else {
        //   // If we are parsing the description, add the line to the description text
        //   if (isParsingDescription) {
        //     description += line + '\n';
        //   } else {
        //     // If we are parsing the requirements, add the line to the requirements text
        //     requirements += line + '\n';
        //   }
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
  
  // async extractDescriptionAndRequirements(input: string): Promise<{ description: string, requirements: string }> {
  //   try {
  //     // Initialize variables to store the description and requirements
  //     let description = '';
  //     let requirements = '';
  
  //     // Split the input text into lines
  //     const lines = input.split('\n');
  
  //     // Use a flag to determine if we are currently parsing the description or requirements
  //     let isParsingDescription = true;
  
  //     for (const line of lines) {
  //       // Check if the line contains "Description:" (with or without lecture indication)
  //       if (line.includes("Description:") && isParsingDescription) {
  //         description += line.replace("Description:", '').trim() + '\n';
  //       } else if (line.includes("Requirement:")) {
  //         isParsingDescription = false;
  //         requirements += line.replace("Requirement:", '').trim() + '\n';
  //       } else if (line.startsWith("Lecture")) {
  //         // Skip lecture lines
  //         continue;
  //       } else if (line.trim() !== "") {
  //         // Add non-empty lines to either description or requirements
  //         if (isParsingDescription) {
  //           description += line.trim() + '\n';
  //         } else {
  //           requirements += line.trim() + '\n';
  //         }
  //       }
  //     }
  
  //     // Remove leading and trailing whitespace
  //     description = description.trim();
  //     requirements = requirements.trim();
  
  //     return { description, requirements };
  //   } catch (error) {
  //     this.logger.error('Error extracting description and requirements: ', error);
  //     throw error;
  //   }
  // }
  

  
  async getModelAnswer(input: GetAiModelAnswer) {
    try {
      const params: CreateCompletionRequest = {
        prompt: "generate course outlines and guide users step by step, Do list the number of lecture, name of lecture and each lecture provide me exactly 2 website links in each lecture that I can learn -" + input.question + "In this format Course Outline - Name of the course, Description: description of the course, Requirement: requirement of the course, Lecture number of lecture: name of lecture, description: description, website1: website1, website2: website2  link to be in the form /Lecture (\d+): (.*), Description: (.*), Website: (https:\/\/\S+)/ ",        model: input.getModelId(),
        temperature: input.getTemperature(),
        max_tokens: input.getMaxTokens(),
      };

      const response = await this.openAiApi.createCompletion(params);
  
      const { data } = response;
      if (data.choices.length) {
        const answerText = data.choices[0].text;

        this.logger.log('Lecture Details:', answerText);

  
        // Extract description and requirements using the provided function
        const { description, requirements } = await this.extractDescriptionAndRequirements(answerText);
  
        // Parse lecture details from the answer text
        const lectureDetails = this.parseLectureDetails(answerText);
  
        if (lectureDetails.length > 0) {
          // Save lecture details to the database
          const resData = await this.saveGptResponse(input.question, answerText, input.getModelId(), description, input.level,
          input.category, requirements, lectureDetails);
  
          // Log the lecture details
          return resData;
        } else {
          this.logger.error('No valid lecture details found in the answer text:', answerText);
        }
      } else {
        console.log(response.data)
        return response.data;
      }
    } catch (error) {
      this.logger.error('Error processing user request: ', error);
      throw error;
    }
  }


//   parseLectureDetails(answerText: string) {
//     const lectureDetails: ChatGptResponseDocument['lectureDetails'] = [];
//     const lines = answerText.split('\n');
//     let currentLecture: any = {};
  
//     for (const line of lines) {
//       // const lectureMatch = line.match(/Lecture (\d+): (.*), Description: (.*), Website 1: (https:\/\/\S+), Website 2: (https:\/\/\S+)/);
//       const lectureMatch = line.match(/Lecture (\d+): (.*), Description: (.*)\nWebsite 1: (https:\/\/\S+)\nWebsite 2: (https:\/\/\S+)/);
//       if (lectureMatch) {
//         const [_,lectureNumber, lectureTitle, lectureDescription, lectureWebsite1, lectureWebsite2] = lectureMatch;
//         currentLecture = {
//           lectureNumber,
//           lectureTitle,
//           lectureDescription,
//           lectureWebsite1,
//           lectureWebsite2
//         };
//         lectureDetails.push(currentLecture);
//       } else if (currentLecture && line.trim() === "") {
//         // If a blank line is encountered, reset currentLecture
//         currentLecture = {};
//       }
//     }
  
//     return lectureDetails;
//   }

//   parseLectureDetails(answerText: string) {
//     const lectureDetails: ChatGptResponseDocument['lectureDetails'] = [];
//     const lines = answerText.split('\n');
//     let currentLecture: any = {};

//     for (const line of lines) {
//         const lectureMatch = line.match(/Lecture (\d+): (.*)/);
//         if (lectureMatch) {
//             const [_, lectureNumber, lectureTitle] = lectureMatch;
//             currentLecture = {
//                 lectureNumber,
//                 lectureTitle,
//                 lectureDescription: "",  // No description provided in the course outline
//             };
//             lectureDetails.push(currentLecture);
//         } else if (line.startsWith("Description:")) {
//             // Add the lecture description to the current lecture
//             currentLecture.lectureDescription = line.replace("Description:", "").trim();
//         } else if (line.startsWith("Website")) {
//             // Add the lecture website to the current lecture
//             const websiteMatch = line.match(/Website \d+: (https:\/\/\S+)/);
//             if (websiteMatch) {
//                 const [, website] = websiteMatch;
//                 currentLecture[`lectureWebsite${currentLecture.lectureWebsite ? 2 : 1}`] = website;
//             }
//         } else if (currentLecture && line.trim() === "") {
//             // If a blank line is encountered, reset currentLecture
//             currentLecture = {};
//         }
//     }

//     return lectureDetails;
// }

parseLectureDetails(answerText: string) {
  const lectureDetails: ChatGptResponseDocument['lectureDetails'] = [];
  const lines = answerText.split('\n');
  let currentLecture: any = {};

  for (const line of lines) {
    const lectureMatch = line.match(/Lecture (\d+): (.*)/);
    if (lectureMatch) {
      const [_, lectureNumber, lectureTitle] = lectureMatch;
      currentLecture = {
        lectureNumber,
        lectureTitle,
        lectureDescription: "",  // No description provided in the course outline
        lectureWebsite1: "",     // Initialize website1
        lectureWebsite2: "",     // Initialize website2
      };
      lectureDetails.push(currentLecture);
    } else if (line.startsWith("Description:")) {
      // Add the lecture description to the current lecture
      currentLecture.lectureDescription = line.replace("Description:", "").trim();
    } else if (line.startsWith("Website")) {
      // Add the lecture website to the current lecture
      const websiteMatch = line.match(/Website \d+: (https:\/\/\S+)/);
      if (websiteMatch) {
        const [, website] = websiteMatch;
        if (!currentLecture.lectureWebsite1) {
          currentLecture.lectureWebsite1 = website;
        } else if (!currentLecture.lectureWebsite2) {
          currentLecture.lectureWebsite2 = website;
        }
      }
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
        lectureWebsite1: lecture.lectureWebsite1,
        lectureWebsite2: lecture.lectureWebsite2
      })),
    });
  
    try {
      // this.logger.log('Saving to the database: ', formattedResponse);
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

  async AddLearningPath(courseId: string, lectureDetails: any[]) {
    try {
      // Use courseId directly without wrapping it in an object
      const findCourseOutline = await this.ChatGptResponseModel.findById(courseId);
  
      if (!findCourseOutline) {
        return { msg: 'Course not found' };
      }
  
      // Assuming lectureDetails is an array of objects with lecture information
      for (const lecture of lectureDetails) {
        const newLearningPath = {
          lectureNumber: lecture.lectureNumber,
          lectureTitle: lecture.lectureTitle,
          lectureWebsite1: lecture.lectureWebsite1,
          lectureWebsite2: lecture.lectureWebsite2,
        };
  
        findCourseOutline.lectureDetails.push(newLearningPath);
      }
  
      await findCourseOutline.save();
  
      return { msg: 'Lectures added successfully' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

    split_lecture(answerText) {
        console.log(answerText)
    const lines = answerText.split('\n');
    let splitData = lines[lines.length-1].split(' - ');
   
    let lectureTitle = splitData[0].trim();
    let website = splitData[1].trim();
    return { 
      lectureTitle : lectureTitle,
      lectureWebsite : website
    }
  }

  async regenLearningPath(input: GetAiModelAnswer){
      try{
          const params: CreateCompletionRequest = {
          prompt: "generate lectureTitle lectureWebsite , lecture provide me the website link that I can learn " + input.question + "In this format lectureTitle : (.*) - lectureWebsite :(https:\/\/\S+)/  ",
          model: input.getModelId(),
          temperature: input.getTemperature(),
          max_tokens: input.getMaxTokens(),
        };
        const response = await this.openAiApi.createCompletion(params);
        const { data } = response;
        if(data.choices.length){
          const answerText = data.choices[0].text;
          const response = this.split_lecture(answerText)
          return response
        }else{
          this.logger.error('err');

        }

      }catch(err){
        this.logger.error(err);
      }
  }

}





