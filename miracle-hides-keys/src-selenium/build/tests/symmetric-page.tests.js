"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const welcome_page_1 = require("../pages/welcome-page");
const test_frame_1 = require("./test-frame");
const symmetricPageValuesCompare = (oldValues, newValues, oldKeySize, newKeySize, oldAlgorithm, newAlgorithm) => {
    assert.equal(oldValues.algorithm, oldAlgorithm);
    assert.equal(newValues.algorithm, newAlgorithm);
    assert.equal(oldValues.keySize, oldKeySize);
    assert.equal(newValues.keySize, newKeySize);
    assert.match(oldValues.privateKey, /^[0-9a-f]+$/);
    assert.match(newValues.privateKey, /^[0-9a-f]+$/);
    assert.notEqual(oldValues.privateKey, newValues.privateKey);
    assert.ok(oldValues.inputText);
    assert.ok(newValues.inputText);
    assert.equal(oldValues.inputText, newValues.inputText);
    assert.match(oldValues.inputTextEncrypted, /^[0-9a-f]+$/);
    assert.match(newValues.inputTextEncrypted, /^[0-9a-f]+$/);
    assert.notEqual(oldValues.inputTextEncrypted, newValues.inputTextEncrypted);
    if (oldValues.algorithm === 'AES') {
        assert.equal(oldValues.inputText, oldValues.inputTextDecrypted);
    }
    else {
        assert.equal(oldValues.inputTextDecrypted, 'true');
    }
    if (newValues.algorithm === 'AES') {
        assert.equal(newValues.inputText, newValues.inputTextDecrypted);
    }
    else {
        assert.equal(newValues.inputTextDecrypted, 'true');
    }
};
describe('SymmetricPage', () => {
    test_frame_1.TestFrame.testFrames().forEach((testFrameEntry) => {
        describe(test_frame_1.TestFrame.displayName(testFrameEntry), () => {
            beforeEach(async function beforeEach() {
                this.driver = await testFrameEntry.driver.createDriverAsync();
                const welcomePage = await welcome_page_1.default.initializeAsync(this.driver, testFrameEntry.address.url, testFrameEntry.windowSize);
                this.page = await welcomePage.toSymmetricPageViaLinkAsync();
            });
            afterEach(async function afterEach() {
                await this.driver.quit();
            });
            it('check initial values', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const page = this.page;
                const values = await page.collectValuesAsync();
                assert.equal(values.algorithm, 'AES');
                assert.equal(values.keySize, '128');
                assert.match(values.privateKey, /^[0-9a-f]+$/gms);
                assert.ok(values.inputText);
                assert.ok(values.inputTextEncrypted);
                assert.equal(values.inputTextDecrypted, values.inputText);
            });
            it('switch from aes 128 to aes 192', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const page = this.page;
                const oldValues = await page.collectValuesAsync();
                const newValues = await page.selectAes192Async();
                symmetricPageValuesCompare(oldValues, newValues, '128', '192', 'AES', 'AES');
            });
            it('switch from aes 128 to aes 256', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const page = this.page;
                const oldValues = await page.collectValuesAsync();
                const newValues = await page.selectAes256Async();
                symmetricPageValuesCompare(oldValues, newValues, '128', '256', 'AES', 'AES');
            });
            it('switch from aes 128 to aes 192 to aes 256 to aes 128', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const page = this.page;
                let oldValues = await page.collectValuesAsync();
                let newValues = await page.selectAes192Async();
                symmetricPageValuesCompare(oldValues, newValues, '128', '192', 'AES', 'AES');
                oldValues = newValues;
                newValues = await page.selectAes256Async();
                symmetricPageValuesCompare(oldValues, newValues, '192', '256', 'AES', 'AES');
                oldValues = newValues;
                newValues = await page.selectAes128Async();
                symmetricPageValuesCompare(oldValues, newValues, '256', '128', 'AES', 'AES');
            });
            it('switch from aes to hmac', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const page = this.page;
                const oldValues = await page.collectValuesAsync();
                const newValues = await page.selectHmacAsync();
                symmetricPageValuesCompare(oldValues, newValues, '128', '128', 'AES', 'HMAC');
            });
            it('switch from hmac 128 to 256 to 512', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const page = this.page;
                let oldValues = await page.collectValuesAsync();
                let newValues = await page.selectHmacAsync();
                symmetricPageValuesCompare(oldValues, newValues, '128', '128', 'AES', 'HMAC');
                oldValues = newValues;
                newValues = await page.setHmacKeySizeAsync('256');
                symmetricPageValuesCompare(oldValues, newValues, '128', '256', 'HMAC', 'HMAC');
                oldValues = newValues;
                newValues = await page.setHmacKeySizeAsync('512');
                symmetricPageValuesCompare(oldValues, newValues, '256', '512', 'HMAC', 'HMAC');
            });
            it('submit AES', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const page = this.page;
                const oldValues = await page.collectValuesAsync();
                const newValues = await page.submitAsync();
                symmetricPageValuesCompare(oldValues, newValues, '128', '128', 'AES', 'AES');
            });
            it('submit HMAC', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const page = this.page;
                const oldValues = await page.selectHmacAsync();
                const newValues = await page.submitAsync();
                symmetricPageValuesCompare(oldValues, newValues, '128', '128', 'HMAC', 'HMAC');
            });
        });
    });
});
