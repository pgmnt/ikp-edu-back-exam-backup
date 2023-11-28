import mongoose, { Model } from 'mongoose';
import { Outline } from './schemas/outline.schema';
import { LearningPath } from './schemas/learningPath.schema';
import { Examination } from 'src/exam/schemas/exam.schema';
import { Quizmodel } from './schemas/quiz.schemas';
export declare class OutlineService {
    private OutlineModel;
    private LearningPathModel;
    private ExamModel;
    private QuizModel;
    constructor(OutlineModel: Model<Outline>, LearningPathModel: Model<LearningPath>, ExamModel: Model<Examination>, QuizModel: Model<Quizmodel>);
    SaveCourse(dataCourse: any): Promise<{
        msg: string;
        data: mongoose.Types.ObjectId;
    }>;
    getid(id: string): Promise<(mongoose.Document<unknown, {}, Outline> & Outline & {
        _id: mongoose.Types.ObjectId;
    }) | ErrorConstructor>;
}
