import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  birthdate: string;

  @Column()
  status: boolean;

  @Column()
  isDeleted: boolean;

  public static create(
    name: string,
    email: string,
    password: string,
    birthdate: string,
    status: boolean,
    isDeleted: boolean,
  ): User {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.birthdate = birthdate;
    user.status = status;
    user.isDeleted = isDeleted;
    return user;
  }
}
