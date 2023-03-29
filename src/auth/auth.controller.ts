import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ExistingUserDTO } from 'src/users/users.model';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() user: ExistingUserDTO,
  ): Promise<{ token: string; expiresIn: number; userId: string } | null> {
    return this.authService.login(user);
  }
}
