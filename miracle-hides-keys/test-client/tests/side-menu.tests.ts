import * as assert from 'assert';
import Page from '../pages/page';
import WelcomePage from '../pages/welcome-page';
import { TestFrame } from './test-frame';

const pageTests : { name: string, getPageAsync: (welcomePage: WelcomePage) => Promise<Page> }[] = [
  {
    name: 'AsymmetricPage',
    getPageAsync: async (welcomePage: WelcomePage) => welcomePage.toAsymmetricPageAsync(),
  },
  {
    name: 'SymmetricPage',
    getPageAsync: async (welcomePage: WelcomePage) => welcomePage.toSymmetricPageAsync(),
  },
  {
    name: 'WelcomePage',
    getPageAsync: async (welcomePage: WelcomePage) => welcomePage,
  },
];

describe('SideMenu', () => {
  TestFrame.testFrames().forEach((testFrameEntry) => {
    describe(TestFrame.displayName(testFrameEntry), () => {
      pageTests.forEach(({ name, getPageAsync }) => {
        describe(name, () => {
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

          it('toggle language', async function test() {
            const page = await getPageAsync(this.welcomePage);

            const textLanguage1 = await page.getLanguageTextAsync();
            await page.sideMenu.toggleLanguageAsync();
            const textLanguage2 = await page.getLanguageTextAsync();
            await page.sideMenu.toggleLanguageAsync();
            const textLanguage3 = await page.getLanguageTextAsync();
            assert.equal(textLanguage1, textLanguage3);
            assert.notEqual(textLanguage1, textLanguage2);
          });

          it('toggle theme', async function test() {
            const page = await getPageAsync(this.welcomePage);

            const backgroundColor1 = await page.getBackgroundColorAsync();
            await page.sideMenu.toggleThemeAsync();
            const backgroundColor2 = await page.getBackgroundColorAsync();
            await page.sideMenu.toggleThemeAsync();
            const backgroundColor3 = await page.getBackgroundColorAsync();
            assert.equal(backgroundColor1, backgroundColor3);
            assert.notEqual(backgroundColor1, backgroundColor2);
          });
        });
      });
    });
  });
});
