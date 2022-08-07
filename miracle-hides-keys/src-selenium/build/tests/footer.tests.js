"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const licenses_page_1 = require("../pages/licenses-page");
const welcome_page_1 = require("../pages/welcome-page");
const test_frame_1 = require("./test-frame");
describe('Footer', () => {
    test_frame_1.TestFrame.testFrames().forEach((testFrameEntry) => {
        describe(test_frame_1.TestFrame.displayName(testFrameEntry), () => {
            beforeEach(async function beforeEach() {
                this.driver = await testFrameEntry.driver.createDriverAsync();
                this.welcomePage = await welcome_page_1.default.initializeAsync(this.driver, testFrameEntry.address.url, testFrameEntry.windowSize);
            });
            afterEach(async function afterEach() {
                await this.driver.quit();
            });
            it('from welcome page to license page', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const welcomePage = this.welcomePage;
                await welcomePage.toLicensePageAsync();
                await licenses_page_1.default.initializeAsync(welcomePage);
            });
            it('from asymmetric page to license page', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const welcomePage = this.welcomePage;
                const page = await welcomePage.toAsymmetricPageViaLinkAsync();
                await page.toLicensePageAsync();
                await licenses_page_1.default.initializeAsync(welcomePage);
            });
            it('from symmetric page to license page', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const welcomePage = this.welcomePage;
                const page = await welcomePage.toSymmetricPageViaLinkAsync();
                await page.toLicensePageAsync();
                await licenses_page_1.default.initializeAsync(welcomePage);
            });
        });
    });
});
