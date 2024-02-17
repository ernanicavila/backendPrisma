import { IsString, IsNumber } from 'class-validator';

export class UserCreateDTO {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  email: string;
}
