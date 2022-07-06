import BaseLanguage from './base-language';
import * as constants from './translation-constants';

export default class Translator {
  private readonly languages: BaseLanguage[];

  constructor(...languages: BaseLanguage[]) {
    this.languages = languages;
  }

  async translate(htmlElement: HTMLElement = undefined): Promise<void> {
    const lang = this.language();
    const root = htmlElement || document;
    root.querySelectorAll(`[${constants.TRANSLATION_VALUE_NAME}]`).forEach((element) => {      
      const translationValue = element.getAttribute(constants.TRANSLATION_VALUE_NAME);
      const [source, value, destination] = translationValue.split('.');
      const translated = lang.get(source, value);
      if (destination === constants.TRANSLATION_DESTINATION_TEXT_CONTENT) {
        // eslint-disable-next-line no-param-reassign
        element.textContent = translated;
      } else if (destination === constants.TRANSLATION_DESTINATION_PLACEHOLDER) {        
        element.setAttribute('placeholder', translated);
      } else if (destination === constants.TRANSLATION_DESTINATION_VALUE) {
        element.setAttribute('value', translated);
      }
    });
  }

  private language(): BaseLanguage {
    const {lang} = document.documentElement;
    if (lang) {
      const language = this.languages.find((l) => l.lang.toUpperCase() === lang.toUpperCase());
      return language || this.languages[0];
    }

    return this.languages[0];
  }
}
