// eslint-disable-next-line import/no-extraneous-dependencies
import { By, until } from 'selenium-webdriver';
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
        const page = await this.welcomePage.toAsymmetricPageAsync();
        await page.toSymmetricPageAsync(this.isMobile);
        await SymmetricPage.initializeAsync(page);
      });

      it('from asymmetric page to asymmetric page', async function test() {
        const page = await this.welcomePage.toAsymmetricPageAsync();
        await page.toAsymmetricPageAsync(this.isMobile);
        await AsymmetricPage.initializeAsync(page);
      });

      it('from symmetric page to asymmetric page', async function test() {
        const page = await this.welcomePage.toSymmetricPageAsync();
        await page.toAsymmetricPageAsync(this.isMobile);
        await AsymmetricPage.initializeAsync(page);
      });

      it('from symmetric page to symmetric page', async function test() {
        const page = await this.welcomePage.toSymmetricPageAsync();
        await page.toSymmetricPageAsync(this.isMobile);
        await SymmetricPage.initializeAsync(page);
      });
    });
  });
});
