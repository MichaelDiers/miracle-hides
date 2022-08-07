import {
  Address,
  ADDRESSES,
  WindowSize,
  WINDOW_SIZES,
} from './constants';
import { Drivers, DriversEntry } from './drivers';

export interface TestFrameEntry {
  driver: DriversEntry;
  address: Address;
  windowSize: WindowSize;
}

export class TestFrame {
  static displayName(entry: TestFrameEntry) : string {
    return `${entry.driver.displayName} ${entry.address.displayName} ${entry.windowSize.displayName}`;
  }

  static testFrames({
    chrome = true,
    firefox = true,
    edge = true,
    enableLogging = false,
    windowSizes = 'all',
    addresses = 'all',
    headless = true,
  } : {
    chrome?: boolean,
    firefox?: boolean,
    edge?: boolean,
    enableLogging?: boolean,
    windowSizes?: 'fullscreen' | 'all',
    addresses?: string | 'all',
    headless?: boolean,
  } = {}) : TestFrameEntry[] {
    const entries : TestFrameEntry[] = [];

    let actualWindowSizes = WINDOW_SIZES;
    if (windowSizes === 'fullscreen') {
      actualWindowSizes = WINDOW_SIZES.filter((size) => size.displayName === 'fullscreen');
    }

    const actualAddresses = ADDRESSES;
    if (addresses !== 'all') {
      actualAddresses.filter((address) => address.displayName === addresses);
    }

    Drivers.initialize({
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

  static testFramesShort({ headless = true } : { headless?: boolean } = {}) : TestFrameEntry[] {
    return TestFrame.testFrames({
      chrome: false,
      edge: false,
      windowSizes: 'fullscreen',
      headless,
    });
  }
}
