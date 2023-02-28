import { IsString, IsInt, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
