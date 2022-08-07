"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const selenium_webdriver_1 = require("selenium-webdriver");
const licenses_page_1 = require("../pages/licenses-page");
const asymmetric_page_1 = require("../pages/asymmetric-page");
const symmetric_page_1 = require("../pages/symmetric-page");
const welcome_page_1 = require("../pages/welcome-page");
const test_frame_1 = require("./test-frame");
describe('Header', () => {
    test_frame_1.TestFrame.testFrames().forEach((testFrameEntry) => {
        describe(test_frame_1.TestFrame.displayName(testFrameEntry), () => {
            beforeEach(async function beforeEach() {
                this.driver = await testFrameEntry.driver.createDriverAsync();
                this.welcomePage = await welcome_page_1.default.initializeAsync(this.driver, testFrameEntry.address.url, testFrameEntry.windowSize);
                this.isMobile = testFrameEntry.windowSize.isMobile;
            });
            afterEach(async function afterEach() {
                await this.driver.quit();
            });
            it('no header on welcome page', async function test() {
                let header;
                try {
                    header = await this.driver.findElement(selenium_webdriver_1.By.css('header'));
                }
                catch (_a) {
                }
                if (header) {
                    await this.driver.wait(selenium_webdriver_1.until.elementIsNotVisible(header));
                }
            });
            it('from asymmetric page to symmetric page', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const welcomePage = this.welcomePage;
                const page = await welcomePage.toAsymmetricPageViaLinkAsync();
                await page.toSymmetricPageAsync(this.isMobile);
                await symmetric_page_1.SymmetricPage.initializeAsync(page);
            });
            it('from asymmetric page to asymmetric page', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const welcomePage = this.welcomePage;
                const page = await welcomePage.toAsymmetricPageViaLinkAsync();
                await page.toAsymmetricPageAsync(this.isMobile);
                await asymmetric_page_1.AsymmetricPage.initializeAsync(page);
            });
            it('from symmetric page to asymmetric page', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const welcomePage = this.welcomePage;
                const page = await welcomePage.toSymmetricPageViaLinkAsync();
                await page.toAsymmetricPageAsync(this.isMobile);
                await asymmetric_page_1.AsymmetricPage.initializeAsync(page);
            });
            it('from symmetric page to symmetric page', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const welcomePage = this.welcomePage;
                const page = await welcomePage.toSymmetricPageViaLinkAsync();
                await page.toSymmetricPageAsync(this.isMobile);
                await symmetric_page_1.SymmetricPage.initializeAsync(page);
            });
            it('from license page to asymmetric page', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const welcomePage = this.welcomePage;
                const page = await welcomePage.toSymmetricPageViaLinkAsync();
                await page.toLicensePageAsync();
                const licensePage = await licenses_page_1.default.initializeAsync(page);
                await licensePage.toAsymmetricPageAsync(this.isMobile);
                await asymmetric_page_1.AsymmetricPage.initializeAsync(page);
            });
            it('from license page to symmetric page', async function test() {
                // eslint-disable-next-line prefer-destructuring
                const welcomePage = this.welcomePage;
                const page = await welcomePage.toSymmetricPageViaLinkAsync();
                await page.toLicensePageAsync();
                const licensePage = await licenses_page_1.default.initializeAsync(page);
                await licensePage.toSymmetricPageAsync(this.isMobile);
                await symmetric_page_1.SymmetricPage.initializeAsync(page);
            });
        });
    });
});
