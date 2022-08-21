import { Injectable } from '@nestjs/common';
import IJwtConfig from 'src/types/jwt-config.interface';
import { IJwtPayload } from 'src/types/jwt-payload.interface';
import { IJwtService } from 'src/types/jwt-service.interface';
import { sign, Algorithm, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtConfig: IJwtConfig) { }

  async signAsync(payload: IJwtPayload): Promise<string> {
    const plain = {
      displayName: payload.displayName,
    };
    
    return new Promise((resolve, reject) => {
      sign(
        plain,
        this.jwtConfig.privateKey,
        {
          algorithm: this.jwtConfig.algorithm as Algorithm,
          audience: this.jwtConfig.audience,
          expiresIn: this.jwtConfig.expiresIn,
          issuer: this.jwtConfig.issuer,
        },
        (err, encoded) => {
          if (err) {
            return reject(err);
          }

          return resolve(encoded);
        });
    });
  }

  async verifyAsync(token: string): Promise<IJwtPayload> {
    return new Promise((resolve, reject) => {
      verify(
        token,
        this.jwtConfig.publicKey || this.jwtConfig.privateKey,
        {
          algorithms: [this.jwtConfig.algorithm as Algorithm],
          audience: this.jwtConfig.audience,
          issuer: this.jwtConfig.issuer,
        },
        (err, payload) => {
          if (err) {
            return reject(err);
          }

          return resolve(payload as IJwtPayload);
        }
      )
    });
  }
}
