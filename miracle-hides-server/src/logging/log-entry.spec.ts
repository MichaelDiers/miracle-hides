import { LogEntry } from './log-entry';

describe('LogEntry', () => {
  it('should be defined', () => {
    expect(new LogEntry('message')).toBeDefined();
  });
});
