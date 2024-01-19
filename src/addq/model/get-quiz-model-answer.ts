//get-quiz-model-answer.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

const DEFAULT_MODEL_ID  = "gpt-3.5-turbo-instruct"
const DEFAULT_TEMPERATURE = 0.9
const DEFAULT_MAX_TOKENS = 2048

export class GetAiModelQuiz{

    // @IsString()
    // @IsNotEmpty()
    // question:string

    @IsString()
    @IsOptional()
    course_id:string

    @IsString()
    @IsOptional()
    lecture_id:string

    // @IsString()
    // @IsNotEmpty()
    // choice : string[]; ;
  
    // @IsString()
    // @IsNotEmpty()
    // ans : number[]

    @IsString()
    @IsOptional()
    modelId:string

    @IsNumber()
    @IsOptional()
    temperature:number

    @IsNumber()
    @IsOptional()
    maxTokens:number

    // @IsString()
    // @IsNotEmpty()
    // lectureWebsite1 : string

    // @IsString()
    // @IsNotEmpty()
    // lectureWebsite2 : string

    private cleanModelId(modelId:string){
        if(modelId.includes(":")){
            return modelId.replace(":","-")
        }

        return modelId
    }

    getModelId(){
        return this.cleanModelId(this.modelId?this.modelId:DEFAULT_MODEL_ID)
    }

    getMaxTokens(){
        return this.maxTokens?this.maxTokens:DEFAULT_MAX_TOKENS
    }

    getTemperature(){
        return this.temperature?this.temperature:DEFAULT_TEMPERATURE
    }
}


