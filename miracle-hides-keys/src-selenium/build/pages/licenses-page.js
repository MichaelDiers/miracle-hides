"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const footer_1 = require("./footer");
const header_1 = require("./header");
const page_1 = require("./page");
const side_menu_1 = require("./side-menu");
const SELECTOR_PAGE_VERIFIER = '#licensePage';
const SELECTOR_LANGUAGE_TEST = '#licensePage h1';
class LicensePage extends page_1.default {
    constructor({ driver, footer, sideMenu, header, }) {
        super({
            driver,
            verifyOnPageSelector: SELECTOR_PAGE_VERIFIER,
            footer,
            sideMenu,
            header,
        });
    }
    static async initializeAsync(driver) {
        const footer = footer_1.default.initializeAsync(driver);
        const header = header_1.default.initializeAsync(driver);
        const sideMenu = side_menu_1.default.initializeAsync(driver);
        const page = new LicensePage({
            driver,
            footer: await footer,
            sideMenu: await sideMenu,
            header: await header,
        });
        await page.verifyOnPageAsync();
        return page;
    }
    async getLanguageTextAsync() {
        return super.getTextAsync(SELECTOR_LANGUAGE_TEST);
    }
}
exports.default = LicensePage;
