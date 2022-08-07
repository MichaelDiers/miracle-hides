import BasePage from './pages/base-page';
import AsymmetricPage from './pages/asymmetric.page';
import CustomEventRaise from './infrastructure/custom-event-raiser';
import Translator from './translations/translator';
import DeLanguage from './translations/de-language';
import Logger from './infrastructure/logger';
import SymmetricPage from './pages/symmetric.page';
import HeaderPage from './pages/header.page';
import FooterPage from './pages/footer.page';
import WelcomePage from './pages/welcome-page';
import LicensePage from './pages/license-page';
import PageEvents from './pages/page-events';
import EnLanguage from './translations/en-language';
import Css from './pages/css';
import SideMenuPage from './pages/side-menu-page';

export default class App {
  private readonly translator: Translator = new Translator(
    new DeLanguage(this.logger),
    new EnLanguage(this.logger),
  );

  constructor(
    private readonly logger: Logger,
  ) {
  }

  async startAsync(): Promise<void> {
    await this.setupAsync();
    CustomEventRaise.raise(PageEvents.WELCOME_PAGE);
    CustomEventRaise.raise(PageEvents.HEADER_PAGE);
    CustomEventRaise.raise(PageEvents.FOOTER_PAGE);
    CustomEventRaise.raise(PageEvents.SIDE_MENU_PAGE);
  }

  private async setupAsync(): Promise<void> {
    await Promise.all([
      this.setupLanguageAsync(),
      this.setupThemeAsync(),
    ]);

    const pagePromises = this.setupPages();
    await Promise.all(pagePromises);
  }

  // eslint-disable-next-line class-methods-use-this
  private async setupLanguageAsync() : Promise<void> {
    const language = window.navigator.language || document.documentElement.lang || 'en';
    const lang = language.split('-')[0].toLowerCase();
    document.body.setAttribute('lang', lang);
    document.body.setAttribute('lang-toggle', lang === 'en' ? 'de' : 'en');
  }

  // eslint-disable-next-line class-methods-use-this
  private async setupThemeAsync() : Promise<void> {
    let theme = Css.THEME_LIGHT;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = Css.THEME_DARK;
    }

    document.body.classList.add(theme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.remove(Css.THEME_LIGHT);
        document.body.classList.add(Css.THEME_DARK);
      } else {
        document.body.classList.remove(Css.THEME_DARK);
        document.body.classList.add(Css.THEME_LIGHT);
      }
    });
  }

  private setupPages(): Promise<BasePage>[] {
    const promises: Promise<BasePage>[] = [];

    promises.push(
      new AsymmetricPage(this.translator, this.logger).setupAsync(),
      new SymmetricPage(this.translator, this.logger).setupAsync(),
      new HeaderPage(this.translator, this.logger).setupAsync(),
      new FooterPage(this.translator, this.logger).setupAsync(),
      new WelcomePage(this.translator, this.logger).setupAsync(),
      new LicensePage(this.translator, this.logger).setupAsync(),
      new SideMenuPage(this.translator, this.logger).setupAsync(),
    );

    return promises;
  }
}
