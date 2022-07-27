import * as assert from 'assert';
import WelcomePage from '../pages/welcome-page';
import * as constants from './constants';
import { Drivers } from './drivers';

const drivers = Drivers.initialize();

describe('WelcomePage', () => {
  constants.ADDRESSES.forEach(({ name: addressName, address }) => {
    describe(addressName, async () => {
      constants.WINDOW_SIZES.forEach((size) => {
        describe(`size: ${size.width} x ${size.height}`, () => {
          drivers.list.forEach(({ name: driverName, createDriverAsync }) => {
            describe(driverName, () => {
              beforeEach(async function beforeEach() {
                this.driver = await createDriverAsync();
              });

              afterEach(async function afterEach() {
                await this.driver.quit();
              });

              it('load index.html', async function test() {
                await WelcomePage.initializeAsync(this.driver, address, size);
              });

              it('to asymmetric page', async function test() {
                const page = await WelcomePage.initializeAsync(this.driver, address, size);
                await page.toAsymmetricPageAsync();
              });

              it('to symmetric page', async function test() {
                const page = await WelcomePage.initializeAsync(this.driver, address, size);
                await page.toSymmetricPageAsync();
              });

              it('toggle language', async function test() {
                const page = await WelcomePage.initializeAsync(this.driver, address, size);
                const textLanguage1 = await page.getLanguageTextAsync();
                await page.toggleLanguageAsync();
                const textLanguage2 = await page.getLanguageTextAsync();
                await page.toggleLanguageAsync();
                const textLanguage3 = await page.getLanguageTextAsync();
                assert.equal(textLanguage1, textLanguage3);
                assert.notEqual(textLanguage1, textLanguage2);
              });

              it('toggle theme', async function test() {
                const page = await WelcomePage.initializeAsync(this.driver, address, size);
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
      });
    });
  });
});
