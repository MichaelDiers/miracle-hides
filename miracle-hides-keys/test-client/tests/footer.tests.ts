import WelcomePage from '../pages/welcome-page';
import { TestFrame } from './test-frame';

describe('Footer', () => {
  TestFrame.testFrames().forEach((testFrameEntry) => {
    describe(TestFrame.displayName(testFrameEntry), () => {
      beforeEach(async function beforeEach() {
        this.driver = await testFrameEntry.driver.createDriverAsync();
        this.welcomePage = await WelcomePage.initializeAsync(
          this.driver,
          testFrameEntry.address.url,
          testFrameEntry.windowSize,
        );
      });

      afterEach(async function afterEach() {
        await this.driver.quit();
      });

      it('from welcome page', async function test() {
        await this.welcomePage.footer.toLicensePageAsync();
      });

      it('from asymmetric page', async function test() {
        const page = await this.welcomePage.toAsymmetricPageAsync();
        await page.footer.toLicensePageAsync();
      });

      it('from symmetric page', async function test() {
        const page = await this.welcomePage.toSymmetricPageAsync();
        await page.footer.toLicensePageAsync();
      });
    });
  });
});
