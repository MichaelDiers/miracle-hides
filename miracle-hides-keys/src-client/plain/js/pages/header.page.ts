import Css from './css';
import { HeaderLanguageKeys } from '../translations/language-header';
import BasePage from './base-page';
import HtmlComponents from './html-components';
import CustomEventRaiser from '../infrastructure/custom-event-raiser';
import Translator from '../translations/translator';
import Logger from '../infrastructure/logger';
import PageEvents from './page-events';

const ASYMMETRIC_ALGORITHMS_LINK_ID = 'asymmetricAlgorithmsLink';

const SYMMETRIC_ALGORITHMS_LINK_ID = 'symmetricAlgorithmsLink';

export default class HeaderPage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      PageEvents.HEADER_PAGE,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected get displayInRegion(): string {
    return 'header';
  }

  // eslint-disable-next-line class-methods-use-this
  protected async initializeOnDisplayAsync(): Promise<void> {
    // implements abstract method of base class
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupEvents(element: HTMLElement): void {
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

  // eslint-disable-next-line class-methods-use-this
  protected setupHtml(): string {
    return [
      HtmlComponents.anchor({
        css: [Css.LOGO],
        href: PageEvents.WELCOME_PAGE,
        content: [
          HtmlComponents.span({ content: 'mhk' }),
          HtmlComponents.span({ content: 'eys' }),
        ],
      }),
      HtmlComponents.h1({
        source: PageEvents.HEADER_PAGE,
        value: HeaderLanguageKeys.MENU_HEADLINE,
      }),
      HtmlComponents.navbar({
        css: [Css.NAVBAR],
        content: [
          HtmlComponents.listUnordered({
            items: [
              HtmlComponents.listItem({
                css: [Css.ASYMMETRIC_COLOR],
                content: HtmlComponents.anchor({
                  id: ASYMMETRIC_ALGORITHMS_LINK_ID,
                  source: PageEvents.HEADER_PAGE,
                  text: HeaderLanguageKeys.ASYMMETRIC_ALGORITHMS,
                  href: PageEvents.ASYMMETRIC_PAGE,
                  css: [Css.MENU_LINK],
                }),
              }),
              HtmlComponents.listItem({
                css: [Css.SYMMETRIC_COLOR],
                content: HtmlComponents.anchor({
                  id: SYMMETRIC_ALGORITHMS_LINK_ID,
                  source: PageEvents.HEADER_PAGE,
                  text: HeaderLanguageKeys.SYMMETRIC_ALGORITHMS,
                  href: PageEvents.SYMMETRIC_PAGE,
                  css: [Css.MENU_LINK],
                }),
              }),
            ],
          }),
        ],
      }),
    ].join('');
  }
}
