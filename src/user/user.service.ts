import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { userUpdateDto } from './dto/userUpdate.dt';

@Injectable()
export class UserService {
  private usersList: User[] = [];

  newUser(userDto: UserCreateDto) {
    const newUser = User.create(
      userDto.name,
      userDto.email,
      userDto.password,
      userDto.birthdate,
      userDto.state,
      userDto.isDeleted,
    );
    this.usersList.push(newUser);
    return newUser;
  }

  getUsers(): User[] {
    return this.usersList;
  }

  getUsersByName(name: string): User[] {
    return this.usersList.filter((u) => u.name === name);
  }

  deleteUser(name: string): boolean {
    const user = this.usersList.find((u) => (user.name = name));
    let result = false;
    if (user) {
      user.isDeleted = true;
      result = true;
    }
    return result;
  }

  loginUser(userLoginDto: UserLoginDto): boolean {
    const user = this.usersList.find(
      (u) =>
        u.email === userLoginDto.email && u.password === userLoginDto.password,
    );
    return !!user;
  }

  updateUser(name: string, updateData: userUpdateDto): User {
    const user = this.usersList.find((u) => u.name === name);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (updateData.email) user.email = updateData.email;
    if (updateData.password) user.password = updateData.password;
    if (updateData.birthdate) user.birthdate = updateData.birthdate;
    if (updateData.status) user.status = updateData.status;

    return user;
  }
}
