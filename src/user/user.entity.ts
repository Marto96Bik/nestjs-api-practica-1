import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  birthdate: string;

  @Column({ default: true })
  status: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'text', nullable: true })
  token: string | null;

  @Column({ type: 'datetime', nullable: true })
  tokenDate: Date | null;

  public static create(
    name: string,
    email: string,
    password: string,
    birthdate: string,
    status?: boolean,
    isDeleted?: boolean,
    token?: string,
    tokenDate?: Date,
  ): User {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.birthdate = birthdate;
    if (status) user.status = status;
    if (isDeleted) user.isDeleted = isDeleted;
    if (token) user.token = token;
    if (tokenDate) user.tokenDate = tokenDate;
    return user;
  }
}
