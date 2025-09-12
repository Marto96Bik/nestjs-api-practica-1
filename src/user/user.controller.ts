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
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { userUpdateDto } from './dto/userUpdate.dto';
import { CustomInterceptor } from '../common/interceptors/custom-response.interceptor';
import { ResponseFormat } from '../common/decorators/response-format.decorator';
import { ExceptionsFilter } from 'src/common/exceptions/exceptions-filter.exception';

@Controller('users')
@UseInterceptors(CustomInterceptor)
@UseFilters(ExceptionsFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ResponseFormat('default')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.loginUser(userLoginDto);
  }
  @Post()
  @ResponseFormat('default')
  @UsePipes(new ValidationPipe({ transform: true }))
  async newUser(@Body() userDto: UserCreateDto): Promise<User> {
    return this.userService.newUser(userDto);
  }

  @Get(':search')
  @ResponseFormat('list')
  async getUsersByUser(
    @Query('name') name: string,
    @Headers('authorization') token: string,
  ): Promise<User[]> {
    return await this.userService.getUsersByName(name, token);
  }

  @Get()
  @ResponseFormat('list')
  async getUsers(@Headers('authorization') token: string): Promise<User[]> {
    return await this.userService.getUsers(token);
  }

  @Delete(':name')
  @ResponseFormat('default')
  async deleteUser(
    @Param('name') name: string,
    @Headers('authorization') token: string,
  ) {
    return await this.userService.deleteUser(name, token);
  }

  @Patch(':name')
  @ResponseFormat('default')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('name') name: string,
    @Body() updateData: userUpdateDto,
    @Headers('authorization') token: string,
  ) {
    return await this.userService.updateUser(name, token, updateData);
  }
}
