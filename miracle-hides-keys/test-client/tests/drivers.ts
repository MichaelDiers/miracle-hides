/* eslint-disable import/no-extraneous-dependencies */
import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';
/* eslint-enable import/no-extraneous-dependencies */

export interface DriversEntry {
  name: string;
  createDriverAsync: () => Promise<WebDriver>;
}

export class Drivers {
  constructor(public readonly list: DriversEntry[]) {
  }

  static initialize({
    chrome = true,
    firefox = true,
  }: {
    chrome?: boolean,
    firefox?: boolean,
  } = {}): Drivers {
    const drivers: DriversEntry[] = [];
    if (chrome) {
      const options = new ChromeOptions();
      options.excludeSwitches('enable-logging');
      drivers.push({
        name: 'chrome',
        createDriverAsync: async () => new Builder()
          .setChromeOptions(options)
          .forBrowser('chrome')
          .build(),
      });
    }

    if (firefox) {
      drivers.push({
        name: 'firefox',
        createDriverAsync: () => new Builder()
          .setFirefoxOptions(new FirefoxOptions())
          .forBrowser('firefox')
          .build(),
      });
    }

    return new Drivers(drivers);
  }
}
