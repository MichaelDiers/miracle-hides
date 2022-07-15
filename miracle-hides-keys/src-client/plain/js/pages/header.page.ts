import Css from './css';
import { HeaderLanguageKeys } from '../translations/language-header';
import { AsymmetricPageEvent } from './asymmetric.page';
import BasePage from './base-page';
import HtmlComponents from './html-components';
import { SymmetricPageEvent } from './symmetric.page';
import CustomEventRaiser from '../infrastructure/custom-event-raiser';
import { WelcomePageEvent } from './welcome-page';
import Translator from '../translations/translator';
import Logger from '../infrastructure/logger';

const ASYMMETRIC_ALGORITHMS_LINK_ID = 'asymmetricAlgorithmsLink';

const SYMMETRIC_ALGORITHMS_LINK_ID = 'symmetricAlgorithmsLink';

export const HeaderPageEvent = 'headerPage';

export class HeaderPage extends BasePage {  
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      HeaderPageEvent,
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
        href: WelcomePageEvent,
        content: [
          HtmlComponents.span({ content: 'mhk' }),
          HtmlComponents.span({ content: 'eys' }),
        ],
      }),
      HtmlComponents.h1({
        source: HeaderPageEvent,
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
                  source: HeaderPageEvent,
                  label: HeaderLanguageKeys.ASYMMETRIC_ALGORITHMS,
                  href: AsymmetricPageEvent,
                  css: [Css.MENU_LINK],
                }),
              }),
              HtmlComponents.listItem({
                css: [Css.SYMMETRIC_COLOR],
                content: HtmlComponents.anchor({
                  id: SYMMETRIC_ALGORITHMS_LINK_ID,
                  source: HeaderPageEvent,
                  label: HeaderLanguageKeys.SYMMETRIC_ALGORITHMS,
                  href: SymmetricPageEvent,
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
