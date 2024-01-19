import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { Level, Category } from '../schemas/course.schema';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsEnum(Level, { message: 'Please enter correct level.' })
  readonly level: Level;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category.' })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
