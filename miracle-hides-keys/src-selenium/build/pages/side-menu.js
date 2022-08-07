"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_page_1 = require("./base-page");
class SideMenu extends base_page_1.default {
    constructor(driver) {
        super(driver, '.side-menu');
    }
    static async initializeAsync(driver) {
        return new SideMenu(driver);
    }
    async toggleLanguageAsync() {
        await this.clickAsync('.button.side-menu-language');
    }
    async toggleThemeAsync() {
        await this.clickAsync('.button.side-menu-theme');
    }
}
exports.default = SideMenu;
