//get-ai-model-answer.ts
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Level, Category } from '../schemas/chat-gpt-ai-schemas';

const DEFAULT_MODEL_ID  = "gpt-3.5-turbo-instruct"
const DEFAULT_TEMPERATURE = 0.9
const DEFAULT_MAX_TOKENS = 2048

export class GetAiModelAnswer{

    @IsString()
    @IsNotEmpty()
    question:string

    @IsString()
    @IsOptional()
    modelId:string

    @IsString()
    @IsOptional()
    description:string

    @IsNotEmpty()
    @IsEnum(Level, { message: 'Please enter correct level.' })
    readonly level: Level;
  
    @IsNotEmpty()
    @IsEnum(Category, { message: 'Please enter correct category.' })
    readonly category: Category;   
    
    @IsNotEmpty({message : 'Please enter sub1'})
    @IsString()
    readonly sub1: string;  

    @IsNotEmpty({message : 'Please enter sub1'})
    @IsString()
    readonly sub2: string;  

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