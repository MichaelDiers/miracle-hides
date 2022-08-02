import * as assert from 'assert';
import { SymmetricPageValues } from '../pages/symmetric-page';
import WelcomePage from '../pages/welcome-page';
import { TestFrame } from './test-frame';

const symmetricPageValuesCompare = (
  oldValues: SymmetricPageValues,
  newValues: SymmetricPageValues,
  oldKeySize: string,
  newKeySize: string,
  oldAlgorithm: string,
  newAlgorithm: string,
) : void => {
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
  } else {
    assert.equal(oldValues.inputTextDecrypted, 'true');
  }

  if (newValues.algorithm === 'AES') {
    assert.equal(newValues.inputText, newValues.inputTextDecrypted);
  } else {
    assert.equal(newValues.inputTextDecrypted, 'true');
  }
};

describe('SymmetricPage', () => {
  TestFrame.testFrames().forEach((testFrameEntry) => {
    describe(TestFrame.displayName(testFrameEntry), () => {
      beforeEach(async function beforeEach() {
        this.driver = await testFrameEntry.driver.createDriverAsync();
        const welcomePage = await WelcomePage.initializeAsync(
          this.driver,
          testFrameEntry.address.url,
          testFrameEntry.windowSize,
        );
        this.page = await welcomePage.toSymmetricPageAsync();
      });

      afterEach(async function afterEach() {
        await this.driver.quit();
      });

      it('check initial values', async function test() {
        const values : SymmetricPageValues = await this.page.collectValuesAsync();

        assert.equal(values.algorithm, 'AES');
        assert.equal(values.keySize, '128');

        assert.match(
          values.privateKey,
          /^[0-9a-f]+$/gms,
        );
        assert.ok(values.inputText);
        assert.ok(values.inputTextEncrypted);
        assert.equal(values.inputTextDecrypted, values.inputText);
      });

      it('switch from aes 128 to aes 192', async function test() {
        const oldValues = await this.page.collectValuesAsync();
        const newValues = await this.page.selectAes192Async();
        symmetricPageValuesCompare(oldValues, newValues, '128', '192', 'AES', 'AES');
      });

      it('switch from aes 128 to aes 256', async function test() {
        const oldValues = await this.page.collectValuesAsync();
        const newValues = await this.page.selectAes256Async();
        symmetricPageValuesCompare(oldValues, newValues, '128', '256', 'AES', 'AES');
      });

      it('switch from aes 128 to aes 192 to aes 256 to aes 128', async function test() {
        let oldValues = await this.page.collectValuesAsync();
        let newValues = await this.page.selectAes192Async();
        symmetricPageValuesCompare(oldValues, newValues, '128', '192', 'AES', 'AES');

        oldValues = newValues;
        newValues = await this.page.selectAes256Async();
        symmetricPageValuesCompare(oldValues, newValues, '192', '256', 'AES', 'AES');

        oldValues = newValues;
        newValues = await this.page.selectAes128Async();
        symmetricPageValuesCompare(oldValues, newValues, '256', '128', 'AES', 'AES');
      });

      it('switch from aes to hmac', async function test() {
        const oldValues = await this.page.collectValuesAsync();
        const newValues = await this.page.selectHmacAsync();
        symmetricPageValuesCompare(oldValues, newValues, '128', '128', 'AES', 'HMAC');
      });

      it('switch from hmac 128 to 256 to 512', async function test() {
        let oldValues = await this.page.collectValuesAsync();
        let newValues = await this.page.selectHmacAsync();
        symmetricPageValuesCompare(oldValues, newValues, '128', '128', 'AES', 'HMAC');

        oldValues = newValues;
        newValues = await this.page.setHmacKeySizeAsync('256');
        symmetricPageValuesCompare(oldValues, newValues, '128', '256', 'HMAC', 'HMAC');

        oldValues = newValues;
        newValues = await this.page.setHmacKeySizeAsync('512');
        symmetricPageValuesCompare(oldValues, newValues, '256', '512', 'HMAC', 'HMAC');
      });

      it('submit AES', async function test() {
        const oldValues = await this.page.collectValuesAsync();
        const newValues = await this.page.submitAsync();
        symmetricPageValuesCompare(oldValues, newValues, '128', '128', 'AES', 'AES');
      });

      it('submit HMAC', async function test() {
        const oldValues = await this.page.selectHmacAsync();
        const newValues = await this.page.submitAsync();
        symmetricPageValuesCompare(oldValues, newValues, '128', '128', 'HMAC', 'HMAC');
      });
    });
  });
});
