/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
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
        data: import("mongoose").Types.ObjectId;
    }>;
    getid(id: string): Promise<(import("mongoose").Document<unknown, {}, Outline> & Outline & {
        _id: import("mongoose").Types.ObjectId;
    }) | ErrorConstructor>;
}
