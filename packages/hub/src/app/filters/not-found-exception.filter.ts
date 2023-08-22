import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import * as path from 'path';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(_exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const staticPath = this.configService.get('settings.staticPath');
    if (staticPath) {
      return response.sendFile(
        path.join(path.resolve(staticPath), 'index.html')
      );
    }
  }
}
