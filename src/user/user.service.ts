import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { userUpdateDto } from './dto/userUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { generateRandomToken } from '../utils/token.util';

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

  async deleteUser(name: String): Promise<void> {
    //const user = this.usersList.find((u) => (u.name = name));
    const user = await this.userRepo.findOneBy({ name: Like(`%${name}%`) });

    if (user) {
      //user.isDeleted = true;
      await this.userRepo.update(user.id, { isDeleted: false });
    } else {
      throw new NotFoundException(`No se encontro el usuario: ${name}`);
    }
  }

  loginUser(userLoginDto: UserLoginDto): boolean {
    const user = this.usersList.find(
      (u) =>
        u.email === userLoginDto.email && u.password === userLoginDto.password,
    );
    user.token = generateRandomToken();
    user.tokenDate = new Date();
    await this.userRepository.save(user);
    return !!user;
  }

  async updateUser(name: string, updateData: userUpdateDto): Promise<void> {
    const user = await this.userRepo.findOneBy({ name: Like(`%${name}%`) });

    if (user) {
      await this.userRepo.update(user.id, {
        email: updateData.email,
        password: updateData.password,
        birthdate: updateData.birthdate,
        status: updateData.status,
      });
    } else {
      throw new NotFoundException(`No se encontro el usuario: ${name}`);
    }

    /*const user = this.usersList.find((u) => u.name === name);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (updateData.email) user.email = updateData.email;
    if (updateData.password) user.password = updateData.password;
    if (updateData.birthdate) user.birthdate = updateData.birthdate;
    if (updateData.status) user.status = updateData.status;

    return user;*/
  }
}
