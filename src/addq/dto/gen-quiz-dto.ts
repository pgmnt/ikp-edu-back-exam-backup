import {IsNotEmpty } from 'class-validator';

export class GenQuiz {
@IsNotEmpty()
webArray: string[];

}