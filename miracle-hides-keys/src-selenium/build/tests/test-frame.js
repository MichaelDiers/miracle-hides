"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestFrame = void 0;
const constants_1 = require("./constants");
const drivers_1 = require("./drivers");
class TestFrame {
    static displayName(entry) {
        return `${entry.driver.displayName} ${entry.address.displayName} ${entry.windowSize.displayName}`;
    }
    static testFrames({ chrome = true, firefox = true, edge = true, enableLogging = false, windowSizes = 'all', addresses = 'all', headless = true, } = {}) {
        const entries = [];
        let actualWindowSizes = constants_1.WINDOW_SIZES;
        if (windowSizes === 'fullscreen') {
            actualWindowSizes = constants_1.WINDOW_SIZES.filter((size) => size.displayName === 'fullscreen');
        }
        const actualAddresses = constants_1.ADDRESSES;
        if (addresses !== 'all') {
            actualAddresses.filter((address) => address.displayName === addresses);
        }
        drivers_1.Drivers.initialize({
            chrome,
            firefox,
            edge,
            enableLogging,
            headless,
        }).forEach((driver) => {
            actualAddresses.forEach((address) => {
                actualWindowSizes.forEach((windowSize) => {
                    entries.push({
                        driver,
                        address,
                        windowSize,
                    });
                });
            });
        });
        return entries;
    }
    static testFramesShort({ headless = true } = {}) {
        return TestFrame.testFrames({
            chrome: false,
            edge: false,
            windowSizes: 'fullscreen',
            headless,
        });
    }
}
exports.TestFrame = TestFrame;
