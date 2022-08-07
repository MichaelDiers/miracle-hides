// eslint-disable-next-line import/no-extraneous-dependencies
import {
  By,
  Key,
  WebDriver,
} from 'selenium-webdriver';
import { WindowSize } from '../tests/constants';

export default class BasePage {
  private readonly driver: WebDriver;

  constructor(
    driver: WebDriver | BasePage,
    private readonly verifyOnPageSelector: string,
  ) {
    this.driver = (driver as BasePage).driver;
    if (!this.driver) {
      this.driver = driver as WebDriver;
    }
  }

  async verifyOnPageAsync() : Promise<void> {
    await this.driver.findElement(By.css(this.verifyOnPageSelector));
  }

  protected async clickAsync(selector: string) : Promise<void> {
    const element = await this.driver.findElement(By.css(selector));
    return element.click();
  }

  protected async clickAndWaitForValueChanged(
    selectorClick: string,
    selectorValueChanged: string,
  ) : Promise<string> {
    const oldValue = await this.getValueAsync(selectorValueChanged);
    await (await this.driver.findElement(By.css(selectorClick))).click();
    return this.driver.wait(async (driver: WebDriver) => {
      const element = await driver.findElement(By.css(selectorValueChanged));
      const newValue = await element.getAttribute('value');
      if (!newValue || oldValue === newValue) {
        return undefined;
      }

      return newValue;
    });
  }

  protected async getAsync(url: string) : Promise<void> {
    return this.driver.get(url);
  }

  async getBackgroundColorAsync(selector: string) : Promise<string> {
    const element = await this.driver.findElement(By.css(selector));
    return element.getCssValue('background-color');
  }

  protected async getTextAsync(selector: string) : Promise<string> {
    const element = await this.driver.findElement(By.css(selector));
    return element.getText();
  }

  protected async getTextAreaText(selector: string) : Promise<string> {
    const element = await this.driver.findElement(By.css(selector));
    return element.getAttribute('value');
  }

  protected async getTextAreaChangedText(selector: string, oldText: string) : Promise<string> {
    return this.driver.wait<string>(async (driver : WebDriver) => {
      const element = await driver.findElement(By.css(selector));
      const text = await element.getAttribute('value');
      if (!text || text === oldText) {
        return undefined;
      }

      return text;
    }, 5000);
  }

  protected async getValueAsync(selector: string): Promise<string> {
    const element = await this.driver.findElement(By.css(selector));
    return element.getAttribute('value');
  }

  protected async sendKeysAndWaitForValueChanged(
    selectorValue: string,
    value: string,
    selectorValueChanged: string,
  ) : Promise<string> {
    const oldValue = await this.getValueAsync(selectorValueChanged);
    const textElement = await this.driver.findElement(By.css(selectorValue));
    const textElementValueLength = (await textElement.getAttribute('value')).length;
    await textElement.sendKeys(
      value,
      ...Array(value.length).fill(Key.ARROW_LEFT),
      ...Array(textElementValueLength).fill(Key.BACK_SPACE),
      Key.TAB,
    );

    return this.driver.wait(async (driver: WebDriver) => {
      const element = driver.findElement(By.css(selectorValueChanged));
      const newValue = await element.getAttribute('value');
      if (!newValue || oldValue === newValue) {
        return undefined;
      }

      return newValue;
    });
  }

  protected async setWindowSizeAsync(windowSize : WindowSize) : Promise<void> {
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
