import { hash as bryptHash, compare as bcryptCompare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class HashService {
  private bcryptSaltRounds: number;

  constructor(private readonly configurationService: ConfigurationService) {}

  async hash(input: string): Promise<string> {
    const rounds =
      this.bcryptSaltRounds ||
      (await this.configurationService.read().bcryptSaltRounds);
    return bryptHash(input, rounds);
  }

  async compare(plainText: string, hashed: string): Promise<boolean> {
    return bcryptCompare(plainText, hashed);
  }
}
