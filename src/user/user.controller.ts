import { Controller, Get, Body, Param, Post, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user'
import { UserDto } from './dto/user.dto';

/*
Hacer tres endpoint con NestJS para crear, listar y eliminar usuarios.
Un usuario tiene nombre, email, password, fecha de nacimiento y estado.
*/

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    newUser(@Body() userDto: UserDto) : User {
        return this.userService.newUser(userDto);
    }

    @Get()
    getUsers() : User[] {
        return this.userService.getUsers();
    }
    
    @Delete(':name')
    deleteUser(@Param('name') name: String) : Boolean {
        return this.userService.deleteUser(name);
    }
}
