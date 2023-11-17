import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Course } from './schemas/course.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course.name)
        private courseModel: mongoose.Model<Course>,
    ) { }

    async findAll(query: Query): Promise<Course[]> {
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword
            ? {
                title: {
                    $regex: query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const courses = await this.courseModel
            .find({ ...keyword })
            .limit(resPerPage)
            .skip(skip);
        return courses;
    }

    async create(course: Course, user: User): Promise<Course> {
        const data = Object.assign(course, { user: user._id });

        const res = await this.courseModel.create(data);
        return res;
    }

    async findById(id: string): Promise<Course> {
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('Please enter correct id.');
        }

        const course = await this.courseModel.findById(id);

        if (!course) {
            throw new NotFoundException('Course not found.');
        }

        return course;
    }

    async updateById(id: string, course: Course): Promise<Course> {
        return await this.courseModel.findByIdAndUpdate(id, course, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Course> {
        return await this.courseModel.findByIdAndDelete(id);
    }


    async addcoe(dataCourse: any) {
        try{
            const quizList: Array<any> = []
        let exams = {}
        let outline: any = {}

        dataCourse.forEach((data: any) => {
            const keys: string = Object.keys(data)[0];
            if (keys.includes('quiz')) {
                quizList.push(JSON.parse(data[keys]))
            } else if (keys === 'exam') {
                exams = JSON.parse(data.exam)
            } else {
                outline = JSON.parse(data.outline)
            }
        })

        outline['exam'] = exams
        quizList.forEach((data: any, index: number) => {
            outline.lectureDetails[index][`quiz${index + 1}`] = data
        })

        
        }catch(err){
                console.log(err)
        }
    }
}
