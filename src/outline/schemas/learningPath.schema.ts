import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Quizmodel } from './quiz.schemas';

@Schema({
    timestamps: true,
})
export class LearningPath {

    @Prop()
    lectureNumber: string;

    @Prop()
    lectureTitle: string;

    @Prop()
    lectureWebsite: string[];

    @Prop()
    lectureDescription: string;

    

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizmodel' }] })
    quiz: Quizmodel[];
}

export const LearningPathSchema = SchemaFactory.createForClass(LearningPath);
