import { User } from '../../auth/schemas/user.schema';
import { Level, Category } from '../schemas/course.schema';
export declare class UpdateCourseDto {
    readonly title: string;
    readonly description: string;
    readonly level: Level;
    readonly category: Category;
    readonly user: User;
}
