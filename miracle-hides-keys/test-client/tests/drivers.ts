/* eslint-disable import/no-extraneous-dependencies */
import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';
import { DisplayName } from './constants';
/* eslint-enable import/no-extraneous-dependencies */

export interface DriversEntry extends DisplayName {
  createDriverAsync: () => Promise<WebDriver>;
}

export class Drivers {
  static initialize({
    chrome = true,
    firefox = true,
  }: {
    chrome?: boolean,
    firefox?: boolean,
  } = {}): DriversEntry[] {
    const drivers: DriversEntry[] = [];
    if (chrome) {
      const options = new ChromeOptions();
      options.excludeSwitches('enable-logging');
      drivers.push({
        displayName: 'chrome',
        createDriverAsync: async () => new Builder()
          .setChromeOptions(options)
          .forBrowser('chrome')
          .build(),
      });
    }

    if (firefox) {
      drivers.push({
        displayName: 'firefox',
        createDriverAsync: () => new Builder()
          .setFirefoxOptions(new FirefoxOptions())
          .forBrowser('firefox')
          .build(),
      });
    }

    return drivers;
  }
}
