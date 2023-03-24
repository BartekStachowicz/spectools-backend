import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserInfo, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(
    username: string,
    passwordHashed: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({ username, password: passwordHashed });
    return newUser.save();
  }

  async findByName(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findByID(id: string): Promise<UserInfo | null> {
    const user = await this.userModel.findById({ id }).exec();
    if (!user) return null;

    return this.getUserInfo(user);
  }

  getUserInfo(user: UserDocument): UserInfo {
    return {
      id: user._id,
      username: user.username,
    };
  }
}
