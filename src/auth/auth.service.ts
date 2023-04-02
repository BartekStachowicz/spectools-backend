import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ExistingUserDTO, UserInfo } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async passwordEncryption(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    return passwordHashed;
  }

  async login(
    user: ExistingUserDTO,
  ): Promise<{ token: string; expiresIn: number; userId: string } | null> {
    const { username, password } = user;
    const existingUser = await this.isValidate(username, password);
    if (!existingUser) return null;
    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt, expiresIn: 14400, userId: existingUser.id };
  }

  async isPasswordTrue(
    passwordHashed: string,
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHashed);
  }

  async isValidate(
    username: string,
    password: string,
  ): Promise<UserInfo | null> {
    try {
      const user = await this.usersService.findByName(username);
      const isExisting = !!user;
      const isPasswordTrue = await this.isPasswordTrue(user.password, password);
      if (!isPasswordTrue || !isExisting) return null;

      return this.usersService.getUserInfo(user);
    } catch {
      throw new UnauthorizedException('Invalid password or username!');
    }
  }
}
