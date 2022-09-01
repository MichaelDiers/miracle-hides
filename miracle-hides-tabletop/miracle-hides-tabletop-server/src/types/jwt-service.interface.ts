import { IJwtPayload } from './user.types';

export interface IJwtService {
  signAsync(payload: IJwtPayload): Promise<string>;
  verifyAsync(token: string): Promise<IJwtPayload>;
}

export const JWT_SERVICE = 'JWT_SERVICE';
