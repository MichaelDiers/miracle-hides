export interface Logger {
  errorAsync(message: string): Promise<void>;
  exceptionAsync(message: string, stack: string): Promise<void>;
}

export const LOGGER = 'LOGGER';
