// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';
import Footer from './footer';
import Page from './page';
import SideMenu from './side-menu';

export interface AsymmetricPageValues {
  algorithm: string;
  namedCurve?: string;
  rsaKeySize?: string;
  privateKey: string;
  publicKey: string;
  inputText: string;
  inputTextEncrypted: string;
  inputTextDecrypted: string;
}

const ALGORITHM_EC = 'EC';
const ALGORITHM_RSA = 'RSA';

const SELECTOR_ALGORITHM = '[name=type]';
const SELECTOR_ALGORITHM_CHECKED = `${SELECTOR_ALGORITHM}:checked`;
const SELECTOR_ALGORITHM_EC = `${SELECTOR_ALGORITHM}[value=EC]`;
const SELECTOR_ALGORITHM_RSA = `${SELECTOR_ALGORITHM}[value=RSA]`;
const SELECTOR_EC_NAMED_CURVE = '[name=ecNamedCurve]';
const SELECTOR_EC_NAMED_CURVE_CHECKED = `${SELECTOR_EC_NAMED_CURVE}:checked`;
const SELECTOR_LANGUAGE_TEST = 'label[for=type]';
const SELECTOR_PAGE_VERIFIER = 'main#asymmetricPage';
const SELECTOR_PRIVATE_KEY = '#asymmetricPrivateKey';
const SELECTOR_PUBLIC_KEY = '#asymmetricPublicKey';
const SELECTOR_RSA_KEY_SIZE = '[name=rsaKeySize]';
const SELECTOR_RSA_KEY_SIZE_CHECKED = `${SELECTOR_RSA_KEY_SIZE}:checked`;
const SELECTOR_RSA_KEY_SIZE_1024 = `${SELECTOR_RSA_KEY_SIZE}[value='1024']`;
const SELECTOR_RSA_KEY_SIZE_2048 = `${SELECTOR_RSA_KEY_SIZE}[value='2048']`;
const SELECTOR_RSA_KEY_SIZE_4096 = `${SELECTOR_RSA_KEY_SIZE}[value='4096']`;
const SELECTOR_SUBMIT = '#asymmetricSubmit';
const SELECTOR_TEST_INPUT = '#testInput';
const SELECTOR_TEST_INPUT_ENCRYPTED = '#testInputEncrypted';
const SELECTOR_TEST_INPUT_DECRYPTED = '#testInputDecrypted';

export class AsymmetricPage extends Page {
  private constructor(driver: WebDriver | BasePage, footer: Footer, sideMenu: SideMenu) {
    super(driver, SELECTOR_PAGE_VERIFIER, footer, sideMenu);
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<AsymmetricPage> {
    const footer = await Footer.initializeAsync(driver);
    const sideMenu = await SideMenu.initializeAsync(driver);

    const page = new AsymmetricPage(driver, footer, sideMenu);
    await page.verifyOnPageAsync();
    return page;
  }

  async collectValuesAsync() : Promise<AsymmetricPageValues> {
    const algorithm = this.getAlgorithmAsync();
    const privateKey = this.getPrivateKeyAsync();
    const publicKey = this.getPublicKeyAsync();
    const inputText = this.getTestInputAsync();
    const inputTextEncrypted = this.getTestInputEncryptedAsync();
    const inputTextDecrypted = this.getTestInputDecryptedAsync();

    const namedCurve = (await algorithm) === ALGORITHM_EC
      ? await this.getNamedCurveAsync() : undefined;
    const rsaKeySize = (await algorithm) === ALGORITHM_RSA
      ? await this.getRsaKeySizeAsync() : undefined;

    return {
      algorithm: await algorithm,
      namedCurve,
      rsaKeySize,
      privateKey: await privateKey,
      publicKey: await publicKey,
      inputText: await inputText,
      inputTextEncrypted: await inputTextEncrypted,
      inputTextDecrypted: await inputTextDecrypted,
    };
  }

  async getAlgorithmAsync() : Promise<string> {
    return this.getValueAsync(SELECTOR_ALGORITHM_CHECKED);
  }

  async getLanguageTextAsync() : Promise<string> {
    return super.getTextAsync(SELECTOR_LANGUAGE_TEST);
  }

  async getNamedCurveAsync(): Promise<string> {
    return this.getValueAsync(SELECTOR_EC_NAMED_CURVE_CHECKED);
  }

  async getPrivateKeyAsync() : Promise<string> {
    return this.getTextAreaText(SELECTOR_PRIVATE_KEY);
  }

  async getPublicKeyAsync() : Promise<string> {
    return this.getTextAreaText(SELECTOR_PUBLIC_KEY);
  }

  async getRsaKeySizeAsync() : Promise<string> {
    return this.getValueAsync(SELECTOR_RSA_KEY_SIZE_CHECKED);
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

  async selectEcAsync() : Promise<AsymmetricPageValues> {
    await this.clickAndWaitForValueChanged(SELECTOR_ALGORITHM_EC, SELECTOR_PRIVATE_KEY);
    return this.collectValuesAsync();
  }

  async selectRsaAsync() : Promise<AsymmetricPageValues> {
    await this.clickAndWaitForValueChanged(SELECTOR_ALGORITHM_RSA, SELECTOR_PRIVATE_KEY);
    return this.collectValuesAsync();
  }

  async selectRsa1024Async() : Promise<AsymmetricPageValues> {
    return this.selectRsaKeySizeAsync(SELECTOR_RSA_KEY_SIZE_1024, SELECTOR_PRIVATE_KEY);
  }

  async selectRsa2048Async() : Promise<AsymmetricPageValues> {
    return this.selectRsaKeySizeAsync(SELECTOR_RSA_KEY_SIZE_2048, SELECTOR_PRIVATE_KEY);
  }

  async selectRsa4096Async() : Promise<AsymmetricPageValues> {
    return this.selectRsaKeySizeAsync(SELECTOR_RSA_KEY_SIZE_4096, SELECTOR_PRIVATE_KEY);
  }

  async submitAsync() : Promise<AsymmetricPageValues> {
    this.clickAndWaitForValueChanged(SELECTOR_SUBMIT, SELECTOR_PRIVATE_KEY);
    return this.collectValuesAsync();
  }

  private async selectRsaKeySizeAsync(
    selectorClick: string,
    selectorValueChanged: string,
  ) : Promise<AsymmetricPageValues> {
    await this.clickAndWaitForValueChanged(selectorClick, selectorValueChanged);
    return this.collectValuesAsync();
  }
}
