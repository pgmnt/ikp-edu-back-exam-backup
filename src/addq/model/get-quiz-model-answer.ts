//get-quiz-model-answer.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

const DEFAULT_MODEL_ID  = "text-davinci-003"
const DEFAULT_TEMPERATURE = 0.9
const DEFAULT_MAX_TOKENS = 2048

export class GetAiModelQuiz{

    @IsString()
    @IsNotEmpty()
    question:string

    @IsString()
    @IsNotEmpty()
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
