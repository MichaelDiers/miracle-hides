import Logger from '../infrastructure/logger';
import { TRANSLATION_DESTINATION_TEXT_CONTENT } from '../translations/translation-constants';
import Translator from '../translations/translator';
import BasePage from './base-page';
import Css from './css';
import HtmlComponents from './html-components';
import PageEvents from './page-events';

export default class SideMenuPage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      PageEvents.SIDE_MENU_PAGE,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected get displayInRegion(): string {
    return '.side-menu';
  }

  // eslint-disable-next-line class-methods-use-this
  protected async initializeOnDisplayAsync(): Promise<void> {
    // implements abstract method of base class
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected setupEvents(element: HTMLElement): void {
    element.querySelectorAll(`.${Css.SIDE_MENU_LANGUAGE}`).forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();

        const lang = document.body.getAttribute('lang');
        const langToggle = document.body.getAttribute('lang-toggle');
        document.body.setAttribute('lang', langToggle);
        document.body.setAttribute('lang-toggle', lang);

        (e.target as HTMLElement).setAttribute(
          'translationValue',
          `${PageEvents.FOOTER_PAGE}.${lang}.${TRANSLATION_DESTINATION_TEXT_CONTENT}`,
        );

        this.translateAsync(document.body).catch((err) => this.exception(err.message, err.stack));
      });
    });

    element.querySelectorAll(`.${Css.SIDE_MENU_THEME}`).forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();

        if (document.body.classList.contains(Css.THEME_LIGHT)) {
          document.body.classList.remove(Css.THEME_LIGHT);
          document.body.classList.add(Css.THEME_DARK);
        } else {
          document.body.classList.remove(Css.THEME_DARK);
          document.body.classList.add(Css.THEME_LIGHT);
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupHtml(): string {
    const langLabel = document.body.getAttribute('lang-toggle');
    const themeLabel = document.body.getAttribute('theme-toggle');

    return [
      HtmlComponents.button({
        css: [Css.SIDE_MENU_THEME],
        source: PageEvents.SIDE_MENU_PAGE,
        text: themeLabel,
      }),
      HtmlComponents.button({
        css: [Css.SIDE_MENU_LANGUAGE],
        source: PageEvents.SIDE_MENU_PAGE,
        text: langLabel,
      }),
    ].join('');
  }
}
