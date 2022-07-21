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
  }

  private async setupAsync(): Promise<void> {
    await this.setupLanguageAsync();

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

  private setupPages(): Promise<BasePage>[] {
    const promises: Promise<BasePage>[] = [];

    promises.push(
      new AsymmetricPage(this.translator, this.logger).setupAsync(),
      new SymmetricPage(this.translator, this.logger).setupAsync(),
      new HeaderPage(this.translator, this.logger).setupAsync(),
      new FooterPage(this.translator, this.logger).setupAsync(),
      new WelcomePage(this.translator, this.logger).setupAsync(),
      new LicensePage(this.translator, this.logger).setupAsync(),
    );

    return promises;
  }
}
