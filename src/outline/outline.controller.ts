import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { OutlineService } from "./outline.service";

@Controller("outline")
export class OutlineController {
  constructor(private outlineService: OutlineService) {}

  @Post("/add/:id")
  SaveCourse(
    @Body("dataCourse") dataCourse: string,
    @Param("id") name: string
  ) {
    return this.outlineService.SaveCourse(dataCourse, name);
  }

  @Get("")
  Getall_outline() {
    return this.outlineService.Getall_outline();
  }

  @Post("/get")
  EditOutline(@Body("id") id: string) {
    return this.outlineService.EditOutline(id);
  }

  @Post("/edit")
  EditNewOutline(@Body("dataCourse") dataCourse: string) {
    return this.outlineService.EditNewOutline(dataCourse);
  }

  @Delete("/:id")
  deleteCourse(@Param("id") id: string) {
    return this.outlineService.deleteCourse(id);
  }

  @Put("/publish/:id")
  Publish(@Param("id") id: string) {
    return this.outlineService.Publish(id);
  }

  @Post("/preview")
  getid(@Body("id") id: string) {
    return this.outlineService.getid(id);
  }
}
