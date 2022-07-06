import BaseLanguage from './base-language';

export default class DeLanguage extends BaseLanguage {
  constructor() {
    super(
      'de',
      {
        rsaPage: {
          headline: 'RSA Generator',
          keySize: 'Schlüssellänge',
          keySize1024: '1024',
          keySize2048: '2048',
          keySize4096: '4096',
          submit: 'Generieren',
          publicKey: 'Öffentlicher Schlüssel',
          publicKeyPlaceholder: 'noch kein Schlüssel generiert',
          privateKey: 'Privater Schlüssel',
          privateKeyPlaceholder: 'noch kein Schlüssel generiert',
        }
      });
  }
}
