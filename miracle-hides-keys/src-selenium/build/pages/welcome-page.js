"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asymmetric_page_1 = require("./asymmetric-page");
const footer_1 = require("./footer");
const page_1 = require("./page");
const side_menu_1 = require("./side-menu");
const symmetric_page_1 = require("./symmetric-page");
class WelcomePage extends page_1.default {
    constructor({ driver, footer, sideMenu, }) {
        super({
            driver,
            verifyOnPageSelector: '#welcomePage',
            footer,
            sideMenu,
        });
    }
    static async initializeAsync(driver, url, size) {
        const footer = footer_1.default.initializeAsync(driver);
        const sideMenu = side_menu_1.default.initializeAsync(driver);
        const page = new WelcomePage({
            driver,
            footer: await footer,
            sideMenu: await sideMenu,
        });
        if (url) {
            await page.getAsync(url);
        }
        if (size) {
            await page.setWindowSizeAsync(size);
        }
        await page.verifyOnPageAsync();
        return page;
    }
    async getLanguageTextAsync() {
        return super.getTextAsync('#generateAsync');
    }
    async toAsymmetricPageViaLinkAsync() {
        await this.clickAsync('#generateAsync');
        return asymmetric_page_1.AsymmetricPage.initializeAsync(this);
    }
    async toSymmetricPageViaLinkAsync() {
        await this.clickAsync('#generateSync');
        return symmetric_page_1.SymmetricPage.initializeAsync(this);
    }
}
exports.default = WelcomePage;
