import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class Quizmodel {
    @Prop()
    num: string;

    @Prop()
    question_text: string;

    @Prop([{ ans: String, isCorrect: Boolean }])
    options: Array<{ ans: string; isCorrect: boolean }>;
}

export const QuizmodelSchema = SchemaFactory.createForClass(Quizmodel);
