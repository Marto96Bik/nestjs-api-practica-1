import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Like } from 'typeorm';
import { User } from './user.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { userUpdateDto } from './dto/userUpdate.dto';

export class UserDao {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async validateToken(token: string): Promise<User> {
    const user = await this.getUser({ token });
    if (!user) {
      throw new ForbiddenException('Acceso denegado');
    }
    return user;
  }

  async login(user: User, newToken: string): Promise<string> {
    await this.entityManager.update(User, user.id, {
      token: newToken,
      tokenDate: new Date(),
    });
    return newToken;
  }

  async newUser(userDto: UserCreateDto): Promise<User> {
    if (
      await this.entityManager.findOne(User, {
        where: [
          { name: Like(`%${userDto.name}%`) },
          { email: Like(`%${userDto.email}%`) },
        ],
      })
    ) {
      throw new NotFoundException('Ya existe un usuario con estos datos');
    }
    const newUser = this.entityManager.create(User, userDto);
    return await this.entityManager.save(User, newUser);
  }

  async getUsersList(name?: string): Promise<User[]> {
    const user = await this.entityManager.find(User, { where: { name } });
    if (!user) {
      throw new NotFoundException('No se encontro ningun usuario');
    }
    return user;
  }

  async getUser({
    name,
    email,
    token,
  }: {
    name?: string;
    email?: string;
    token?: string;
  }) {
    const user = await this.entityManager.findOne(User, {
      where: [
        { name: Like(`%${name}%`) },
        { email: Like(`%${email}%`) },
        { token },
      ],
    });

    if (!user) {
      throw new NotFoundException('No existe el usuario');
    }
    return user;
  }

  async updateUser({
    name,
    updateData,
    token,
    tokenDate,
  }: {
    name: string;
    updateData?: userUpdateDto;
    token?: string;
    tokenDate?: Date;
  }) {
    const user = await this.getUser({ name });
    if (updateData) {
      await this.entityManager.update(User, user.id, {
        name: updateData.name,
        email: updateData.email,
        password: updateData.password,
        birthdate: updateData.birthdate,
        status: updateData.status,
        token,
        tokenDate,
      });
    }
  }

  async deleteUser(name: string) {
    const user = await this.getUser({ name });
    if (!user) {
      throw new NotFoundException(`No se encontro el usuario: ${name}`);
    }
    return await this.entityManager.update(User, user.id, { isDeleted: true });
  }
}
