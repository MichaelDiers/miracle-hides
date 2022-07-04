export interface Logger {
  error(message: string): Promise<void>;
  exception(message: string, stack: string): Promise<void>;
}

export const LOGGER = 'LOGGER';
