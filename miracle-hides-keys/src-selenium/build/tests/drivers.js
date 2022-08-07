"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drivers = void 0;
/* eslint-disable import/no-extraneous-dependencies */
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = require("selenium-webdriver/chrome");
const edge_1 = require("selenium-webdriver/edge");
const firefox_1 = require("selenium-webdriver/firefox");
class Drivers {
    static initialize({ chrome = true, firefox = true, edge = true, enableLogging = false, headless = true, } = {}) {
        const drivers = [];
        if (chrome) {
            const options = new chrome_1.Options();
            if (!enableLogging) {
                options.excludeSwitches('enable-logging');
            }
            if (headless) {
                options.headless();
            }
            drivers.push({
                displayName: 'chrome',
                createDriverAsync: async () => new selenium_webdriver_1.Builder()
                    .setChromeOptions(options)
                    .forBrowser('chrome')
                    .build(),
            });
        }
        if (firefox) {
            const options = new firefox_1.Options();
            if (headless) {
                options.headless();
            }
            drivers.push({
                displayName: 'firefox',
                createDriverAsync: () => new selenium_webdriver_1.Builder()
                    .setFirefoxOptions(options)
                    .forBrowser('firefox')
                    .build(),
            });
        }
        if (edge) {
            const options = new edge_1.Options();
            if (!enableLogging) {
                options.excludeSwitches('enable-logging');
            }
            if (headless) {
                options.headless();
            }
            drivers.push({
                displayName: 'edge',
                createDriverAsync: () => new selenium_webdriver_1.Builder()
                    .setEdgeOptions(options)
                    .forBrowser('MicrosoftEdge')
                    .build(),
            });
        }
        return drivers;
    }
}
exports.Drivers = Drivers;
