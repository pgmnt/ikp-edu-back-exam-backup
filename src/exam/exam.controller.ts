import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ExamService } from './exam.service';

@Controller('exam')
export class ExamController {
    constructor( private  examService: ExamService) {}

    // @Post()
    // Create_Exam(@Body('id') id : string){
    //     return this.examService.Create_Exam(id)
    // }
    // @Post(':id')
    // Add_Exma(@Param('id') id : string){ 
    //     return this.examService.Add_Exma(id)
    // }

    // @Delete(':id')
    // Delete_Exam(@Param('id') id : string){
    //     return this.examService.Delete_Exam(id)
            
    // }


}
