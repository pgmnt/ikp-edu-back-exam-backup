import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { OutlineService } from './outline.service';

@Controller('outline')
export class OutlineController {
    constructor( private  outlineService: OutlineService) {}
    
//     Create_Outline(){
//             return this.outlineService.Create_Outline()
//     }
    @Post('/add')
    SaveCourse(@Body('dataCourse') dataCourse : string){
            return this.outlineService.SaveCourse(dataCourse)
    }

//     @Post('/lecture')
//     AddLecture(@Body('id') id : string){
//            return this.outlineService.AddLecture(id)
//     }

//     @Post('/learningP')
//     AddLearningPath(@Body('id') id : string){
//                 return this.outlineService.AddLearningPath(id)
//     }
//     @Delete('/learningP')
//     DeleteLearningPath(@Body('id') id : string){
//                 return this.outlineService.DeleteLearningPath(id)
//     }

@Post('/preview')
getid(@Body('id') id : string){
        return this.outlineService.getid(id)
}
}
