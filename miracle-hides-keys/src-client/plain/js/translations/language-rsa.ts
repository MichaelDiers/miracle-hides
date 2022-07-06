import LanguagePage from './language-page';

export default interface RsaLanguage extends LanguagePage {
  keySize: string;
  keySize1024: string;
  keySize2048: string;
  keySize4096: string;
  submit: string;
  publicKey: string;
  publicKeyPlaceholder: string;       
          privateKey: string;
          privateKeyPlaceholder: string;
}