import { UserEntity } from './user-entity.schema';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new UserEntity()).toBeDefined();
  });
});
