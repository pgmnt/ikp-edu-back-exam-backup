import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Outline } from './schemas/outline.schema';
import { LearningPath } from './schemas/learningPath.schema';
import { Examination } from 'src/exam/schemas/exam.schema';
import { Quizmodel } from './schemas/quiz.schemas';

@Injectable()
export class OutlineService {
  constructor(
    @InjectModel('Outline') private  OutlineModel: Model<Outline>,
    @InjectModel('LearningPath') private  LearningPathModel: Model<LearningPath>,
    @InjectModel('Examination') private ExamModel: Model<Examination>,
    @InjectModel('Quizmodel') private QuizModel: Model<Quizmodel>,
  ) { }


    async deleteCourse(outline : any ){
      try {
        // 1. หา Outline ที่ต้องการลบ
        const outlines = await this.OutlineModel.findById(outline).exec();
        
  
        // 2. ถ้าไม่พบ Outline, ไม่ต้องทำอะไร
        if (!outlines) {
          console.log(`Outline with ID ${outlines} not found.`);  
          return;
        }
        // 3. ลบ Outline
        await outlines.deleteOne();
        //  // 8. ลบทุก examination
         const examinationIdsToDelete = outlines.examination;
         if (examinationIdsToDelete && examinationIdsToDelete.length > 0) {
           await this.ExamModel.deleteMany({ _id: { $in: examinationIdsToDelete } }).exec();
         }
  
        // 4. ลบ LearningPath (lectureDetails) ทั้งหมด
        const learningPathIdsToDelete = outlines.lectureDetails.map((learningPath) =>  learningPath);
  
        // // 5. ถ้ามี LearningPath ที่ต้องการลบ, ให้ลบทุก LearningPath
        if (learningPathIdsToDelete && learningPathIdsToDelete.length > 0) {
          // 6. สำหรับทุก LearningPath, ลบทุก quiz และ examination
          for (const learningPathId of learningPathIdsToDelete) {
            const learningPath = await this.LearningPathModel.findById(learningPathId).exec();
  
            if (learningPath) {
              // 7. ลบทุก quiz
              const quizIdsToDelete = learningPath.quiz;
              if (quizIdsToDelete && quizIdsToDelete.length > 0) {
                await this.QuizModel.deleteMany({ _id: { $in: quizIdsToDelete } }).exec();
              }
            }
          }
          await this.LearningPathModel.deleteMany({ _id: { $in: learningPathIdsToDelete } }).exec();
        }
        console.log(`Outline with ID ${outlines._id} and associated LearningPath, quizzes, and examinations deleted successfully.`);
        
        const data = { msg: 'complete'};
        return data
        
      } catch (error) {
        console.error(error);
      }
    }



  async SaveCourse(dataCourse: any,name : string) {
    try {
      const quizList: Array<any> = []
      let exams = []
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



      outline['examination'] = exams
      quizList.forEach((data: any, index: number) => {
        outline.lectureDetails[index][`quiz`] = data
      })

      await this.deleteCourse(outline._id)

        const examDict = { examination : exams }
        const exam_child = await Promise.all(examDict.examination.map(async (data) => {
          const newExam = new this.ExamModel({
              num : data.num,
              question_text : data.question_text,
              options : data.options,
          })
          await newExam.save()
          return newExam
        }))

        const lectureDetailsDict = outline.lectureDetails;
        let implementLecture = []
        for (let lectureDetail of lectureDetailsDict) {
          if (lectureDetail) {
            const newlecture = new this.LearningPathModel({
                lectureNumber : lectureDetail.lectureNumber, 
                lectureTitle : lectureDetail.lectureTitle,
                lectureWebsite : lectureDetail.lectureWebsite
            });

           if(lectureDetail.quiz){
            for (let quizSave of lectureDetail.quiz) {
              const newquiz = new this.QuizModel({
                    num : quizSave.num,
                    question_text :quizSave.question_text,
                    options : quizSave.options
              });
        
              // Save the new quiz to the database
             const quizchild = await newquiz.save();
              // Push the ObjectId of the saved quiz to the newlecture.quiz array
              newlecture.quiz.push(quizchild);
            }
          }else{
              console.log('empty')
          }
        
            // Save the new lecture to the database after all quizzes are saved
            const res = await newlecture.save();
            implementLecture.push(res)

          } else {
            console.error('lectureDetail.quiz is either undefined or an empty array.');
          }
          
        }

        // Now lecture_child is an array of resolved promises
        
        const newOutline = new this.OutlineModel({
          question : outline.question,
          description : outline.description,
          requirement  :outline.requirement,
          lectureDetails : implementLecture,
          examination : exam_child,
          author : name
        })   
          await newOutline.save()
        return { msg: 'Complete'  , data : newOutline._id }

     
    } catch (error) {
      console.log(error)

    }
  }


//  Get preview
  async getid(id: string) {
    try {
      const findPreview = await this.OutlineModel
        .findById(id)
        .populate({
          path: 'lectureDetails',
          populate: { path: 'quiz', model: 'Quizmodel' },
        })
        .populate('examination');

  
      if (!findPreview) {
        return Error;
      }
      return findPreview;
    } catch (err) {
      console.log(err);
    }
  }

    //  Get all outline 
  async Getall_outline(){
      try{
          const getAlloutline = await this.OutlineModel.find()
          return getAlloutline

      }catch(err){
          console.log(err)
      }
  }
  // EditOutline
async EditOutline(id : string){
    try{
            const getAlloutline = await this.OutlineModel.findById(id).populate({
              path: 'lectureDetails',
              populate: { path: 'quiz', model: 'Quizmodel' },
            })
            .populate('examination');
             if(getAlloutline){
                console.log(getAlloutline)
                return getAlloutline
            }else{
                return { message : 'Not Found'}
            }
    }catch(err){
        console.log(err)
    }
}


async EditNewOutline(dataCourse : any){
      try{

      const quizList: Array<any> = []
      let exams = []
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
      outline['examination'] = exams
      quizList.forEach((data: any, index: number) => {
        outline.lectureDetails[index][`quiz`] = data
      })

      const outlineObjectId = new Types.ObjectId(outline._id);

      // Delete the main Outline document
      await this.OutlineModel.deleteOne({ _id: outlineObjectId });

      // Delete related LearningPath documents
      await this.LearningPathModel.deleteMany({ outline: outlineObjectId });

      // Delete related Exam documents
      await this.ExamModel.deleteMany({ outline: outlineObjectId });
      
        
      }catch(err){
          console.log(err)
      }
}

async Publish(id : string){
    try{
      const findId = await this.OutlineModel.findOneAndUpdate(
        { _id: id },
        { publish: true },
        { new: true, validateBeforeSave: true }
      );
      if(!findId){
          return { msg : 'Not found!'}
      }
      return { msg : 'Complete'}

      
    }catch(err){
        console.log(err)
    }
}

  
}



