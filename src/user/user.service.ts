import { Injectable } from '@nestjs/common';
import { User } from './user';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {

    private usersList : User[] = [];

    newUser(userDto: UserDto){
        const newUser = new User(userDto.name, userDto.email, userDto.password, userDto.birthdate, userDto.state);
        this.usersList.push(newUser);
        return newUser;
    }

    getUsers(): User[]{
        return this.usersList;
    }

    deleteUser(name: String) : boolean {
    let response: boolean = false;
    const index = this.usersList.findIndex(u => u.name === name);
    
    if(index !== -1) {
        this.usersList.splice(index, 1);
        response = true;
    }
    
    return response;
    }
}
