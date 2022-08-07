"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const licenses_page_1 = require("../pages/licenses-page");
const welcome_page_1 = require("../pages/welcome-page");
const test_frame_1 = require("./test-frame");
const pageTests = [
    {
        name: 'AsymmetricPage',
        getPageAsync: async (welcomePage) => welcomePage.toAsymmetricPageViaLinkAsync(),
    },
    {
        name: 'SymmetricPage',
        getPageAsync: async (welcomePage) => welcomePage.toSymmetricPageViaLinkAsync(),
    },
    {
        name: 'WelcomePage',
        getPageAsync: async (welcomePage) => welcomePage,
    },
    {
        name: 'LicensePage',
        getPageAsync: async (welcomePage) => {
            await welcomePage.toLicensePageAsync();
            return licenses_page_1.default.initializeAsync(welcomePage);
        },
    },
];
describe('SideMenu', () => {
    test_frame_1.TestFrame.testFrames().forEach((testFrameEntry) => {
        describe(test_frame_1.TestFrame.displayName(testFrameEntry), () => {
            pageTests.forEach(({ name, getPageAsync }) => {
                describe(name, () => {
                    beforeEach(async function beforeEach() {
                        this.driver = await testFrameEntry.driver.createDriverAsync();
                        this.welcomePage = await welcome_page_1.default.initializeAsync(this.driver, testFrameEntry.address.url, testFrameEntry.windowSize);
                    });
                    afterEach(async function afterEach() {
                        await this.driver.quit();
                    });
                    it('toggle language', async function test() {
                        const page = await getPageAsync(this.welcomePage);
                        const textLanguage1 = await page.getLanguageTextAsync();
                        await page.toggleLanguageAsync();
                        const textLanguage2 = await page.getLanguageTextAsync();
                        await page.toggleLanguageAsync();
                        const textLanguage3 = await page.getLanguageTextAsync();
                        assert.equal(textLanguage1, textLanguage3);
                        assert.notEqual(textLanguage1, textLanguage2);
                    });
                    it('toggle theme', async function test() {
                        const page = await getPageAsync(this.welcomePage);
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
