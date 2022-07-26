// eslint-disable-next-line import/no-extraneous-dependencies
import { By, WebDriver } from 'selenium-webdriver';

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

  protected async setWindowSizeAsync({
    width,
    height,
  } : {
    width?: number | 'max',
    height?: number | 'max',
  } = {}) : Promise<void> {
    if (width && width !== 'max' && height && height !== 'max') {
      await this.driver.manage().window().setRect({
        x: 0, y: 0, width, height,
      });
      return;
    }

    await this.driver.manage().window().maximize();
    const size = await this.driver.manage().window().getRect();

    if (!width && height && height !== 'max') {
      await this.driver.manage().window().setRect({
        x: 0, y: 0, width: size.width, height,
      });
    }

    if (width && width !== 'max' && !height) {
      await this.driver.manage().window().setRect({
        x: 0, y: 0, width, height: size.height,
      });
    }
  }
}
