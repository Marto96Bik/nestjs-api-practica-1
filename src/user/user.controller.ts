import {
  Controller,
  Get,
  Body,
  Headers,
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
  async getUsersByUser(
    @Query('name') name: string,
    @Headers('authorization') token: string,
  ): Promise<User[]> {
    return await this.userService.getUsersByName(name, token);
  }

  @Get()
  async getUsers(@Headers('authorization') token: string): Promise<User[]> {
    return await this.userService.getUsers(token);
  }

  @Delete(':name')
  async deleteUser(
    @Param('name') name: string,
    @Headers('authorization') token: string,
  ) {
    return await this.userService.deleteUser(name, token);
  }

  @Patch(':name')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('name') name: string,
    @Body() updateData: userUpdateDto,
    @Headers('authorization') token: string,
  ) {
    return await this.userService.updateUser(name, token, updateData);
  }
}
