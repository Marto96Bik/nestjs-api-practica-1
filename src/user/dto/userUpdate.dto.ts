import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class userUpdateDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
