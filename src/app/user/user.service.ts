import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'src/schemas/user.schema';
import { createHashedPassword } from 'src/utils/user';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = createHashedPassword(createUserDto.password);
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findUser(username: string): Promise<User | null> {
    const findedUser = await this.userModel.findOne({
      username,
    });

    return findedUser;
  }
}
