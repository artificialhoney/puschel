import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { ValidationError } from 'class-validator';
import express from 'express';
import * as http from 'http';
import { ConfigService } from 'nestjs-config';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app/app.module';

export default async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
    {
      bufferLogs: false,
    }
  );
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    })
  );
  app.use(express.json({ limit: '50mb' }));
  await app.init();

  const port = app.get(ConfigService).get('settings.port');
  http.createServer(server).listen(port);
  app.get(Logger).log(`xx started on http port [${port}]`);
}

bootstrap();
