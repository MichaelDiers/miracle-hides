"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_page_1 = require("./base-page");
class Footer extends base_page_1.default {
    constructor(driver) {
        super(driver, 'footer');
    }
    static async initializeAsync(driver) {
        return new Footer(driver);
    }
    async toLicensePageAsync() {
        await this.clickAsync('[href="/react/licenses"], [view=licensePage]');
    }
}
exports.default = Footer;
