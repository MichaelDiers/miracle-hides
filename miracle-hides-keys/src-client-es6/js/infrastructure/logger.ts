export default class Logger {
  async errorAsync(message: string): Promise<void> {
    return this.exceptionAsync(message, undefined);
  }

  // eslint-disable-next-line class-methods-use-this
  async exceptionAsync(message: string, stack: string): Promise<void> {
    // eslint-disable-next-line no-console
    console.error(message);

    // eslint-disable-next-line no-console
    console.error(stack);
  }
}
