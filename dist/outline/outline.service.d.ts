import { Model } from 'mongoose';
import { Examination } from 'src/exam/schemas/exam.schema';
import { Quizmodel } from './schemas/quiz.schemas';
export declare class OutlineService {
    private readonly OutlineModel;
    private readonly LearningPathModel;
    private ExamModel;
    private QuizModel;
    constructor(OutlineModel: Model<any>, LearningPathModel: Model<any>, ExamModel: Model<Examination>, QuizModel: Model<Quizmodel>);
    SaveCourse(dataCourse: any): Promise<{
        msg: string;
        data: any;
    }>;
    getid(id: string): Promise<any>;
}
