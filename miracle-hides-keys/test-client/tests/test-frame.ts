import {
  Address, ADDRESSES, WindowSize, WINDOW_SIZES,
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

  static testFrames() : TestFrameEntry[] {
    const entries : TestFrameEntry[] = [];

    Drivers.initialize().forEach((driver) => {
      ADDRESSES.forEach((address) => {
        WINDOW_SIZES.forEach((windowSize) => {
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
}
