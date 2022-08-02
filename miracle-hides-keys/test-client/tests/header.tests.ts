// eslint-disable-next-line import/no-extraneous-dependencies
import { By, until } from 'selenium-webdriver';
import LicensePage from '../pages/licenses-page';
import { AsymmetricPage } from '../pages/asymmetric-page';
import { SymmetricPage } from '../pages/symmetric-page';
import WelcomePage from '../pages/welcome-page';
import { TestFrame } from './test-frame';

describe('Header', () => {
  TestFrame.testFrames().forEach((testFrameEntry) => {
    describe(TestFrame.displayName(testFrameEntry), () => {
      beforeEach(async function beforeEach() {
        this.driver = await testFrameEntry.driver.createDriverAsync();
        this.welcomePage = await WelcomePage.initializeAsync(
          this.driver,
          testFrameEntry.address.url,
          testFrameEntry.windowSize,
        );

        this.isMobile = testFrameEntry.windowSize.isMobile;
      });

      afterEach(async function afterEach() {
        await this.driver.quit();
      });

      it('no header on welcome page', async function test() {
        const header = await this.driver.findElement(By.css('header'));
        await this.driver.wait(until.elementIsNotVisible(header));
      });

      it('from asymmetric page to symmetric page', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const welcomePage : WelcomePage = this.welcomePage;
        const page = await welcomePage.toAsymmetricPageViaLinkAsync();
        await page.toSymmetricPageAsync(this.isMobile);
        await SymmetricPage.initializeAsync(page);
      });

      it('from asymmetric page to asymmetric page', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const welcomePage : WelcomePage = this.welcomePage;
        const page = await welcomePage.toAsymmetricPageViaLinkAsync();
        await page.toAsymmetricPageAsync(this.isMobile);
        await AsymmetricPage.initializeAsync(page);
      });

      it('from symmetric page to asymmetric page', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const welcomePage : WelcomePage = this.welcomePage;
        const page = await welcomePage.toSymmetricPageViaLinkAsync();
        await page.toAsymmetricPageAsync(this.isMobile);
        await AsymmetricPage.initializeAsync(page);
      });

      it('from symmetric page to symmetric page', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const welcomePage : WelcomePage = this.welcomePage;
        const page = await welcomePage.toSymmetricPageViaLinkAsync();
        await page.toSymmetricPageAsync(this.isMobile);
        await SymmetricPage.initializeAsync(page);
      });

      it('from license page to asymmetric page', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const welcomePage : WelcomePage = this.welcomePage;
        const page = await welcomePage.toSymmetricPageViaLinkAsync();
        await page.toLicensePageAsync();
        const licensePage = await LicensePage.initializeAsync(page);
        await licensePage.toAsymmetricPageAsync(this.isMobile);
        await AsymmetricPage.initializeAsync(page);
      });

      it('from license page to symmetric page', async function test() {
        // eslint-disable-next-line prefer-destructuring
        const welcomePage : WelcomePage = this.welcomePage;
        const page = await welcomePage.toSymmetricPageViaLinkAsync();
        await page.toLicensePageAsync();
        const licensePage = await LicensePage.initializeAsync(page);
        await licensePage.toSymmetricPageAsync(this.isMobile);
        await SymmetricPage.initializeAsync(page);
      });
    });
  });
});
