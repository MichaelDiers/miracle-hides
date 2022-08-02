import * as assert from 'assert';
import { AsymmetricPage, AsymmetricPageValues } from '../pages/asymmetric-page';
import WelcomePage from '../pages/welcome-page';
import { TestFrame } from './test-frame';

const asymmetricPageValuesCompare = (
  oldValues: AsymmetricPageValues,
  newValues: AsymmetricPageValues,
  oldRsaKeySize: string,
  newRsaKeySize: string,
  oldAlgorithm: string,
  newAlgorithm: string,
) : void => {
  assert.equal(oldValues.algorithm, oldAlgorithm);
  assert.equal(newValues.algorithm, newAlgorithm);

  assert.equal(oldValues.namedCurve, oldAlgorithm === 'EC' ? 'sect239k1' : undefined);
  assert.equal(newValues.namedCurve, newAlgorithm === 'EC' ? 'sect239k1' : undefined);

  assert.equal(oldValues.rsaKeySize, oldRsaKeySize);
  assert.equal(newValues.rsaKeySize, newRsaKeySize);

  [{
    data: oldValues,
    algorithm: oldAlgorithm,
  }, {
    data: newValues,
    algorithm: newAlgorithm,
  }].forEach(({ data, algorithm }) => {
    if (algorithm === 'EC') {
      assert.match(
        data.privateKey,
        /^-----BEGIN EC PRIVATE KEY-----.+-----END EC PRIVATE KEY-----\s*$/gms,
      );
      assert.match(
        data.publicKey,
        /^-----BEGIN PUBLIC KEY-----.+-----END PUBLIC KEY-----\s*$/gms,
      );

      assert.equal(data.inputTextDecrypted, 'true');
    } else {
      assert.match(
        data.privateKey,
        /^-----BEGIN RSA PRIVATE KEY-----.+-----END RSA PRIVATE KEY-----\s*$/gms,
      );
      assert.match(
        data.publicKey,
        /^-----BEGIN RSA PUBLIC KEY-----.+-----END RSA PUBLIC KEY-----\s*$/gms,
      );

      assert.ok(data.inputTextDecrypted);
      assert.equal(data.inputTextDecrypted, data.inputText);
    }
  });

  assert.notEqual(oldValues.privateKey, newValues.privateKey);
  assert.notEqual(oldValues.publicKey, newValues.publicKey);
  assert.equal(oldValues.inputText, newValues.inputText);
  assert.ok(oldValues.inputTextEncrypted);
  assert.ok(newValues.inputTextEncrypted);
  assert.notEqual(oldValues.inputTextEncrypted, newValues.inputTextEncrypted);
};

describe('AsymmetricPage', () => {
  TestFrame.testFrames().forEach((testFrameEntry) => {
    describe(TestFrame.displayName(testFrameEntry), () => {
      beforeEach(async function beforeEach() {
        this.driver = await testFrameEntry.driver.createDriverAsync();
        const welcomePage = await WelcomePage.initializeAsync(
          this.driver,
          testFrameEntry.address.url,
          testFrameEntry.windowSize,
        );
        this.page = await welcomePage.toAsymmetricPageViaLinkAsync();
      });

      afterEach(async function afterEach() {
        await this.driver.quit();
      });

      it('check initial values', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const page : AsymmetricPage = this.page;
        const values : AsymmetricPageValues = await page.collectValuesAsync();

        assert.equal(values.algorithm, 'EC');
        assert.equal(values.namedCurve, 'sect239k1');
        assert.equal(values.rsaKeySize, undefined);
        assert.match(
          values.privateKey,
          /^-----BEGIN EC PRIVATE KEY-----.+-----END EC PRIVATE KEY-----\s*$/gms,
        );
        assert.match(
          values.publicKey,
          /^-----BEGIN PUBLIC KEY-----.+-----END PUBLIC KEY-----\s*$/gms,
        );
        assert.ok(values.inputText);
        assert.ok(values.inputTextEncrypted);
        assert.equal(values.inputTextDecrypted, 'true');
      });

      it('switch from ec to rsa', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const page : AsymmetricPage = this.page;
        const oldValues = await page.collectValuesAsync();
        const newValues = await page.selectRsaAsync();
        asymmetricPageValuesCompare(oldValues, newValues, undefined, '2048', 'EC', 'RSA');
      });

      it('switch from rsa 2048 to 1024', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const page : AsymmetricPage = this.page;
        const oldValues = await page.selectRsaAsync();
        const newValues = await page.selectRsa1024Async();
        asymmetricPageValuesCompare(oldValues, newValues, '2048', '1024', 'RSA', 'RSA');
      });

      it('switch from rsa 2048 to 4096', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const page : AsymmetricPage = this.page;
        const oldValues = await page.selectRsaAsync();
        const newValues = await page.selectRsa4096Async();
        asymmetricPageValuesCompare(oldValues, newValues, '2048', '4096', 'RSA', 'RSA');
      });

      it('switch from EC to rsa 2048 to 1024 to 2048 to 4096 to EC', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const page : AsymmetricPage = this.page;
        // EC to RSA 2048
        let oldValues = await page.collectValuesAsync();
        let newValues = await page.selectRsaAsync();
        asymmetricPageValuesCompare(oldValues, newValues, undefined, '2048', 'EC', 'RSA');

        // RSA 2048 to RSA 1024
        oldValues = newValues;
        newValues = await page.selectRsa1024Async();
        asymmetricPageValuesCompare(oldValues, newValues, '2048', '1024', 'RSA', 'RSA');

        // RSA 1024 to RSA 2048
        oldValues = newValues;
        newValues = await page.selectRsa2048Async();
        asymmetricPageValuesCompare(oldValues, newValues, '1024', '2048', 'RSA', 'RSA');

        // RSA 2048 to RSA 4096
        oldValues = newValues;
        newValues = await page.selectRsa4096Async();
        asymmetricPageValuesCompare(oldValues, newValues, '2048', '4096', 'RSA', 'RSA');

        // RSA 4096 to EC
        oldValues = newValues;
        newValues = await page.selectEcAsync();
        asymmetricPageValuesCompare(oldValues, newValues, '4096', undefined, 'RSA', 'EC');
      });

      it('submit EC', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const page : AsymmetricPage = this.page;
        const oldValues = await page.collectValuesAsync();
        const newValues = await page.submitAsync();
        asymmetricPageValuesCompare(oldValues, newValues, undefined, undefined, 'EC', 'EC');
      });

      it('submit RSA', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const page : AsymmetricPage = this.page;
        const oldValues = await page.selectRsaAsync();
        const newValues = await page.submitAsync();
        asymmetricPageValuesCompare(oldValues, newValues, '2048', '2048', 'RSA', 'RSA');
      });
    });
  });
});
