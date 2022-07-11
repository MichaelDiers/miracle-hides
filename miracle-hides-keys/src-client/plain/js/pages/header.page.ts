import Logger from '../infrastructure/logger';
import Translator from '../translations/translator';
import BasePage from './base-page';

export default class HeaderPage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(translator, logger, 'header');
  }

  async initializeOnDisplayAsync() : Promise<void> {

  }

  setupHtml() : string {
    return '<h1>Hello World</h1>';
  }

  setupEvents(element: HTMLElement) : void {

  }
}
