import CreateKeysRequestDto from '../../../src/core/dtos/create-keys-request.dto';

describe('CreateKeysRequestDto', () => {
  it('should be defined', () => {
    expect(new CreateKeysRequestDto()).toBeDefined();
  });
});
