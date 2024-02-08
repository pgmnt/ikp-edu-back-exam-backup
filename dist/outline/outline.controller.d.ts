/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { OutlineService } from './outline.service';
export declare class OutlineController {
    private outlineService;
    constructor(outlineService: OutlineService);
    SaveCourse(dataCourse: string): Promise<{
        msg: string;
        data: import("mongoose").Types.ObjectId;
    }>;
    Getall_outline(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/outline.schema").Outline> & import("./schemas/outline.schema").Outline & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    EditOutline(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/outline.schema").Outline> & import("./schemas/outline.schema").Outline & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        message: string;
    }>;
    EditNewOutline(dataCourse: string): Promise<void>;
    deleteCourse(id: string): Promise<{
        msg: string;
    }>;
    Publish(id: string): Promise<{
        msg: string;
    }>;
    getid(id: string): Promise<ErrorConstructor | (import("mongoose").Document<unknown, {}, import("./schemas/outline.schema").Outline> & import("./schemas/outline.schema").Outline & {
        _id: import("mongoose").Types.ObjectId;
    })>;
}
