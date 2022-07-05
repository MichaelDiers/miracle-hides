import Language from './language';

export default abstract class BaseLanguage {
  constructor(public readonly lang: string, private readonly language: Language) {}

  get(source: string, entry: string) : string {
    return this.language[source][entry];
  }
}
