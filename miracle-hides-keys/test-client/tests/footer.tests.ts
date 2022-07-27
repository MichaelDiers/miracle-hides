import WelcomePage from '../pages/welcome-page';
import * as constants from './constants';
import { Drivers } from './drivers';

const drivers = Drivers.initialize();

describe('Footer', () => {
  constants.ADDRESSES.forEach(({ name: addressName, address }) => {
    describe(addressName, async () => {
      constants.WINDOW_SIZES.forEach((size) => {
        describe(`size: ${size.width} x ${size.height}`, () => {
          drivers.list.forEach(({ name: driverName, createDriverAsync }) => {
            describe(driverName, () => {
              describe.only('open license page', () => {
                beforeEach(async function beforeEach() {
                  this.driver = await createDriverAsync();
                  this.welcomePage = await WelcomePage.initializeAsync(this.driver, address, size);
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
        });
      });
    });
  });
});
