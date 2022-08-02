import LicensePage from '../pages/licenses-page';
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

      it('from welcome page to license page', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const welcomePage : WelcomePage = this.welcomePage;
        await welcomePage.toLicensePageAsync();
        await LicensePage.initializeAsync(welcomePage);
      });

      it('from asymmetric page to license page', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const welcomePage : WelcomePage = this.welcomePage;
        const page = await welcomePage.toAsymmetricPageViaLinkAsync();
        await page.toLicensePageAsync();
        await LicensePage.initializeAsync(welcomePage);
      });

      it('from symmetric page to license page', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const welcomePage : WelcomePage = this.welcomePage;
        const page = await welcomePage.toSymmetricPageViaLinkAsync();
        await page.toLicensePageAsync();
        await LicensePage.initializeAsync(welcomePage);
      });
    });
  });
});
