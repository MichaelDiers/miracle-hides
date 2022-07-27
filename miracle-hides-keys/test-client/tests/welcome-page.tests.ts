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
    });
  });
});
