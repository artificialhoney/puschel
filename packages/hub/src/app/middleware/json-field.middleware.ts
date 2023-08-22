import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const jsonFieldMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn
) => {
  const value = await next();
  return value && JSON.parse(value);
};
