import { Injectable } from '@nestjs/common';
import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt';
import { ConfigService } from '../config/config.service';

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}

  public async compare(
    plainText: string,
    hashedText: string,
  ): Promise<boolean> {
    return bcryptCompare(plainText, hashedText);
  }

  public async hash(plainText: string): Promise<string> {
    return bcryptHash(
      plainText,
      (await this.configService.readAsync()).hashSaltRounds,
    );
  }
}
