import { Model } from 'mongoose';
import { Examination } from './schemas/exam.schema';
export declare class ExamService {
    private ExamModel;
    constructor(ExamModel: Model<Examination>);
}
