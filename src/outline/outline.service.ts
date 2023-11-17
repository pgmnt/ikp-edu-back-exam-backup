import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Outline } from './schemas/outline.schema';
import { LearningPath } from './schemas/learningPath.schema';
import { Examination } from 'src/exam/schemas/exam.schema';
import { Quizmodel } from './schemas/quiz.schemas';

@Injectable()
export class OutlineService {
  constructor(
    @InjectModel('Outline') private OutlineModel: Model<Outline>,
    @InjectModel('LearningPath') private LearningPathModel: Model<LearningPath>,
    @InjectModel('Examination') private ExamModel: Model<Examination>,
    @InjectModel('Quizmodel') private QuizModel: Model<Quizmodel>,
  ) { }

  // async Create_Outline(): Promise<Outline> {
  //   try {
  //     const outlineData = new this.OutlineModel({
  //       thumbnail: '...',
  //       courseTitle: '...',
  //       courseCategory: '...',
  //       courseDescription: '...',
  //       requirements: '...',
  //       learningPaths: [],
  //     });
  //     const createdOutline = await outlineData.save();
  //     for (let i = 0; i < 3; i++) {
  //       const newLearningPaths = new this.LearningPathModel({
  //         topic_Name: '',
  //         lecture_detail: '',
  //         addq: [],
  //       });
  //       await newLearningPaths.save();
  //       createdOutline.learningPaths.push(newLearningPaths);
  //     }
  //     await createdOutline.save();
  //     return createdOutline;
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }



  // async Get_Outline(id: string) {
  //   try {
  //     const outline = await this.OutlineModel.findById(id)
  //       .populate('learningPaths')
  //       .exec();

  //     if (!outline) {
  //       return { msg: 'ไม่พบข้อมูล' };
  //     }
  //     return outline;
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }

  // async AddLecture(id: string) {
  //   try {
  //     const findItem = await this.LearningPathModel.findById(id);
  //     if (!findItem) {
  //       return { msg: 'ไม่พบข้อมูล' };
  //     }
  //     if (findItem.addq.length >= 1) {
  //       return findItem;
  //     }
  //     for (let i = 0; i < 5; i++) {
  //       const newAddq = new this.AddqModel({
  //         question: '',
  //         choice: [],
  //         ans: [],
  //       });
  //       await newAddq.save();
  //       findItem.addq.push(newAddq);
  //     }
  //     const res = await findItem.save();
  //     return res;
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }



  // async AddLearningPath(id: string) {
  //   try {
  //     const newLearningPath = new this.LearningPathModel({
  //       topic_Name: '',
  //       lecture_detail: '',
  //       addq: [],
  //     });

  //     await newLearningPath.save();

  //     const findLearningPath = await this.OutlineModel.findById(id);
  //     if (!findLearningPath) {
  //       return { msg: 'ไม่พบข้อมูล' };
  //     }

  //     findLearningPath.learningPaths.push(newLearningPath);
  //     await findLearningPath.save();
  //     return { msg: 'Complete' };
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }

  // async DeleteLearningPath(id: string) {
  //   try {
  //     const deletedLearningPath =
  //       await this.LearningPathModel.findByIdAndRemove(id);
  //     if (!deletedLearningPath) {
  //       return { msg: 'ไม่พบข้อมูล' };
  //     }
  //     const outlinesWithDeletedPath = await this.OutlineModel.findOne({
  //       learningPaths: id,
  //     });
  //     outlinesWithDeletedPath.learningPaths =
  //       outlinesWithDeletedPath.learningPaths.filter(
  //         (item) => !item.equals(id),
  //       );
  //     await outlinesWithDeletedPath.save();
  //     await this.AddqModel.deleteMany({
  //       _id: { $in: deletedLearningPath.addq },
  //     });
  //     return { msg: 'ลบข้อมูลสำเร็จ' };
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }

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



