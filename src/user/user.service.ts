import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { userUpdateDto } from './dto/userUpdate.dt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  private usersList: User[] = [];

  async newUser(userDto: UserCreateDto): Promise<User> {
    const newUser = this.userRepo.create(userDto);
    return await this.userRepo.save(newUser);
    /* const newUser = User.create(
      userDto.name,
      userDto.email,
      userDto.password,
      userDto.birthdate,
      userDto.state,
      userDto.isDeleted,
    );
    this.usersList.push(newUser);
    return newUser;
    */
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async getUsersByName(name: string): Promise<User[]> {
    /*return this.usersList.filter((u) =>
      u.name.toLowerCase().includes(name.toLowerCase()),
    );*/
    return await this.userRepo.find({
      where: { name: Like(`%${name}%`) },
    });
  }

  deleteUser(name: string): boolean {
    const user = this.usersList.find((u) => (u.name = name));
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
