import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Examination } from './schemas/exam.schema';
import { Outline } from 'src/outline/schemas/outline.schema';

@Injectable()
export class ExamService {

    constructor(
        @InjectModel('Exam') private ExamModel: Model<Examination>,
        @InjectModel('Outline') private OutlineModel: Model<Outline>,
      ) {}

    //   async Create_Exam (id : string){
    //         try{
    //             const findIDoflearningPath = await this.OutlineModel.findById(id)
    //             if(!findIDoflearningPath){
    //                 return { msg : 'ไม่พบข้อมูล'}
    //             }
    //             if(findIDoflearningPath.exam.length > 1) {
    //                     return findIDoflearningPath
    //             }
    //             for( let i = 0 ;  i < 5 ; i++){
    //                 const newExam = new this.ExamModel({
    //                     question : '',
    //                     choice : [],
    //                     ans : []
    //                 })
    //                 await newExam.save()
    //                 findIDoflearningPath.exam.push(newExam)
    //             }
    //          const res =    await findIDoflearningPath.save()
    //             return res
    //         }catch(err){
    //                 console.log(err)
    //                 throw err
    //         }
    //   }

    //   async Add_Exma(id : string){
    //     try{
    //         const findOutline = await this.OutlineModel.findById(id)
    //         if(!findOutline){
    //                 return { msg : 'ไม่พบข้อมูล'}
    //         }
    //         const newExam = new this.ExamModel({
    //             question : '',
    //             choice : [],
    //             ans : []
    //         })
    //         findOutline.exam.push(newExam)
    //         await findOutline.save()
    //     }catch(err){
    //             console.log(err)
    //             throw err
    //     }
    //   }

    //   async Delete_Exam(id: string) {
    //     try {
    //         const findOutline = await this.OutlineModel.findOne({ exam: id });
    //         if (!findOutline) {
    //             return { msg: 'ไม่พบข้อมูล' };
    //         }
    
    //         findOutline.exam = findOutline.exam.filter(exam => !exam._id.equals(id));
    //         await findOutline.save()
    //     } catch (err) {
    //         console.log(err);
    //         throw err;
    //     }
    // }
    
    
    
    
    
    
    

}
