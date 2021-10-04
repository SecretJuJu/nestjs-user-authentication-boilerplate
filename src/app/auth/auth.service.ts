import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';
import { checkPassword } from 'src/utils/user';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<any> {
    const { username } = createUserDto;
    const findedUser = await this.usersService.findUser(username);

    if (findedUser !== null) {
      throw new ConflictException();
    }

    const user = await this.usersService.createUser(createUserDto);
    return user.username;
  }

  async validateUser(username: string, password: string) {
    const user: User = await this.usersService.findUser(username);
    if (user && checkPassword(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
