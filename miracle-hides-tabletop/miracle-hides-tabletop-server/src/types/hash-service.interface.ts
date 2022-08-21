export interface IHashService {
  compareAsync(input: string, hash: string): Promise<boolean>;

  hashAsync(input: string): Promise<string>;
}

export const HASH_SERVICE = 'HASH_SERVICE';
