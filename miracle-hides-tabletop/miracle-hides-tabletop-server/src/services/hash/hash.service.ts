import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { IHashService } from '../../types/hash-service.interface';

@Injectable()
export class HashService implements IHashService {
  constructor(private readonly rounds) {
  }

  async compareAsync(input: string, hash: string): Promise<boolean> {
    try {
      const result = await compare(input, hash);
      return result;
    } catch (err) {
      return false;
    }
  }

  async hashAsync(input: string): Promise<string> {
    return hash(input, this.rounds);
  }
}

export const DEFAULT_HASH_SERVICE_ROUNDS = 10;

export const HASH_SERVICE_ROUNDS = 'HASH_SERVICE_ROUNDS';
