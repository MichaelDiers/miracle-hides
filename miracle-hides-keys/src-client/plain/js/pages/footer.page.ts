import Logger from '../infrastructure/logger';
import Translator from '../translations/translator';
import BasePage from './base-page';

export default class FooterPage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(translator, logger, 'footer');
  }

  async initializeOnDisplayAsync() : Promise<void> {

  }

  setupHtml() : string {
    return '<h1>Footer</h1>';
  }

  setupEvents(element: HTMLElement) : void {

  }
}
