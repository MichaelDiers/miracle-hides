import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from 'src/types/jwt-payload.interface';

export const Payload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IJwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.payload;
  },
);