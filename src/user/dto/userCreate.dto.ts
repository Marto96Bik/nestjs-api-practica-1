import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class UserCreateDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsDateString()
  birthdate: string;

  @IsBoolean()
  state: boolean;

  @IsBoolean()
  isDeleted: boolean;
}
