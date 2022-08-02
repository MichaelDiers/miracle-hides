// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';
import Footer from './footer';
import Header from './header';
import Page from './page';
import SideMenu from './side-menu';

export interface SymmetricPageValues {
  algorithm: string;
  keySize: string;
  privateKey: string;
  inputText: string;
  inputTextEncrypted: string;
  inputTextDecrypted: string;
}

const ALGORITHM_AES = 'AES';
const ALGORITHM_HMAC = 'HMAC';

const SELECTOR_AES_KEY_SIZE = '[name=aesKeySize]';
const SELECTOR_AES_KEY_SIZE_CHECKED = `${SELECTOR_AES_KEY_SIZE}:checked`;
const SELECTOR_AES_KEY_SIZE_128 = `${SELECTOR_AES_KEY_SIZE}[value='128']`;
const SELECTOR_AES_KEY_SIZE_192 = `${SELECTOR_AES_KEY_SIZE}[value='192']`;
const SELECTOR_AES_KEY_SIZE_256 = `${SELECTOR_AES_KEY_SIZE}[value='256']`;
const SELECTOR_ALGORITHM = '[name=type]';
const SELECTOR_ALGORITHM_CHECKED = `${SELECTOR_ALGORITHM}:checked`;
const SELECTOR_ALGORITHM_AES = `${SELECTOR_ALGORITHM}[value=${ALGORITHM_AES}]`;
const SELECTOR_ALGORITHM_HMAC = `${SELECTOR_ALGORITHM}[value=${ALGORITHM_HMAC}]`;
const SELECTOR_HMAC_KEY_SIZE = '[name=hmacKeySize]';
const SELECTOR_LANGUAGE_TEST = 'label[for=type]';
const SELECTOR_PAGE_VERIFIER = 'main#symmetricPage';
const SELECTOR_PRIVATE_KEY = '#symmetricPrivateKey';
const SELECTOR_SUBMIT = '#symmetricSubmit';
const SELECTOR_TEST_INPUT = '#testInput';
const SELECTOR_TEST_INPUT_ENCRYPTED = '#symmetricTestInputEncrypted';
const SELECTOR_TEST_INPUT_DECRYPTED = '#symmetricTestInputDecrypted';

export class SymmetricPage extends Page {
  private constructor({
    driver,
    footer,
    sideMenu,
    header,
  }: {
    driver: WebDriver | BasePage,
    footer: Footer,
    sideMenu: SideMenu,
    header: Header,
  }) {
    super({
      driver,
      verifyOnPageSelector: SELECTOR_PAGE_VERIFIER,
      footer,
      sideMenu,
      header,
    });
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<SymmetricPage> {
    const footer = Footer.initializeAsync(driver);
    const header = Header.initializeAsync(driver);
    const sideMenu = SideMenu.initializeAsync(driver);

    const page = new SymmetricPage({
      driver,
      footer: await footer,
      sideMenu: await sideMenu,
      header: await header,
    });
    await page.verifyOnPageAsync();
    return page;
  }

  async collectValuesAsync() : Promise<SymmetricPageValues> {
    const algorithm = this.getAlgorithmAsync();
    const privateKey = this.getPrivateKeyAsync();
    const inputText = this.getTestInputAsync();
    const inputTextEncrypted = this.getTestInputEncryptedAsync();
    const inputTextDecrypted = this.getTestInputDecryptedAsync();

    const keySize = (await algorithm) === ALGORITHM_AES
      ? this.getKeySizeAesAsync() : this.getKeySizeHmacAsync();

    return {
      algorithm: await algorithm,
      keySize: await keySize,
      privateKey: await privateKey,
      inputText: await inputText,
      inputTextEncrypted: await inputTextEncrypted,
      inputTextDecrypted: await inputTextDecrypted,
    };
  }

  async getAlgorithmAsync() : Promise<string> {
    return this.getValueAsync(SELECTOR_ALGORITHM_CHECKED);
  }

  async getKeySizeAesAsync(): Promise<string> {
    return this.getValueAsync(SELECTOR_AES_KEY_SIZE_CHECKED);
  }

  async getKeySizeHmacAsync() : Promise<string> {
    return this.getValueAsync(SELECTOR_HMAC_KEY_SIZE);
  }

  async getLanguageTextAsync() : Promise<string> {
    return this.getTextAsync(SELECTOR_LANGUAGE_TEST);
  }

  async getPrivateKeyAsync() : Promise<string> {
    return this.getTextAreaText(SELECTOR_PRIVATE_KEY);
  }

  async getTestInputAsync() : Promise<string> {
    return this.getTextAreaText(SELECTOR_TEST_INPUT);
  }

  async getTestInputDecryptedAsync() : Promise<string> {
    return this.getTextAreaText(SELECTOR_TEST_INPUT_DECRYPTED);
  }

  async getTestInputEncryptedAsync() : Promise<string> {
    return this.getTextAreaText(SELECTOR_TEST_INPUT_ENCRYPTED);
  }

  async selectAesAsync() : Promise<SymmetricPageValues> {
    await this.clickAndWaitForValueChanged(SELECTOR_ALGORITHM_AES, SELECTOR_PRIVATE_KEY);
    return this.collectValuesAsync();
  }

  async selectAes128Async() : Promise<SymmetricPageValues> {
    return this.selectAesKeySizeAsync(SELECTOR_AES_KEY_SIZE_128, SELECTOR_PRIVATE_KEY);
  }

  async selectAes192Async() : Promise<SymmetricPageValues> {
    return this.selectAesKeySizeAsync(SELECTOR_AES_KEY_SIZE_192, SELECTOR_PRIVATE_KEY);
  }

  async selectAes256Async() : Promise<SymmetricPageValues> {
    return this.selectAesKeySizeAsync(SELECTOR_AES_KEY_SIZE_256, SELECTOR_PRIVATE_KEY);
  }

  async selectHmacAsync() : Promise<SymmetricPageValues> {
    await this.clickAndWaitForValueChanged(SELECTOR_ALGORITHM_HMAC, SELECTOR_PRIVATE_KEY);
    return this.collectValuesAsync();
  }

  async setHmacKeySizeAsync(keySize: string) : Promise<SymmetricPageValues> {
    await this.sendKeysAndWaitForValueChanged(
      SELECTOR_HMAC_KEY_SIZE,
      keySize,
      SELECTOR_PRIVATE_KEY,
    );
    return this.collectValuesAsync();
  }

  async submitAsync() : Promise<SymmetricPageValues> {
    await this.clickAndWaitForValueChanged(SELECTOR_SUBMIT, SELECTOR_PRIVATE_KEY);
    return this.collectValuesAsync();
  }

  private async selectAesKeySizeAsync(
    selectorClick: string,
    selectorValueChanged: string,
  ) : Promise<SymmetricPageValues> {
    await this.clickAndWaitForValueChanged(selectorClick, selectorValueChanged);
    return this.collectValuesAsync();
  }
}
