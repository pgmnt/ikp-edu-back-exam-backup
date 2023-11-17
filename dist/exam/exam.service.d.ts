import { Model } from 'mongoose';
import { Examination } from './schemas/exam.schema';
import { Outline } from 'src/outline/schemas/outline.schema';
export declare class ExamService {
    private ExamModel;
    private OutlineModel;
    constructor(ExamModel: Model<Examination>, OutlineModel: Model<Outline>);
}
