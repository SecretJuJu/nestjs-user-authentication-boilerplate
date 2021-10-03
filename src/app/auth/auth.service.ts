import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { checkPassword } from 'src/utils/user';
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

  async vaildateUser(username: string, password: string) {
    const user = await this.usersService.findUser(username);
    if (user && checkPassword(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
