//chat-gpt-ai.service
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
import { GetAiModelAnswer } from "./model/get-ai-model-answer";
import { ChatGptResponseDocument } from "./chat-gpt-ai.model";
// import { ChatGptResponseDocument } from "./chat-gpt-ai.model";

@Injectable()
export class ChatGptAiService {
  private readonly openAiApi: OpenAIApi;
  private readonly logger: Logger = new Logger(ChatGptAiService.name);

  constructor(
    @InjectModel("ChatGptResponse")
    private ChatGptResponseModel: Model<ChatGptResponseDocument>
  ) {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openAiApi = new OpenAIApi(configuration);
  }

  async extractDescriptionAndRequirements(
    input: string
  ): Promise<{ description: string; requirements: string }> {
    try {
      // Initialize variables to store the description and requirements
      let description = "";
      let requirements = "";

      // Split the input text into lines
      const lines = input.split("\n");

      // Use a flag to determine if we are currently parsing the description or requirements
      let isParsingDescription = true;

      for (const line of lines) {
        // Check if the line contains "Description of the course:"
        if (
          line.includes("Summary:") ||
          (line.includes("Summary:\n") && isParsingDescription)
        ) {
          description += line + "\n";
        } else if (
          line.includes("Requirement:") ||
          line.includes("Requirements:\n")
        ) {
          isParsingDescription = false;
          requirements += line + "\n";
        }
      }

      // Remove leading and trailing whitespace
      description = description.trim();
      requirements = requirements.trim();

      return { description, requirements };
    } catch (error) {
      this.logger.error(
        "Error extracting description and requirements: ",
        error
      );
      throw error;
    }
  }

  levelPrompt(input: GetAiModelAnswer) {
    let params: CreateCompletionRequest;
    switch (input.level) {
      case "Beginner":
        params = {
          prompt:
            "generate course outlines and guide users step by step, Do list the number of lecture, name of lecture and each lecture provide me exactly 2 website links in each lecture that I can learn - focusing on " +
            input.question +
            " within the context of Software Engineering and App Development. Ensure that the lecture provides a challenging and insightful experience for learner - Difficulty: Beginner (Keyword to generate lectures: Understanding basic syntax and program structure,Learning variables, data types, and basic operations,Implementing simple algorithms and conditional statements,Basic input/output and user interaction,Introduction to debugging and error handling), In this format Course Outline - Name of the course, Summary: summary of the course no new line, Requirement: requirement of the course no new line, Lecture number of lecture: name of lecture, description: description new line, website1: website1 new line, website2: website2 new line link to be in the form /Lecture (d+): (.), Description: (.), Website: (https://S+)/ if no website found in lecture or N/A cut that lecture out",
          model: input.getModelId(),
          temperature: input.getTemperature(),
          max_tokens: input.getMaxTokens(),
        };
        break;
      case "Intermediate":
        params = {
          prompt:
            "generate course outlines and guide users step by step, Do list the number of lecture, name of lecture and each lecture provide me exactly 2 website links in each lecture that I can learn - focusing on " +
            input.question +
            " within the context of Software Engineering and App Development. Ensure that the lecture provides a challenging and insightful experience for learner - Difficulty: Intermediate (Keyword: Mastery of control flow structures (loops, conditionals),Understanding functions/methods and parameter passing,Introduction to data structures (arrays, lists),File I/O and exception handling,Object-oriented programming concepts (classes, objects, inheritance)), In this format Course Outline - Name of the course, Summary: summary of the course no new line, Requirement: requirement of the course no new line, Lecture number of lecture: name of lecture, description: description new line, website1: website1 new line, website2: website2 new line link to be in the form /Lecture (d+): (.), Description: (.), Website: (https://s+%29/ if no website found in lecture or N/A cut that lecture out",
          model: input.getModelId(),
          temperature: input.getTemperature(),
          max_tokens: input.getMaxTokens(),
        };
        break;
      case "Advanced":
        params = {
          prompt:
            "generate course outlines and guide users step by step, Do list the number of lecture, name of lecture and each lecture provide me exactly 2 website links in each lecture that I can learn - focusing on " +
            input.question +
            " within the context of Software Engineering and App Development. Ensure that the lecture provides a challenging and insightful experience for learner - Difficulty: Advanced (Keyword: Proficient understanding of data structures,Advanced algorithms and problem-solving skills,Multithreading and concurrency concepts,Database interaction and manipulation,Development frameworks), In this format Course Outline - Name of the course, Summary: summary of the course no new line, Requirement: requirement of the course no new line, Lecture number of lecture: name of lecture, description: description new line, website1: website1 new line, website2: website2 new line link to be in the form /Lecture (d+): (.), Description: (.), Website: (https://s+%29/ if no website found in lecture or N/A cut that lecture out",
          model: input.getModelId(),
          temperature: input.getTemperature(),
          max_tokens: input.getMaxTokens(),
        };
        break;
    }
    return params;
  }

