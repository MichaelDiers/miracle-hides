import BaseLanguage from './base-language';

export default class DeLanguage extends BaseLanguage {
  constructor() {
    super(
      'de',
      {
        rsaPage: {
          headline: 'RSA Generator'
        }
      });
  }
}
