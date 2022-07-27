// eslint-disable-next-line import/no-extraneous-dependencies
import { By, WebDriver } from 'selenium-webdriver';
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
