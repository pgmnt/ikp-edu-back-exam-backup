import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength, isString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly birth : string;

  @IsNotEmpty()
  @IsString()
  readonly gender : string;

  @IsNotEmpty()
  @IsString()
  readonly occupation : string;


}
