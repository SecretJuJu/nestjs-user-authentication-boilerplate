import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async registerUser(createUserDto: CreateUserDto): Promise<any> {
    const { username } = createUserDto;
    const findedUser = await this.usersService.findUser(username);

    if (findedUser !== null) {
      throw new ConflictException();
    }

    const user = await this.usersService.createUser(createUserDto);
    return user.username;
  }
}
