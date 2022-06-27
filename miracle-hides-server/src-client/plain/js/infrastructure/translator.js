class Translator {
  constructor() {
    this.__translators = [new DeTranslator()]
  }

  async translate(element) {
    const lang = document.documentElement.lang || this.__translators[0].lang;
    let index = this.__translators.findIndex((translator) => translator.lang === lang);
    if (index < 0) {
      index = 0;
    }

    await this.__translators[index].translate(element);
  }
}