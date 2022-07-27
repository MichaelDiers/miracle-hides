/* eslint-disable import/no-extraneous-dependencies */
import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Options as EdgeOptions } from 'selenium-webdriver/edge';
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
    edge = true,
    enableLogging = false,
    headless = true,
  }: {
    chrome?: boolean,
    firefox?: boolean,
    edge?: boolean,
    enableLogging?: boolean,
    headless?: boolean,
  } = {}): DriversEntry[] {
    const drivers: DriversEntry[] = [];
    if (chrome) {
      const options = new ChromeOptions();
      if (!enableLogging) {
        options.excludeSwitches('enable-logging');
      }

      if (headless) {
        options.headless();        
      }

      drivers.push({
        displayName: 'chrome',
        createDriverAsync: async () => new Builder()
          .setChromeOptions(options)
          .forBrowser('chrome')
          .build(),
      });
    }

    if (firefox) {
      const options = new FirefoxOptions();
      if (headless) {
        options.headless();
      }

      drivers.push({
        displayName: 'firefox',
        createDriverAsync: () => new Builder()
          .setFirefoxOptions(options)
          .forBrowser('firefox')
          .build(),
      });
    }

    if (edge) {
      const options = new EdgeOptions();
      if (!enableLogging) {
        options.excludeSwitches('enable-logging');
      }

      if (headless) {
        options.headless();
      }

      drivers.push({
        displayName: 'edge',
        createDriverAsync: () => new Builder()
          .setEdgeOptions(options)
          .forBrowser('MicrosoftEdge')
          .build(),
      });
    }

    return drivers;
  }
}
