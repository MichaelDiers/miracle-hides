export interface AsymmetricTranslation {
  headline: string;
}

export interface CommonTranslation {
  algorithm: string;
  algorithmAesShort: string;
  algorithmEcShort: string;
  algorithmHmacShort: string;
  algorithmRsaShort: string;
  asymmetricEncryption: string;
  generate: string;
  keySize: string;
  keySize128: string;
  keySize192: string;
  keySize256: string;
  keySize1024: string;
  keySize2048: string;
  keySize4096: string;
  language: string;
  licenses: string;
  miracleHidesKeys: string;
  namedCurve: string;
  namedCurveSect239k1: string;
  noKeyGenerated: string;
  privateKey: string;
  publicKey: string;
  submitGenerateKeys: string;
  symmetricEncryption: string;
  testInput: string;
  testInputPlaceholder: string;
  testInputEncrypted: string;
  testInputEncryptedPlaceholder: string;
  testInputDecrypted: string;
  testInputDecryptedPlaceholder: string;
  testInputValue: string;
  [key: string]: string;
}

export interface HeaderTranslation {
  asymmetricAlgorithms: string;
  symmetricAlgorithms: string;
}

export interface LicenseTranslation {
  licensesFonts: string;
  licensesNode: string;
  fontAuthor: string;
  fontFont: string;
  fontLicense: string;
  fontLink: string;
}

export interface SymmetricTranslation {
  headline: string;
}

export type Language = 'de' | 'en';

export const languageDe : Language = 'de';

export const languageEn : Language = 'en';

export interface Translation {
  asymmetric: AsymmetricTranslation;
  common: CommonTranslation;
  header: HeaderTranslation;
  license: LicenseTranslation;
  symmetric: SymmetricTranslation;
  name: Language;
}

export const translations : Translation[] = [
  {
    name: languageDe,    
    common: {
      algorithm: 'Algorithmus',
      algorithmAesShort: 'AES',
      algorithmEcShort: 'EC',
      algorithmHmacShort: 'HMAC',
      algorithmRsaShort: 'RSA',
      asymmetricEncryption: 'asymmetrische Verschlüsselung',
      generate: 'Generieren',
      keySize: 'Schlüssellänge',
      keySize128: '128',
      keySize192: '192',
      keySize256: '256',
      keySize1024: '1024',
      keySize2048: '2048',
      keySize4096: '4096',
      language: 'English',
      licenses: 'Lizenzen',
      miracleHidesKeys: 'Miracle Hides Keys',
      namedCurve: 'Named Curve',
      namedCurveSect239k1: 'sect239k1',
      noKeyGenerated: 'Noch kein Schlüssel generiert.',
      privateKey: 'Privater Schlüssel',
      publicKey: 'Öffentlicher Schlüssel',
      submitGenerateKeys: 'Schlüssel generieren',
      symmetricEncryption: 'symmetrische Verschlüsselung',
      testInput: 'Original Text',
      testInputPlaceholder: 'Der zu verschlüsselnde Text.',
      testInputEncrypted: 'Verschlüsselter Text oder Signatur',
      testInputEncryptedPlaceholder: 'Original Text in verschlüsselter Form oder Signatur.',
      testInputDecrypted: 'Entschlüsselter Text/Signatur ist gültig',
      testInputDecryptedPlaceholder: 'Entschlüsselter Text oder Gültigkeit der Signatur.',
      testInputValue: 'Hallo Welt!',
    },
    asymmetric: {
      headline: 'Generator für asymmetrische Schlüssel',
    },
    header: {
      asymmetricAlgorithms: 'asymmetrische Algorithmen',
      symmetricAlgorithms: 'symmetrische Algorithmen',
    },
    license: {
      licensesFonts: 'Schriftarten',
      licensesNode: 'Bibliotheken',
      fontAuthor: 'Autor',
      fontFont: 'Schriftart',
      fontLicense: 'Lizenz',
      fontLink: 'Link',
    },
    symmetric: {
      headline: 'Generator für symmetrische Schlüssel',
    },
  },
  {
    name: languageEn,
    common: {
      algorithm: 'Algorithm',
      algorithmAesShort: 'AES',
      algorithmEcShort: 'EC',
      algorithmHmacShort: 'HMAC',
      algorithmRsaShort: 'RSA',
      asymmetricEncryption: 'Symmetric Encryption',
      generate: 'Generate',
      keySize: 'Key Size',
      keySize128: '128',
      keySize192: '192',
      keySize256: '256',
      keySize1024: '1024',
      keySize2048: '2048',
      keySize4096: '4096',
      language: 'Deutsch',
      licenses: 'Licenses',
      miracleHidesKeys: 'Miracle Hides Keys',
      namedCurve: 'Named Curve',
      namedCurveSect239k1: 'sect239k1',
      noKeyGenerated: 'No key generated yet.',
      privateKey: 'Private Key',
      publicKey: 'Public Key',
      submitGenerateKeys: 'Generate Keys',
      symmetricEncryption: 'Symmetric Encryption',
      testInput: 'Original Text',
      testInputPlaceholder: 'The text to encrypt.',
      testInputEncrypted: 'Encrypted Text or Signature',
      testInputEncryptedPlaceholder: 'Encrypted text or signature.',      
      testInputDecrypted: 'Decrypted Text/Signature is valid',
      testInputDecryptedPlaceholder: 'Decrypted Text/Signature is valid.',
      testInputValue: 'Hello World!',
    },
    asymmetric: {
      headline: 'Asymmetric Keys Generator'
    },
    header: {
      asymmetricAlgorithms: 'Asymmetric Algorithms',
      symmetricAlgorithms: 'Symmetric Algorithms',
    },
    license: {
      licensesFonts: 'Fonts',
      licensesNode: 'Libraries',
      fontAuthor: 'Author',
      fontFont: 'Font',
      fontLicense: 'License',
      fontLink: 'Link',
    },
    symmetric: {
      headline: 'Symmetric Keys Generator'
    }, 
  }  
];
