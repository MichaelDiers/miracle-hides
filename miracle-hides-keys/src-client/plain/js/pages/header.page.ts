import Css from './css';
import Logger from '../infrastructure/logger';
import { HeaderLanguageKeys } from '../translations/language-header';
import Translator from '../translations/translator';
import AsymmetricPage from './asymmetric.page';
import BasePage from './base-page';
import HtmlComponents from './html-components';
import SymmetricPage from './symmetric.page';
import CustomEventRaiser from '../infrastructure/custom-event-raiser';

const ASYMMETRIC_ALGORITHMS_LINK_ID = 'asymmetricAlgorithmsLink';

const SYMMETRIC_ALGORITHMS_LINK_ID = 'symmetricAlgorithmsLink';

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
    return `
      <h1>Hello World</h1>
      ${HtmlComponents.listUnordered({
    items: [
      HtmlComponents.listItem({
        content: HtmlComponents.anchor({
          id: ASYMMETRIC_ALGORITHMS_LINK_ID,
          source: this.source,
          label: HeaderLanguageKeys.ASYMMETRIC_ALGORITHMS,
          href: AsymmetricPage.name,
          css: [Css.MENU_LINK],
        }),
      }),
      HtmlComponents.listItem({
        content: HtmlComponents.anchor({
          id: SYMMETRIC_ALGORITHMS_LINK_ID,
          source: this.source,
          label: HeaderLanguageKeys.SYMMETRIC_ALGORITHMS,
          href: SymmetricPage.name,
          css: [Css.MENU_LINK],
        }),
      }),
    ],
  })}
    `;
  }

  setupEvents(element: HTMLElement) : void {
    element.querySelectorAll(`.${Css.MENU_LINK}`).forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (e.target as HTMLElement).getAttribute('href');
        CustomEventRaiser.raise(href);
      });
    });
  }
}
