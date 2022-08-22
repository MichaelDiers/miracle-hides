import { EMAIL_REGEX } from '../../validation/validation-constants';

const emailRegex = new RegExp(EMAIL_REGEX);

expect.extend({
  toBeAnEmail(received) {
    const pass = emailRegex.test(received);
    if (pass) {
      return {
        message: () =>
          `expected ${received} to be an invalid email`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be a valid email`,
        pass: false,
      };
    }
  },
});

test('email validation: valid emails 2', () => {
  // emails from https://gist.github.com/cjaoude/fd9910626629b53c4d25
  [
    'name@domain.com',
    'name@domain.io',
    'name@domain.business',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    'email@123.123.123.123',
    //'email@[123.123.123.123]',
    //'"email"@example.com',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com',
    'email@example.name',
    'email@example.museum',
    'email@example.co.jp',
    'firstname-lastname@example.com',
    'email@example.web',
  ].forEach((email) => {
    expect(email).toBeAnEmail();
  });
});

test('email validation: invalid emails', () => {
  // emails from https://gist.github.com/cjaoude/fd9910626629b53c4d25
  [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'あいうえお@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@example..com',
    'Abc..123@example.com',
    //'email@111.222.333.44444',
  ].forEach((email) => {
    expect(email).not.toBeAnEmail();
  });
});
