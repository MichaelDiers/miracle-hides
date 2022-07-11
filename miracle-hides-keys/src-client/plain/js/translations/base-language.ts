import Logger from '../infrastructure/logger';
import Language from './language';

export default abstract class BaseLanguage {
  constructor(
    public readonly lang: string,
    private readonly language: Language,
    private readonly logger: Logger,
  ) {}

  get(source: string, entry: string) : string {
    try {
      return this.language[source][entry];
    } catch (err) {
      this.logger.exceptionAsync(err.message, err.stack).catch(() => {});
      throw err;
    }
  }
}
