import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { sub } = request.user;

    return sub;
  },
);
