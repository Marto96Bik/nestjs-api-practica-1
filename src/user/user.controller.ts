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
import { User } from './user';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { userUpdateDto } from './dto/userUpdate.dt';

/*
Hacer tres endpoint con NestJS para crear, listar y eliminar usuarios.
Un usuario tiene nombre, email, password, fecha de nacimiento y estado.
*/

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() userLoginDto: UserLoginDto): boolean {
    return this.userService.loginUser(userLoginDto);
  }
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  newUser(@Body() userDto: UserCreateDto): User {
    return this.userService.newUser(userDto);
  }

  @Get(':search')
  getUsersByUser(@Query('name') name: string): User[] {
    return this.userService.getUsersByName(name);
  }

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Delete(':name')
  deleteUser(@Param('name') name: string): boolean {
    return this.userService.deleteUser(name);
  }

  @Patch(':name')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateUser(
    @Param('name') name: string,
    @Body() updateData: userUpdateDto,
  ): User {
    return this.userService.updateUser(name, updateData);
  }
}
