import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { ConfigService } from 'nestjs-config';

import { ADMIN_USERNAME } from './app.constants';
import { UserService } from './services/user.service';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService
  ) {}

  async login(username: string, password: string) {
    const admin = username === ADMIN_USERNAME;
    if (admin) {
      if (
        crypto
          .createHash('md5')
          .update(password)
          .digest('hex')
          .toLowerCase() !==
        this.configService.get('settings.adminPassword').toLowerCase()
      ) {
        throw new BadRequestException();
      }
      return {
        access_token: this.jwtService.sign({ user_id: 0 }),
        user_id: 0,
      };
    } else {
      const user = await this.userService.findOneByUsername(username);
      if (!user) {
        throw new BadRequestException();
      }
      if (
        crypto
          .createHash('md5')
          .update(password)
          .digest('hex')
          .toLowerCase() !== user.password.toLowerCase()
      ) {
        throw new BadRequestException();
      }
      return {
        access_token: this.jwtService.sign({ user_id: user.id }),
        user_id: user.id,
      };
    }
  }
}
