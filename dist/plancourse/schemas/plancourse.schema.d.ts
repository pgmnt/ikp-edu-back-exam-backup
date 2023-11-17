import mongoose from 'mongoose';
export declare enum Category {
    PROGRAMMING = "Programming",
    GRAPHIC = "Graphic"
}
export declare enum Level {
    LV1 = "Easy",
    LV2 = "Hard"
}
export declare class Plans {
    title: string;
    description: string;
    level: Level;
}
export declare const CourseSchema: mongoose.Schema<Plans, mongoose.Model<Plans, any, any, any, mongoose.Document<unknown, any, Plans> & Plans & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Plans, mongoose.Document<unknown, {}, mongoose.FlatRecord<Plans>> & mongoose.FlatRecord<Plans> & {
    _id: mongoose.Types.ObjectId;
}>;
