import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { ADMIN_ID } from '../app.constants';

@Injectable()
export class UserActionGuard implements CanActivate {
  constructor(
    private readonly adminOnly: boolean = true,
    private readonly userOnly: boolean = false
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const id = ctx.getArgs().id;
    if (this.adminOnly) {
      return request.user.user_id === ADMIN_ID;
    } else if (this.userOnly) {
      return request.user.user_id !== ADMIN_ID;
    } else {
      return request.user.user_id === ADMIN_ID || id === request.user.user_id;
    }
  }
}
