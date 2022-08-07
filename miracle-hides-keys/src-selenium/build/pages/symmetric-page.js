"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymmetricPage = void 0;
const footer_1 = require("./footer");
const header_1 = require("./header");
const page_1 = require("./page");
const side_menu_1 = require("./side-menu");
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
const SELECTOR_PAGE_VERIFIER = '#symmetricPage';
const SELECTOR_PRIVATE_KEY = '#symmetricPrivateKey';
const SELECTOR_SUBMIT = '#symmetricSubmit';
const SELECTOR_TEST_INPUT = '#testInput';
const SELECTOR_TEST_INPUT_ENCRYPTED = '#symmetricTestInputEncrypted';
const SELECTOR_TEST_INPUT_DECRYPTED = '#symmetricTestInputDecrypted';
class SymmetricPage extends page_1.default {
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
        const page = new SymmetricPage({
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
    async getAlgorithmAsync() {
        return this.getValueAsync(SELECTOR_ALGORITHM_CHECKED);
    }
    async getKeySizeAesAsync() {
        return this.getValueAsync(SELECTOR_AES_KEY_SIZE_CHECKED);
    }
    async getKeySizeHmacAsync() {
        return this.getValueAsync(SELECTOR_HMAC_KEY_SIZE);
    }
    async getLanguageTextAsync() {
        return this.getTextAsync(SELECTOR_LANGUAGE_TEST);
    }
    async getPrivateKeyAsync() {
        return this.getTextAreaText(SELECTOR_PRIVATE_KEY);
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
    async selectAesAsync() {
        await this.clickAndWaitForValueChanged(SELECTOR_ALGORITHM_AES, SELECTOR_PRIVATE_KEY);
        return this.collectValuesAsync();
    }
    async selectAes128Async() {
        return this.selectAesKeySizeAsync(SELECTOR_AES_KEY_SIZE_128, SELECTOR_PRIVATE_KEY);
    }
    async selectAes192Async() {
        return this.selectAesKeySizeAsync(SELECTOR_AES_KEY_SIZE_192, SELECTOR_PRIVATE_KEY);
    }
    async selectAes256Async() {
        return this.selectAesKeySizeAsync(SELECTOR_AES_KEY_SIZE_256, SELECTOR_PRIVATE_KEY);
    }
    async selectHmacAsync() {
        await this.clickAndWaitForValueChanged(SELECTOR_ALGORITHM_HMAC, SELECTOR_PRIVATE_KEY);
        return this.collectValuesAsync();
    }
    async setHmacKeySizeAsync(keySize) {
        await this.sendKeysAndWaitForValueChanged(SELECTOR_HMAC_KEY_SIZE, keySize, SELECTOR_PRIVATE_KEY);
        return this.collectValuesAsync();
    }
    async submitAsync() {
        await this.clickAndWaitForValueChanged(SELECTOR_SUBMIT, SELECTOR_PRIVATE_KEY);
        return this.collectValuesAsync();
    }
    async selectAesKeySizeAsync(selectorClick, selectorValueChanged) {
        await this.clickAndWaitForValueChanged(selectorClick, selectorValueChanged);
        return this.collectValuesAsync();
    }
}
exports.SymmetricPage = SymmetricPage;
