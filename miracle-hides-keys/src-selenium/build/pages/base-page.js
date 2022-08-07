"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const selenium_webdriver_1 = require("selenium-webdriver");
class BasePage {
    constructor(driver, verifyOnPageSelector) {
        this.verifyOnPageSelector = verifyOnPageSelector;
        this.driver = driver.driver;
        if (!this.driver) {
            this.driver = driver;
        }
    }
    async verifyOnPageAsync() {
        await this.driver.findElement(selenium_webdriver_1.By.css(this.verifyOnPageSelector));
    }
    async clickAsync(selector) {
        const element = await this.driver.findElement(selenium_webdriver_1.By.css(selector));
        return element.click();
    }
    async clickAndWaitForValueChanged(selectorClick, selectorValueChanged) {
        const oldValue = await this.getValueAsync(selectorValueChanged);
        await (await this.driver.findElement(selenium_webdriver_1.By.css(selectorClick))).click();
        return this.driver.wait(async (driver) => {
            const element = await driver.findElement(selenium_webdriver_1.By.css(selectorValueChanged));
            const newValue = await element.getAttribute('value');
            if (!newValue || oldValue === newValue) {
                return undefined;
            }
            return newValue;
        });
    }
    async getAsync(url) {
        return this.driver.get(url);
    }
    async getBackgroundColorAsync(selector) {
        const element = await this.driver.findElement(selenium_webdriver_1.By.css(selector));
        return element.getCssValue('background-color');
    }
    async getTextAsync(selector) {
        const element = await this.driver.findElement(selenium_webdriver_1.By.css(selector));
        return element.getText();
    }
    async getTextAreaText(selector) {
        const element = await this.driver.findElement(selenium_webdriver_1.By.css(selector));
        return element.getAttribute('value');
    }
    async getTextAreaChangedText(selector, oldText) {
        return this.driver.wait(async (driver) => {
            const element = await driver.findElement(selenium_webdriver_1.By.css(selector));
            const text = await element.getAttribute('value');
            if (!text || text === oldText) {
                return undefined;
            }
            return text;
        }, 5000);
    }
    async getValueAsync(selector) {
        const element = await this.driver.findElement(selenium_webdriver_1.By.css(selector));
        return element.getAttribute('value');
    }
    async sendKeysAndWaitForValueChanged(selectorValue, value, selectorValueChanged) {
        const oldValue = await this.getValueAsync(selectorValueChanged);
        const textElement = await this.driver.findElement(selenium_webdriver_1.By.css(selectorValue));
        const textElementValueLength = (await textElement.getAttribute('value')).length;
        await textElement.sendKeys(value, ...Array(value.length).fill(selenium_webdriver_1.Key.ARROW_LEFT), ...Array(textElementValueLength).fill(selenium_webdriver_1.Key.BACK_SPACE), selenium_webdriver_1.Key.TAB);
        return this.driver.wait(async (driver) => {
            const element = driver.findElement(selenium_webdriver_1.By.css(selectorValueChanged));
            const newValue = await element.getAttribute('value');
            if (!newValue || oldValue === newValue) {
                return undefined;
            }
            return newValue;
        });
    }
    async setWindowSizeAsync(windowSize) {
        await this.driver.manage().window().maximize();
        if (windowSize.height === 'max' && windowSize.width === 'max') {
            return;
        }
        const size = await this.driver.manage().window().getRect();
        const newSize = {
            x: 0, y: 0, width: size.width, height: size.height,
        };
        if (windowSize.height !== 'max') {
            newSize.height = windowSize.height;
        }
        if (windowSize.width !== 'max') {
            newSize.width = windowSize.width;
        }
        await this.driver.manage().window().setRect(newSize);
    }
}
exports.default = BasePage;