  async getModelAnswer(input: GetAiModelAnswer) {
    const params = this.levelPrompt(input);
    try {
      const response = await this.openAiApi.createCompletion(params);

      const { data } = response;
      if (data.choices.length) {
        const answerText = data.choices[0].text;

        // const answerText
        this.logger.log("Lecture Details:", answerText);

        // Extract description and requirements using the provided function
        const { description, requirements } =
          await this.extractDescriptionAndRequirements(answerText);

        // Parse lecture details from the answer text
        const lectureDetails = this.parseLectureDetails(answerText);

        if (lectureDetails.length > 0) {
          // Save lecture details to the database
          const resData = await this.saveGptResponse(
            input.question,
            answerText,
            input.getModelId(),
            description,
            input.level,
            input.category,
            requirements,
            lectureDetails
          );

          // Log the lecture details
          return resData;
        } else {
          this.logger.error(
            "No valid lecture details found in the answer text:",
            answerText
          );
        }
      } else {
        return response.data;
      }
    } catch (error) {
      this.logger.error("Error processing user request: ", error);
      throw error;
    }
  }

  parseLectureDetails(answerText: string) {
    const lectureDetails: ChatGptResponseDocument["lectureDetails"] = [];
    const lines = answerText.split("\n");
    let currentLecture: any = {};

    for (const line of lines) {
      const lectureMatch = line.match(/Lecture (\d+): (.*)/);
      if (lectureMatch) {
        const [_, lectureNumber, lectureTitle] = lectureMatch;
        currentLecture = {
          lectureNumber,
          lectureTitle,
          lectureDescription: "", // No description provided in the course outline
          lectureWebsite1: "", // Initialize website1
          lectureWebsite2: "", // Initialize website2
        };
      } else if (
        (currentLecture.lectureNumber && line.startsWith("Description:")) ||
        line.startsWith("Description:\n")
      ) {
        // Add the lecture description to the current lecture
        currentLecture.lectureDescription = line
          .replace("Description:", "")
          .trim();
      } else if (
        (currentLecture.lectureNumber && line.startsWith("Website")) ||
        line.startsWith("Website\n")
      ) {
        // Add the lecture website to the current lecture
        const websiteMatch =
          line.match(/Website \d+: (https:\/\/\S+)/) ||
          line.match(/Website\d+: (https:\/\/\S+)/);
        if (websiteMatch) {
          const [, website] = websiteMatch;
          if (!currentLecture.lectureWebsite1) {
            currentLecture.lectureWebsite1 = website;
          } else if (!currentLecture.lectureWebsite2) {
            currentLecture.lectureWebsite2 = website;
          }
        }
      } else if (currentLecture.lectureNumber && line.trim() === "") {
        // If a blank line is encountered, reset currentLecture

        // Skip the lecture if either website is "N/A" or ""
        if (
          !(
            currentLecture.lectureWebsite1 === "N/A" ||
            currentLecture.lectureWebsite1 === "" ||
            currentLecture.lectureWebsite2 === "N/A" ||
            currentLecture.lectureWebsite2 === ""
          )
        ) {
          lectureDetails.push(currentLecture);
        }

        currentLecture = {};
      }
    }

    // Add the last lecture if it should not be skipped
    if (
      currentLecture.lectureNumber &&
      !(
        currentLecture.lectureWebsite1 === "N/A" ||
        currentLecture.lectureWebsite1 === "" ||
        currentLecture.lectureWebsite2 === "N/A" ||
        currentLecture.lectureWebsite2 === ""
      )
    ) {
      lectureDetails.push(currentLecture);
    }

    return lectureDetails;
  }

