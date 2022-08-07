"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsymmetricPage = void 0;
const footer_1 = require("./footer");
const header_1 = require("./header");
const page_1 = require("./page");
const side_menu_1 = require("./side-menu");
const ALGORITHM_EC = 'EC';
const ALGORITHM_RSA = 'RSA';
const SELECTOR_ALGORITHM = '[name=type]';
const SELECTOR_ALGORITHM_CHECKED = `${SELECTOR_ALGORITHM}:checked`;
const SELECTOR_ALGORITHM_EC = `${SELECTOR_ALGORITHM}[value=${ALGORITHM_EC}]`;
const SELECTOR_ALGORITHM_RSA = `${SELECTOR_ALGORITHM}[value=${ALGORITHM_RSA}]`;
const SELECTOR_EC_NAMED_CURVE = '[name=ecNamedCurve]';
const SELECTOR_EC_NAMED_CURVE_CHECKED = `${SELECTOR_EC_NAMED_CURVE}:checked`;
const SELECTOR_LANGUAGE_TEST = 'label[for=type]';
const SELECTOR_PAGE_VERIFIER = '#asymmetricPage';
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
class AsymmetricPage extends page_1.default {
    constructor({ driver, footer, sideMenu, header, }) {
        super({
            driver,
            verifyOnPageSelector: SELECTOR_PAGE_VERIFIER,
            footer,
            sideMenu,
            header,
        });
    }
    static async initializeAsync(driver) {
        const footer = footer_1.default.initializeAsync(driver);
        const header = header_1.default.initializeAsync(driver);
        const sideMenu = side_menu_1.default.initializeAsync(driver);
        const page = new AsymmetricPage({
            driver,
            footer: await footer,
            sideMenu: await sideMenu,
            header: await header,
        });
        await page.verifyOnPageAsync();
        return page;
    }
    async collectValuesAsync() {
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
    async getAlgorithmAsync() {
        return this.getValueAsync(SELECTOR_ALGORITHM_CHECKED);
    }
    async getLanguageTextAsync() {
        return super.getTextAsync(SELECTOR_LANGUAGE_TEST);
    }
    async getNamedCurveAsync() {
        return this.getValueAsync(SELECTOR_EC_NAMED_CURVE_CHECKED);
    }
    async getPrivateKeyAsync() {
        return this.getTextAreaText(SELECTOR_PRIVATE_KEY);
    }
    async getPublicKeyAsync() {
        return this.getTextAreaText(SELECTOR_PUBLIC_KEY);
    }
    async getRsaKeySizeAsync() {
        return this.getValueAsync(SELECTOR_RSA_KEY_SIZE_CHECKED);
    }
    async getTestInputAsync() {
        return this.getTextAreaText(SELECTOR_TEST_INPUT);
    }
    async getTestInputDecryptedAsync() {
        return this.getTextAreaText(SELECTOR_TEST_INPUT_DECRYPTED);
    }
    async getTestInputEncryptedAsync() {
        return this.getTextAreaText(SELECTOR_TEST_INPUT_ENCRYPTED);
    }
    async selectEcAsync() {
        await this.clickAndWaitForValueChanged(SELECTOR_ALGORITHM_EC, SELECTOR_PRIVATE_KEY);
        return this.collectValuesAsync();
    }
    async selectRsaAsync() {
        await this.clickAndWaitForValueChanged(SELECTOR_ALGORITHM_RSA, SELECTOR_PRIVATE_KEY);
        return this.collectValuesAsync();
    }
    async selectRsa1024Async() {
        return this.selectRsaKeySizeAsync(SELECTOR_RSA_KEY_SIZE_1024, SELECTOR_PRIVATE_KEY);
    }
    async selectRsa2048Async() {
        return this.selectRsaKeySizeAsync(SELECTOR_RSA_KEY_SIZE_2048, SELECTOR_PRIVATE_KEY);
    }
    async selectRsa4096Async() {
        return this.selectRsaKeySizeAsync(SELECTOR_RSA_KEY_SIZE_4096, SELECTOR_PRIVATE_KEY);
    }
    async submitAsync() {
        await this.clickAndWaitForValueChanged(SELECTOR_SUBMIT, SELECTOR_PRIVATE_KEY);
        return this.collectValuesAsync();
    }
    async selectRsaKeySizeAsync(selectorClick, selectorValueChanged) {
        await this.clickAndWaitForValueChanged(selectorClick, selectorValueChanged);
        return this.collectValuesAsync();
    }
}
exports.AsymmetricPage = AsymmetricPage;
