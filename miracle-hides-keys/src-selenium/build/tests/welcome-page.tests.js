"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const welcome_page_1 = require("../pages/welcome-page");
const test_frame_1 = require("./test-frame");
describe('WelcomePage', () => {
    test_frame_1.TestFrame.testFrames().forEach((testFrameEntry) => {
        describe(test_frame_1.TestFrame.displayName(testFrameEntry), () => {
            beforeEach(async function beforeEach() {
                this.driver = await testFrameEntry.driver.createDriverAsync();
            });
            afterEach(async function afterEach() {
                await this.driver.quit();
            });
            it('load index.html', async function test() {
                await welcome_page_1.default.initializeAsync(this.driver, testFrameEntry.address.url, testFrameEntry.windowSize);
            });
            it('to asymmetric page', async function test() {
                const page = await welcome_page_1.default.initializeAsync(this.driver, testFrameEntry.address.url, testFrameEntry.windowSize);
                await page.toAsymmetricPageViaLinkAsync();
            });
            it('to symmetric page', async function test() {
                const page = await welcome_page_1.default.initializeAsync(this.driver, testFrameEntry.address.url, testFrameEntry.windowSize);
                await page.toSymmetricPageViaLinkAsync();
            });
        });
    });
});
