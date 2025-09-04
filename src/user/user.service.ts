import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { userUpdateDto } from './dto/userUpdate.dto';
import { generateRandomToken } from 'src/utils/token.util';
import { UserDao } from './user.dao';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async validateToken(token: string): Promise<boolean> {
    const user = await this.userDao.validateToken(token);
    const today = new Date();

    if (user?.tokenDate) {
      const diffMin =
        Math.abs(today.getTime() - user.tokenDate.getTime()) / 60000;
      console.log(diffMin);
      if (diffMin > 5) {
        throw new ForbiddenException('Debe logearse para realizar esta accion');
      }
    } else {
      throw new ForbiddenException('Debe logearse para realizar esta accion');
    }
    return true;
  }

  async loginUser(userLoginDto: UserLoginDto) {
    const user = await this.userDao.getUser({
      email: userLoginDto.email,
    });

    if (userLoginDto.password !== user.password) {
      throw new UnauthorizedException('Password incorrecto');
    }

    const newToken = generateRandomToken();
    return await this.userDao.login(user, newToken);
  }

  async newUser(userDto: UserCreateDto): Promise<User> {
    return await this.userDao.newUser(userDto);
  }

  async getUsers(token: string): Promise<User[]> {
    await this.validateToken(token);
    return await this.userDao.getUsersList();
  }

  async getUsersByName(name: string, token: string): Promise<User[]> {
    await this.validateToken(token);
    const user = await this.userDao.getUsersList(name);
    if (!user) {
      throw new NotFoundException('No se encontro el usuario');
    }
    return user;
  }

  async deleteUser(name: string, token: string) {
    await this.validateToken(token);
    return await this.userDao.deleteUser(name);
  }

  async updateUser(
    name: string,
    token: string,
    updateData: userUpdateDto,
  ): Promise<void> {
    await this.validateToken(token);
    await this.userDao.updateUser({ name, updateData });
  }
}
