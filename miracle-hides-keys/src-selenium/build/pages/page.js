"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_page_1 = require("./base-page");
class Page extends base_page_1.default {
    constructor({ driver, verifyOnPageSelector, footer, sideMenu, header, }) {
        super(driver, verifyOnPageSelector);
        this.footer = footer;
        this.header = header;
        this.sideMenu = sideMenu;
    }
    async getBackgroundColorAsync() {
        return super.getBackgroundColorAsync('.app');
    }
    async toAsymmetricPageAsync(isMobile) {
        return this.header.toAsymmetricPageAsync(isMobile);
    }
    async toLicensePageAsync() {
        return this.footer.toLicensePageAsync();
    }
    async toSymmetricPageAsync(isMobile) {
        return this.header.toSymmetricPageAsync(isMobile);
    }
    async toggleLanguageAsync() {
        await this.sideMenu.toggleLanguageAsync();
    }
    async toggleThemeAsync() {
        await this.sideMenu.toggleThemeAsync();
    }
}
exports.default = Page;
