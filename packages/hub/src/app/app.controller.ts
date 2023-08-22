import {
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  Res,
  UseFilters,
} from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import * as path from 'path';

import { AppService } from './app.service';
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';

@Controller('/')
@UseFilters(NotFoundExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Post('/auth/login')
  async login(@Request() req) {
    return this.appService.login(req.body.username, req.body.password);
  }

  @Get([
    '/settings',
    '/users',
    '/users/*',
    '/toys',
    '/plays',
    '/plays/*',
    '/auth/sign-in',
  ])
  ui(@Res() res) {
    const staticPath = this.configService.get('settings.staticPath');
    if (staticPath) {
      return res.sendFile(path.join(path.resolve(staticPath), 'index.html'));
    }
    throw new NotFoundException();
  }
}
