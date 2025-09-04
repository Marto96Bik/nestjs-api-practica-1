import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsDateString,
  IsBoolean,
  IsOptional,
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
}