  async saveGptResponse(
    question,
    answer,
    modelId,
    description,
    level,
    category,
    requirement,
    lectureDetails
  ) {
    const formattedResponse = new this.ChatGptResponseModel({
      question,
      answer,
      modelId,
      description,
      level,
      category,
      requirement,
      lectureDetails: lectureDetails.map((lecture: any) => ({
        lectureNumber: lecture.lectureNumber,
        lectureTitle: lecture.lectureTitle,
        lectureWebsite: [lecture.lectureWebsite1 ,lecture.lectureWebsite2 ],
        lectureDescription: lecture.lectureDescription,
      })),
    });
    try {
      const GptResponse = await formattedResponse.save();
      return GptResponse;
    } catch (error) {
      this.logger.error("Error saving to the database: ", error);
    }
  }

  async listModels() {
    try {
      const models = await this.openAiApi.listModels();
      return models.data;
    } catch (error) {
      this.logger.error("Error listing models: ", error);
      throw error;
    }
  }

  async get_Course(id: string) {
    try {
      const response = await this.ChatGptResponseModel.findById(id);
      if (!response) {
        return { msg: "ไม่พบข้อมูล" };
      }
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteLearningPath(courseId: string, lectureId: string) {
    try {
      // Implement the logic to delete the learning path or lecture by its courseId and lectureId
      const result = await this.ChatGptResponseModel.updateOne(
        { _id: courseId },
        { $pull: { lectureDetails: { _id: lectureId } } }
      );

      if (!result) {
        throw new NotFoundException("Learning path or lecture not found");
      }
    } catch (error) {
      this.logger.error("Error deleting learning path or lecture: ", error);
      throw error;
    }
  }

  // async AddLearningPath(courseId: string, lectureDetails: any[]) {
  //   try {
  //     // Use courseId directly without wrapping it in an object
  //     const findCourseOutline = await this.ChatGptResponseModel.findById(courseId);

  //     if (!findCourseOutline) {
  //       return { msg: 'Course not found' };
  //     }

  //     // Assuming lectureDetails is an array of objects with lecture information
  //     for (const lecture of lectureDetails) {
  //       const newLearningPath = {
  //         lectureNumber: lecture.lectureNumber,
  //         lectureTitle: lecture.lectureTitle,
  //         lectureWebsite1: lecture.lectureWebsite1,
  //         lectureWebsite2: lecture.lectureWebsite2,
  //       };

  //       findCourseOutline.lectureDetails.push(newLearningPath);
  //     }

  //     await findCourseOutline.save();

  //     return { msg: 'Lectures added successfully' };
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }

  split_lecture(answerText) {
    console.log(answerText);
    const lines = answerText.split("\n");
    let splitData = lines[lines.length - 1].split(" - ");

    let lectureTitle = splitData[0].trim();
    let website = splitData[1].trim();
    return {
      lectureTitle: lectureTitle,
      lectureWebsite: website,
    };
  }

  async regenLearningPath(input: GetAiModelAnswer) {
    try {
      const params: CreateCompletionRequest = {
        prompt:
          "generate lectureTitle lectureWebsite , lecture provide me the website link that I can learn " +
          input.question +
          "In this format lectureTitle : (.*) - lectureWebsite :(https://S+)/  ",
        model: input.getModelId(),
        temperature: input.getTemperature(),
        max_tokens: input.getMaxTokens(),
      };
      const response = await this.openAiApi.createCompletion(params);
      const { data } = response;
      if (data.choices.length) {
        const answerText = data.choices[0].text;
        const response = this.split_lecture(answerText);
        return response;
      } else {
        this.logger.error("err");
      }
    } catch (err) {
      this.logger.error(err);
    }
  }
}
