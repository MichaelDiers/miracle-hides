"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_page_1 = require("./base-page");
class Header extends base_page_1.default {
    constructor(driver) {
        super(driver, 'header');
    }
    static async initializeAsync(driver) {
        return new Header(driver);
    }
    async toAsymmetricPageAsync(isMobile) {
        if (isMobile) {
            await this.clickAsync('#menuSymbolTrigger');
        }
        await this.clickAsync('#asymmetricAlgorithmsLink');
    }
    async toSymmetricPageAsync(isMobile) {
        if (isMobile) {
            await this.clickAsync('#menuSymbolTrigger');
        }
        await this.clickAsync('#symmetricAlgorithmsLink');
    }
}
exports.default = Header;
