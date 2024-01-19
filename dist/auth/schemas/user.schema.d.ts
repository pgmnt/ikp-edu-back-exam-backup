import mongoose from 'mongoose';
import { enroll } from './enroll.schema';
export declare class User {
    name: string;
    email: string;
    password: string;
    role: string;
    birth: Date;
    gender: string;
    occupation?: string;
    enroll: enroll[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
}>;
