import { IsString, IsInt, Min, Max, IsEmail, IsStrongPassword, IsDateString } from 'class-validator';

export class UserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsDateString()
    birthdate: string;

    @IsString()
    state: string;
}