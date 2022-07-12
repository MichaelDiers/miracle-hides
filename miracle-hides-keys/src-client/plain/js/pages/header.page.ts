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

  async initializeOnDisplayAsync(): Promise<void> {

  }

  setupHtml(): string {
    const logo = HtmlComponents.anchor({
      css: [Css.LOGO],
      href: AsymmetricPage.name,
      content: [
        HtmlComponents.span({ content: 'mhk' }),
        HtmlComponents.span({ content: 'eys' }),
      ],
    });

    const headline = HtmlComponents.h1({
      source: this.source,
      value: HeaderLanguageKeys.MENU_HEADLINE,
    })

    const menu = HtmlComponents.div({
      css: [Css.MENU],
      content: [
        HtmlComponents.listUnordered({
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
        }),
      ],
    });

    return `
      ${logo}
      ${headline}
      ${menu}      
    `;
  }

  setupEvents(element: HTMLElement): void {
    element.querySelectorAll(`.${Css.MENU_LINK}, .${Css.LOGO}`).forEach((elem) => {
      elem.addEventListener('click', (e) => {
        let node = e.target as HTMLElement;
        while (node.tagName.toUpperCase() !== 'A' && node.tagName.toUpperCase() !== 'BODY') {
          node = node.parentElement;
        }

        if (node.tagName.toUpperCase() === 'A') {
          e.preventDefault();
          const href = node.getAttribute('href');
          CustomEventRaiser.raise(href);
        }
      });
    });
  }
}
