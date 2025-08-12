import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { userUpdateDto } from './dto/userUpdate.dto';

/*
Hacer tres endpoint con NestJS para crear, listar y eliminar usuarios.
Un usuario tiene nombre, email, password, fecha de nacimiento y estado.
*/

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.loginUser(userLoginDto);
  }
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async newUser(@Body() userDto: UserCreateDto): Promise<User> {
    return this.userService.newUser(userDto);
  }

  @Get(':search')
  async getUsersByUser(@Query('name') name: string): Promise<User[]> {
    return await this.userService.getUsersByName(name);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Delete(':name')
  async deleteUser(@Param('name') name: string): Promise<void> {
    return await this.userService.deleteUser(name);
  }

  @Patch(':name')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('name') name: string,
    @Body() updateData: userUpdateDto,
  ): Promise<void> {
    return await this.userService.updateUser(name, updateData);
  }
}
