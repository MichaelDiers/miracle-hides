import * as assert from 'assert';
import WelcomePage from '../pages/welcome-page';
import { TestFrame } from './test-frame';

describe('WelcomePage', () => {
  TestFrame.testFrames().forEach((testFrameEntry) => {
    describe(TestFrame.displayName(testFrameEntry), () => {
      beforeEach(async function beforeEach() {
        this.driver = await testFrameEntry.driver.createDriverAsync();
      });

      afterEach(async function afterEach() {
        await this.driver.quit();
      });

      it('load index.html', async function test() {
        await WelcomePage.initializeAsync(
          this.driver,
          testFrameEntry.address.url,
          testFrameEntry.windowSize,
        );
      });

      it('to asymmetric page', async function test() {
        const page = await WelcomePage.initializeAsync(
          this.driver,
          testFrameEntry.address.url,
          testFrameEntry.windowSize,
        );

        await page.toAsymmetricPageAsync();
      });

      it('to symmetric page', async function test() {
        const page = await WelcomePage.initializeAsync(
          this.driver,
          testFrameEntry.address.url,
          testFrameEntry.windowSize,
        );

        await page.toSymmetricPageAsync();
      });

      it('toggle language', async function test() {
        const page = await WelcomePage.initializeAsync(
          this.driver,
          testFrameEntry.address.url,
          testFrameEntry.windowSize,
        );

        const textLanguage1 = await page.getLanguageTextAsync();
        await page.toggleLanguageAsync();
        const textLanguage2 = await page.getLanguageTextAsync();
        await page.toggleLanguageAsync();
        const textLanguage3 = await page.getLanguageTextAsync();
        assert.equal(textLanguage1, textLanguage3);
        assert.notEqual(textLanguage1, textLanguage2);
      });

      it('toggle theme', async function test() {
        const page = await WelcomePage.initializeAsync(
          this.driver,
          testFrameEntry.address.url,
          testFrameEntry.windowSize,
        );

        const backgroundColor1 = await page.getBackgroundColorAsync();
        await page.toggleThemeAsync();
        const backgroundColor2 = await page.getBackgroundColorAsync();
        await page.toggleThemeAsync();
        const backgroundColor3 = await page.getBackgroundColorAsync();
        assert.equal(backgroundColor1, backgroundColor3);
        assert.notEqual(backgroundColor1, backgroundColor2);
      });
    });
  });
});
