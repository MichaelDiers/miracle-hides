import KeyType from '../../../src/core/interfaces/data/key-type.enum';

describe('KeyTypeDto', () => {
  it('should be defined', () => {
    expect(KeyType.Rsa).toBeDefined();
  });
});
