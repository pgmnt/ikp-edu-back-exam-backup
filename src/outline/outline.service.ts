import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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


  async SaveCourse(dataCourse: any) {
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
          // exams.forEach((exam: any) => {
          //   exam['_id'] = new mongoose.Types.ObjectId();
          // })
        } else {
          outline = JSON.parse(data.outline)
        }
      })



      outline['examination'] = exams
      quizList.forEach((data: any, index: number) => {
        outline.lectureDetails[index][`quiz`] = data

      })
      
     console.log(quizList , '>>>>>>')

      try {
        const examDict = { examination: exams }
        const exam_child = await Promise.all(examDict.examination.map(async (data) => {
          const newExam = new this.ExamModel(data)
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
              const newquiz = new this.QuizModel(quizSave);
        
              // Save the new quiz to the database
              await newquiz.save();

        
              // Push the ObjectId of the saved quiz to the newlecture.quiz array
              newlecture.quiz.push(newquiz._id);
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
          examination : exam_child
        })   
          console.log(newOutline) 
          await newOutline.save()
        return { msg: 'Complete'  , data : newOutline._id }


      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)

    }
  }



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
  
  
}



