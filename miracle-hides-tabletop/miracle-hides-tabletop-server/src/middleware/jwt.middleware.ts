import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { IJwtService, JWT_SERVICE } from 'src/types/jwt-service.interface';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
  ){}
  async use(req: any, res: any, next: () => void) {
    const authorization = req?.headers?.authorization;
    if (!authorization) {
      return next();
    }

    const splitToken = authorization.split(' ');
    if (splitToken.length !== 2 || !splitToken[1]) {
      return next();
    }
    
    const token = splitToken[1];
    try {
      const payload = await this.jwtService.verifyAsync(token);
      req.payload = payload;
    } catch {
      throw new UnauthorizedException();
    }
        
    next();
  }
}
