import Logger from '../infrastructure/logger';
import Translator from '../translations/translator';
import BasePage from './base-page';

export const FooterPageEvent = 'footerPage';

export class FooterPage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      FooterPageEvent,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected get displayInRegion() : string {
    return 'footer';
  }

  // eslint-disable-next-line class-methods-use-this
  protected async initializeOnDisplayAsync() : Promise<void> {
    // implements abstract method of base class
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected setupEvents(element: HTMLElement) : void {
    // implements abstract method of base class
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupHtml() : string {
    return '<h1>Footer</h1>';
  }
}
