import Language from './language';

export default abstract class BaseLanguage {
  constructor(public readonly lang: string, private readonly language: Language) {}

  get(source: string, entry: string) : string {
    try {
      return this.language[source][entry];
    } catch (err) {
      console.error(source, entry);
      throw err;
    }
  }
}
